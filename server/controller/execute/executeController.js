// controllers/execute/executeController.js
const compilerService = require("../../services/compiler/CompilerService");
const ExecuteLog = require("../../models/execute.model");
const { ExecutionError, TimeoutError } = require("../../utils/errors");

// ─── Error classification ───────────────────────────────────────────────────

const classifyError = (stderr = "", timedOut = false) => {
  if (timedOut) return "TimeoutError";
  const s = stderr.toLowerCase();
  if (
    s.includes("error:") ||
    s.includes("syntax error") ||
    s.includes("cannot find symbol") ||
    s.includes("undeclared") ||
    s.includes("expected") ||
    s.includes("compileerror") ||
    s.includes("syntaxerror") ||
    s.includes("nameerror") ||
    s.includes("indentationerror") ||
    s.includes("typeerror: cannot") ||
    s.includes("javac")
  ) return "CompilationError";
  if (
    s.includes("exception") ||
    s.includes("traceback") ||
    s.includes("segmentation fault") ||
    s.includes("runtime error") ||
    s.includes("out of memory") ||
    s.includes("stack overflow") ||
    s.includes("zerodivisionerror") ||
    s.includes("indexerror") ||
    s.includes("keyerror") ||
    s.includes("attributeerror") ||
    s.includes("nullpointerexception") ||
    s.includes("killed")
  ) return "RuntimeError";
  return "ExecutionError";
};

// ─── Extract first error line number from compiler stderr ────────────────────

const extractErrorLine = (stderr = "") => {
  const ccMatch = stderr.match(/:(\d+):\d+:/);
  if (ccMatch) return parseInt(ccMatch[1], 10);
  const pyMatch = stderr.match(/line (\d+)/i);
  if (pyMatch) return parseInt(pyMatch[1], 10);
  const javaMatch = stderr.match(/\.java:(\d+):/);
  if (javaMatch) return parseInt(javaMatch[1], 10);
  const nodeMatch = stderr.match(/at line (\d+)/i) || stderr.match(/\(.*:(\d+):\d+\)/);
  if (nodeMatch) return parseInt(nodeMatch[1], 10);
  return null;
};

// ─── Pattern-based fallback hints ───────────────────────────────────────────

const generateHint = (stderr = "", language = "") => {
  const s = stderr.toLowerCase();
  if (s.includes("undeclared") || s.includes("cannot find symbol") || s.includes("nameerror"))
    return "💡 It looks like a variable or function is not declared. Check your spelling and make sure you declared it before use.";
  if (s.includes("syntax error") || s.includes("syntaxerror") || s.includes("expected"))
    return "💡 Syntax error detected. Check for missing semicolons (;), brackets {}, or parentheses ().";
  if (s.includes("indentationerror"))
    return "💡 Python uses indentation (spaces/tabs) to define code blocks. Make sure your indentation is consistent.";
  if (s.includes("typeerror"))
    return "💡 You're using a value of the wrong type. Check if you're mixing strings and numbers without converting them.";
  if (s.includes("zerodivisionerror"))
    return "💡 You are dividing by zero. Add a check to make sure the divisor is not 0 before dividing.";
  if (s.includes("indexerror") || s.includes("out of bounds"))
    return "💡 You are accessing an index that doesn't exist in the array/list. Check your loop bounds and array length.";
  if (s.includes("nullpointerexception"))
    return "💡 A NullPointerException means you're using an object that hasn't been initialized. Check if the object is null before using it.";
  if (s.includes("segmentation fault"))
    return "💡 Segmentation fault usually means you accessed memory you shouldn't — check array bounds and pointer usage.";
  if (s.includes("stack overflow") || s.includes("recursionerror"))
    return "💡 Stack overflow usually means infinite recursion. Make sure your recursive function has a proper base case.";
  if (s.includes("timeout") || s.includes("timed out") || s.includes("killed"))
    return "💡 Your code took too long to run or used too much memory. Check for infinite loops or massive data structures.";
  if (s.includes("linker") || s.includes("undefined reference"))
    return "💡 Linker error: a function you called is not defined anywhere. Make sure you included the right headers or defined the function.";
  if (s.includes("include") || s.includes("no such file"))
    return "💡 A required file or header is missing. Check your #include statements or import paths.";
  if (s.includes("return"))
    return "💡 Make sure your main() function or method returns the correct type (e.g., return 0; for C/C++).";
  if ((language === "c" || language === "cpp") && s.includes("implicit"))
    return "💡 In C/C++, you must declare functions before calling them. Add a function prototype or move the definition above the call.";

  return "💡 Review your code carefully. Compare it with the example in the lesson above.";
};

// ─── Main controller ─────────────────────────────────────────────────────────

const executeCode = async (req, res) => {
  const language = String(req.params.language || "").toLowerCase();
  const { email = "guest@codevibe.com", code = "", input = "" } = req.body || {};

  const allowed = new Set(["c", "cpp", "python", "java", "node", "javascript", "dbms", "mongo"]);
  if (!allowed.has(language)) return res.status(400).json({ message: `Language '${language}' not supported` });
  if (!code || !String(code).trim()) return res.status(400).json({ message: "No code provided" });

  const safeEmail = String(email).slice(0, 254);

  let output = "", err = "", executionTime = 0, errorType = null, errorLine = null, hint = null, stderr = "";

  try {
    const result = await compilerService.execute(language, String(code), String(input));
    output = result.stdout || "";
    stderr = result.stderr || "";
    executionTime = result.executionTime || 0;
  } catch (e) {
    if (e instanceof ExecutionError) {
      stderr = e.stderr || e.stdout || e.message;
      executionTime = e.executionTime || 0;
      const timedOut = e instanceof TimeoutError;
      errorType = classifyError(stderr, timedOut);
    } else {
      stderr = e.message || String(e) || "Unknown execution error";
      errorType = "ExecutionError";
    }
    errorLine = extractErrorLine(stderr);
    err = stderr;
    hint = generateHint(stderr, language);
  }

  // ─── Persist log ───────────────────────────────────────────────────────────
  try {
    await ExecuteLog.create({
      email: safeEmail,
      language,
      code: String(code).slice(0, 10000),
      output: err ? "" : String(output || "").trim(),
      error: err ? String(err).trim() : ""
    });
  } catch (dbErr) {
    console.warn("ExecuteLog create failed:", dbErr?.message || dbErr);
  }

  // ─── Response ──────────────────────────────────────────────────────────────
  if (err) {
    return res.status(400).json({
      message: "Execution error",
      error: err,
      errorType,
      errorLine,
      hint,
      stderr,
      executionTime
    });
  }

  res.json({
    output: String(output || "").trim(),
    executionTime,
    errorType: null
  });
};

module.exports = { executeCode };
