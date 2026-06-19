// Controller for mistakes analytics
// Aggregates error data from ExecuteLog to identify recurring mistakes

const ExecuteLog = require("../../models/execute.model");

// Mistake patterns mapping - maps error patterns to readable mistake names and suggested lessons
const MISTAKE_PATTERNS = {
  missing_semicolon: {
    name: "Missing Semicolons",
    patterns: ["expected ';'", "missing semicolon", "semicolon", ";"],
    lessons: "JavaScript Basics - Syntax",
    weight: 1,
  },
  syntax_error: {
    name: "Syntax Errors",
    patterns: ["syntax error", "syntaxerror", "expected"],
    lessons: "Syntax Fundamentals",
    weight: 1.5,
  },
  undeclared_variable: {
    name: "Undeclared Variables",
    patterns: ["undeclared", "cannot find symbol", "nameerror", "is not defined"],
    lessons: "Variables and Scope",
    weight: 1.2,
  },
  index_out_of_bounds: {
    name: "Array Index Errors",
    patterns: ["indexerror", "out of bounds", "out of range", "index out"],
    lessons: "Arrays and Indexing",
    weight: 1.3,
  },
  infinite_loop: {
    name: "Infinite Loops",
    patterns: ["timeout", "timed out", "infinite loop"],
    lessons: "Loops and Control Flow",
    weight: 1.4,
  },
  null_pointer: {
    name: "Null/Undefined Errors",
    patterns: ["nullpointerexception", "null", "undefined", "cannot read"],
    lessons: "Object-Oriented Basics",
    weight: 1.2,
  },
  type_mismatch: {
    name: "Type Errors",
    patterns: ["typeerror", "type mismatch", "cannot convert"],
    lessons: "Data Types and Conversion",
    weight: 1.1,
  },
  logic_error: {
    name: "Logic Errors",
    patterns: ["wrong output", "incorrect result", "assertion failed"],
    lessons: "Algorithm Logic",
    weight: 0.9,
  },
  zero_division: {
    name: "Division by Zero",
    patterns: ["zerodivisionerror", "division by zero", "divide by zero"],
    lessons: "Arithmetic and Conditionals",
    weight: 1.3,
  },
  missing_bracket: {
    name: "Missing Brackets",
    patterns: ["expected '}'", "expected ')'", "unmatched", "bracket"],
    lessons: "Code Structure",
    weight: 1.1,
  },
};

/**
 * Analyzes error message and categorizes it
 * @param {string} error - Error message from compilation/execution
 * @returns {object} - { mistakeName, pattern, weight }
 */
const categorizeError = (error = "") => {
  const errorLower = error.toLowerCase();

  for (const [key, mistake] of Object.entries(MISTAKE_PATTERNS)) {
    const matched = mistake.patterns.some((pattern) =>
      errorLower.includes(pattern.toLowerCase())
    );

    if (matched) {
      return {
        mistakeName: mistake.name,
        pattern: key,
        suggestedLesson: mistake.lessons,
        weight: mistake.weight,
      };
    }
  }

  // Default fallback
  return {
    mistakeName: "Other Errors",
    pattern: "other",
    suggestedLesson: "General Debugging",
    weight: 0.5,
  };
};

/**
 * Fetches and aggregates user mistakes
 * GET /api/mistakes/:email
 * Returns top recurring mistakes with counts and suggestions
 */
exports.getMistakes = async (req, res) => {
  try {
    const { email } = req.params;

    // Verify user can only access their own mistakes
    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    if (req.user.email !== email) {
      return res.status(403).json({
        message: "Forbidden: you can only access your own mistakes",
      });
    }

    // Query ExecuteLog for errors from this user
    const errorLogs = await ExecuteLog.find({
      email,
      error: { $exists: true, $ne: "" }, // Only records with errors
    })
      .sort({ createdAt: -1 })
      .limit(1000); // Limit to last 1000 executions

    // Categorize and aggregate mistakes
    const mistakesMap = new Map();

    errorLogs.forEach((log) => {
      const categorized = categorizeError(log.error);
      const key = categorized.mistakeName;

      if (mistakesMap.has(key)) {
        const existing = mistakesMap.get(key);
        existing.count += 1;
        existing.lastOccurrence = log.createdAt;
      } else {
        mistakesMap.set(key, {
          name: categorized.mistakeName,
          pattern: categorized.pattern,
          count: 1,
          suggestedLesson: categorized.suggestedLesson,
          weight: categorized.weight,
          lastOccurrence: log.createdAt,
        });
      }
    });

    // Convert to array and sort by weight (severity) and count
    let mistakes = Array.from(mistakesMap.values());

    mistakes.sort((a, b) => {
      // Primary sort: by count (highest first)
      if (a.count !== b.count) {
        return b.count - a.count;
      }
      // Secondary sort: by weight (highest first)
      return b.weight - a.weight;
    });

    // Limit to top 10 mistakes
    mistakes = mistakes.slice(0, 10);

    return res.json({
      email,
      totalErrors: errorLogs.length,
      uniqueMistakes: mistakes.length,
      mistakes: mistakes.map(({pattern: _pattern, weight: _weight, ...rest}) => rest), // Remove internal fields
    });
  } catch (err) {
    console.error("Error fetching mistakes:", err);
    res.status(500).json({ message: "Server error fetching mistakes" });
  }
};

/**
 * Log a user mistake from client-side execution or frontend feedback
 * POST /api/mistakes/log
 */
exports.logMistake = async (req, res) => {
  try {
    const email = req.user?.email;
    const { code, language = "client", error } = req.body || {};

    if (!email) {
      return res.status(401).json({ message: "Unauthorized: no user session" });
    }
    if (!code || !error) {
      return res.status(400).json({ message: "Code and error are required to log a mistake" });
    }

    await ExecuteLog.create({
      email,
      language,
      code,
      output: "",
      error: String(error).trim(),
    });

    return res.status(201).json({ message: "Mistake logged" });
  } catch (err) {
    console.error("Error logging mistake:", err);
    res.status(500).json({ message: "Server error logging mistake" });
  }
};

/**
 * Optional: Get detailed mistake info
 * GET /api/mistakes/:email/:pattern
 * Returns specific mistake details and examples
 */
exports.getMistakeDetails = async (req, res) => {
  try {
    const { email, pattern } = req.params;

    if (req.user.email !== email) {
      return res.status(403).json({
        message: "Forbidden: you can only access your own data",
      });
    }

    // Find the mistake pattern
    const mistakeInfo = MISTAKE_PATTERNS[pattern] || {
      name: "Unknown Error",
      lessons: "General Debugging",
    };

    // Find recent examples of this mistake
    const examples = await ExecuteLog.find({
      email,
      error: { $exists: true, $ne: "" },
    })
      .sort({ createdAt: -1 })
      .limit(100);

    const filteredExamples = examples
      .filter((log) => {
        const categorized = categorizeError(log.error);
        return categorized.pattern === pattern;
      })
      .slice(0, 5); // Limit to 5 examples

    res.json({
      pattern,
      mistakeName: mistakeInfo.name,
      suggestedLesson: mistakeInfo.lessons,
      totalOccurrences: filteredExamples.length,
      examples: filteredExamples.map((log) => ({
        timestamp: log.createdAt,
        error: log.error,
        language: log.language,
      })),
    });
  } catch (err) {
    console.error("Error fetching mistake details:", err);
    res.status(500).json({ message: "Server error" });
  }
};
