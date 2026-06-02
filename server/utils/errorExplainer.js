// server/utils/errorExplainer.js
const ExecuteLog = require("../models/execute.model");

/**
 * Clean up markdown display for safe rendering.
 */
const escapeHtml = (text = "") => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

/**
 * Checks for repeated mistakes in the database.
 */
const getRepeatedMistakes = async (email, language) => {
  if (!email || email === "guest@codevibe.com") {
    return null;
  }
  try {
    // Find last 5 logs for this email and language
    const logs = await ExecuteLog.find({ email, language })
      .sort({ createdAt: -1 })
      .limit(5);

    const errorLogs = logs.filter((log) => log.error && log.error.trim() !== "");
    if (errorLogs.length >= 3) {
      return {
        count: errorLogs.length,
        message: `We noticed you've encountered compilation or runtime errors ${errorLogs.length} times in your last 5 attempts. Don't worry, debugging is where real learning happens! Try reviewing the "Suggested Fix" example below, or comparing your code line-by-line with the lesson instructions.`
      };
    }
  } catch (e) {
    console.warn("Error fetching repeated mistakes:", e?.message || e);
  }
  return null;
};

/**
 * Generates custom, beginner-friendly structured feedback based on compiler stderr and language.
 */
const explainError = (stderr = "", language = "", code = "") => {
  const s = stderr.toString();
  const sLower = s.toLowerCase();
  const lang = (language || "").toLowerCase();

  // Default fallback explanation
  const defaultExplanation = {
    explanation: "The compiler or interpreter encountered a problem while trying to run your code.",
    probableCauses: [
      "There might be a typo or spelling error in your variables, functions, or keywords.",
      "A bracket, brace, parenthesis, or semicolon might be missing or mismatched.",
      "The structure of the code does not match the rules of the language."
    ],
    suggestedFix: `// Double check your syntax and spelling:\n${code.substring(0, 150)}${code.length > 150 ? "..." : ""}`,
    learningTip: "Every programmer spends a significant amount of time debugging! Look at the error lines, inspect the surrounding code, and compare it with the examples in the lesson."
  };

  if (!s.trim()) return defaultExplanation;

  // ─── PYTHON PARSER ──────────────────────────────────────────────────────────
  if (lang === "python") {
    // NameError
    const nameErrorMatch = s.match(/NameError:\s+name\s+'([^']+)'\s+is\s+not\s+defined/);
    if (nameErrorMatch) {
      const varName = nameErrorMatch[1];
      return {
        explanation: `Python doesn't recognize the name "${varName}". It thinks this is a variable or function, but it has not been defined yet.`,
        probableCauses: [
          `You misspelled the name (e.g., writing "myvar" instead of "myVar" - Python is case-sensitive!).`,
          `You forgot to define "${varName}" before calling it.`,
          `You're using a function or module but forgot to write its import statement at the top of the file.`
        ],
        suggestedFix: `# Define the variable before using it:\n${varName} = "some value"\nprint(${varName})`,
        learningTip: "Before using a box (variable) in Python, you must create it and put something inside. Make sure your spelling matches exactly!"
      };
    }

    // SyntaxError
    if (sLower.includes("syntaxerror")) {
      let details = "Your code breaks Python's formatting rules.";
      let suggestedFix = `# Double-check code syntax:\nx = 10\nif x > 5:\n    print("x is greater than 5")`;
      const causes = [
        "You forgot a colon (:) at the end of an 'if', 'for', 'while', 'elif', or 'def' line.",
        "You have unmatched brackets like ( ), [ ], or { }.",
        "You started a string with a single quote (') and ended it with a double quote (\") or vice versa."
      ];

      if (sLower.includes("expected ':'")) {
        details = "You are missing a colon (:) at the end of a header line.";
        causes.unshift("You forgot to write a colon (:) at the end of your conditional header, loop header, or function declaration.");
        suggestedFix = `# Add a colon at the end of your header statement:\nif condition:\n    # code block here`;
      } else if (sLower.includes("was never closed")) {
        details = "A parenthesis, bracket, or curly brace was opened but never closed.";
        causes.unshift("You opened a parentheses '(' or bracket '[' but forgot to close it with ')' or ']'.");
        suggestedFix = `# Ensure all brackets match:\nnumbers = [1, 2, 3] # Closed correctly!`;
      }

      return {
        explanation: details,
        probableCauses: causes,
        suggestedFix,
        learningTip: "Syntax errors are like grammar mistakes in writing. Python reads line-by-line and stops the moment a rule is broken. Look closely at the error line indicator!"
      };
    }

    // IndentationError
    if (sLower.includes("indentationerror")) {
      return {
        explanation: "Python is very strict about spaces! Code blocks inside loops, functions, and 'if' statements must be indented consistently.",
        probableCauses: [
          "You forgot to indent the code block inside an 'if' statement, 'for' loop, or function ('def').",
          "You mixed spaces and tabs for your indentation (always stick to spaces, typically 4).",
          "An extra space was added at the beginning of a random line."
        ],
        suggestedFix: `# Consistent indentation (4 spaces):\nif True:\n    print("Inside block") # Indented!\nprint("Outside block") # Not indented`,
        learningTip: "Unlike other languages that use curly braces {} to define blocks, Python uses whitespace. Ensure all statements inside a block align perfectly."
      };
    }

    // TypeError
    const typeErrorMatch = s.match(/TypeError:\s*(.*)/);
    if (typeErrorMatch) {
      const msg = typeErrorMatch[1];
      return {
        explanation: `A Type Error occurred: ${msg}. You tried to do something with a value that its data type does not support.`,
        probableCauses: [
          "You tried to add (concatenate) a string and a number directly (e.g. 'Age: ' + 20).",
          "You called a function or method with the wrong type of arguments.",
          "You tried to modify a value that is immutable (cannot be changed)."
        ],
        suggestedFix: `# Convert numbers to strings before joining them:\nage = 20\nprint("Age: " + str(age))`,
        learningTip: "Data types (like integers, strings, and lists) have different rules. Make sure you convert values to matching types (e.g., using str(), int(), float()) before mixing them."
      };
    }

    // IndexError
    if (sLower.includes("indexerror")) {
      return {
        explanation: "You tried to access an item in a list using an index (position) that does not exist.",
        probableCauses: [
          "You used an index that is too large (e.g., list has 3 items, and you tried to read index 3).",
          "You forgot that list indices start at 0, so a list with 3 items has indices 0, 1, and 2.",
          "The list is completely empty, and you tried to access list[0]."
        ],
        suggestedFix: `# Verify the list length first:\nmy_list = [10, 20]\nif len(my_list) > 0:\n    print(my_list[0]) # Safe access!`,
        learningTip: "Always check the length of your list with len(list) to make sure you aren't accessing index positions that don't exist."
      };
    }

    // KeyError
    const keyErrorMatch = s.match(/KeyError:\s*(.*)/);
    if (keyErrorMatch) {
      const keyName = keyErrorMatch[1];
      return {
        explanation: `You tried to look up the key ${keyName} in a dictionary, but that key doesn't exist.`,
        probableCauses: [
          `You misspelled the key name.`,
          `The key was never added to the dictionary.`,
          `The key was deleted before you tried to access it.`
        ],
        suggestedFix: `# Check if the key exists before reading:\nuser = {"name": "Bob"}\nif "name" in user:\n    print(user["name"])`,
        learningTip: "Dictionaries store key-value pairs. If you access a key that isn't defined, Python crashes. Use the '.get(key, default)' method to avoid errors!"
      };
    }

    // ZeroDivisionError
    if (sLower.includes("zerodivisionerror")) {
      return {
        explanation: "You tried to divide a number by zero, which is mathematically impossible.",
        probableCauses: [
          "You have a division expression (x / y) where the denominator y evaluates to 0.",
          "A loop or calculation set your divisor variable to 0."
        ],
        suggestedFix: `# Verify divisor is not zero before dividing:\nnum = 10\ndenominator = 0\nif denominator != 0:\n    result = num / denominator\nelse:\n    result = 0`,
        learningTip: "Always put an 'if' check before dividing if the divisor is a variable that could potentially be zero."
      };
    }
  }

  // ─── JAVASCRIPT / NODE / REACT PARSER ──────────────────────────────────────
  if (lang === "javascript" || lang === "node" || lang === "react" || lang === "js" || lang === "dsa-js" || lang === "oop-js") {
    // ReferenceError
    const refErrorMatch = s.match(/ReferenceError:\s+(\w+)\s+is\s+not\s+defined/);
    if (refErrorMatch) {
      const varName = refErrorMatch[1];
      return {
        explanation: `JavaScript doesn't know what "${varName}" is. It has either not been declared, or it is outside of the scope where it was defined.`,
        probableCauses: [
          `You made a typo in the variable or function name.`,
          `You forgot to declare "${varName}" using let, const, or var.`,
          `The variable was declared inside a function or code block {}, but you are trying to access it outside that block.`
        ],
        suggestedFix: `// Declare variables before use:\nlet ${varName} = "hello";\nconsole.log(${varName});`,
        learningTip: "JavaScript requires variables to be declared (created) using 'let' or 'const' before you read them. Check for spelling typos!"
      };
    }

    // TypeError: Cannot read properties of undefined/null
    if (sLower.includes("typeerror:") && (sLower.includes("read properties of") || sLower.includes("cannot read property"))) {
      const propMatch = s.match(/reading '([^']+)'|Cannot read property '([^']+)'/i);
      const propName = propMatch ? (propMatch[1] || propMatch[2]) : "property";
      return {
        explanation: `Your code tried to read the property "${propName}" on something that is null or undefined.`,
        probableCauses: [
          "The object is empty/null, but you tried to access a property on it.",
          "A function returned undefined, and you tried to read its properties.",
          "You made a typo in the object name, referring to an uninitialized variable."
        ],
        suggestedFix: `// Use optional chaining (?.) to prevent crashes:\nlet user = null;\nconsole.log(user?.${propName}); // returns undefined safely instead of crashing`,
        learningTip: "In JavaScript, null and undefined are empty spaces. Trying to extract a property from them is like asking a blank box what color it is. Use optional chaining (?.) or an 'if' statement to verify objects exist."
      };
    }

    // TypeError
    const typeErrorMatch = s.match(/TypeError:\s*(.*)/);
    if (typeErrorMatch) {
      const msg = typeErrorMatch[1];
      return {
        explanation: `Type error occurred: ${msg}. You attempted an operation on a value of the wrong type.`,
        probableCauses: [
          "You tried to call a non-function variable as if it were a function (e.g. x() when x is a number).",
          "You tried to access a method on a data type that does not support it (e.g., calling string methods on a number)."
        ],
        suggestedFix: `// Ensure the variable is of the correct type:\nlet myFunc = () => { console.log("Hello"); };\nif (typeof myFunc === "function") {\n  myFunc();\n}`,
        learningTip: "Always use 'console.log(typeof variable)' or 'typeof' tests if you are unsure what data type you are working with."
      };
    }

    // SyntaxError
    if (sLower.includes("syntaxerror")) {
      return {
        explanation: "JavaScript found a syntax error, meaning code structure rules were broken.",
        probableCauses: [
          "You have a missing or mismatched closing symbol like parentheses (), brackets [], or braces {}.",
          "You forgot a comma or colon in an object definition.",
          "You have a typo in a keyword (like 'functoin' or 'lett')."
        ],
        suggestedFix: `// Ensure brackets match:\nfunction greet() {\n  console.log("Welcome!");\n} // Closing brace must match opening!`,
        learningTip: "Syntax errors mean the browser/engine cannot parse your code. Look at the line number in the technical log and check if all brackets open and close correctly."
      };
    }

    // RangeError
    if (sLower.includes("rangeerror") || sLower.includes("call stack size exceeded")) {
      return {
        explanation: "Infinite loop or recursion detected! Your code called a function recursively too many times, running out of memory.",
        probableCauses: [
          "Your recursive function is missing a base case (an 'if' statement that stops the function from calling itself again).",
          "The base case condition is never met.",
          "An infinite loop has locked up execution."
        ],
        suggestedFix: `// Ensure recursive functions have a base case:\nfunction countToZero(n) {\n  if (n <= 0) return; // Base case! Stops recursion\n  countToZero(n - 1);\n}`,
        learningTip: "Recursive functions are functions that call themselves. They MUST have a base case that stops them from calling themselves forever, otherwise they overflow the call stack."
      };
    }
  }

  // ─── JAVA PARSER ──────────────────────────────────────────────────────────
  if (lang === "java") {
    // Cannot find symbol
    if (sLower.includes("cannot find symbol")) {
      const symbolMatch = s.match(/symbol:\s+variable\s+(\w+)/i) || s.match(/symbol:\s+class\s+(\w+)/i);
      const sym = symbolMatch ? symbolMatch[1] : "variable/class";
      return {
        explanation: `The Java compiler cannot find the variable or class named "${sym}".`,
        probableCauses: [
          `You misspelled the variable or class name.`,
          `You did not declare the variable with its data type (e.g. "int ${sym} = 5;").`,
          `You forgot to import a standard Java utility (like Scanner or ArrayList).`
        ],
        suggestedFix: `// Declare variable with its type:\nint ${sym} = 10;\nSystem.out.println(${sym});\n// Or import required packages:\nimport java.util.Scanner;`,
        learningTip: "Java is statically typed. Every variable must be declared with a specific type (like int, String, double) before you use it, and spelling must match exactly!"
      };
    }

    // class, interface, or enum expected
    if (sLower.includes("class, interface, or enum expected") || sLower.includes("class, interface, or enum")) {
      return {
        explanation: "The Java compiler found code outside the class. In Java, all statements and methods must live inside a class block.",
        probableCauses: [
          "You wrote code directly at the root of the file, outside the outer class 'public class Main { ... }'.",
          "You have an extra closing brace } early in your file, which closes the class definition prematurely."
        ],
        suggestedFix: `// Wrap all methods inside a class:\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}`,
        learningTip: "Java requires complete object-oriented structure. Every line of logic must be inside a method, and every method must be inside a class."
      };
    }

    // reached end of file while parsing
    if (sLower.includes("reached end of file while parsing")) {
      return {
        explanation: "You are missing a closing curly brace } at the end of your Java program.",
        probableCauses: [
          "You opened a class or method block with { but forgot to close it with }.",
          "An if-statement or loop block is missing its closing brace }."
        ],
        suggestedFix: `public class Main {\n    public static void main(String[] args) {\n        if (true) {\n            System.out.println("Test");\n        } // Closed if block!\n    } // Closed main method!\n} // Closed class!`,
        learningTip: "Count your curly braces! For every open '{', there must be a matching close '}' somewhere below it."
      };
    }

    // NullPointerException
    if (sLower.includes("nullpointerexception")) {
      return {
        explanation: "Your Java code tried to use an object that is null (it points to nothing).",
        probableCauses: [
          "You declared an object variable (like String or custom class) but forgot to initialize it using 'new' or a value.",
          "An element in an array of objects was not initialized."
        ],
        suggestedFix: `// Make sure the object is initialized:\nString name = "Java"; // Initialized!\nif (name != null) {\n    System.out.println(name.length());\n}`,
        learningTip: "A NullPointerException is Java's most common runtime crash. It happens when you try to act on an empty reference. Always initialize objects before using them!"
      };
    }
  }

  // ─── C/C++ PARSER ──────────────────────────────────────────────────────────
  if (lang === "c" || lang === "cpp") {
    // Undeclared identifier
    const undeclaredMatch = s.match(/error:\s+'([^']+)'\s+undeclared/i) || s.match(/error:\s+use\s+of\s+undeclared\s+identifier\s+'([^']+)'/i);
    if (undeclaredMatch) {
      const varName = undeclaredMatch[1];
      return {
        explanation: `The compiler doesn't know what "${varName}" is. In C and C++, you must declare variables before you can use them.`,
        probableCauses: [
          `You misspelled the variable or function name.`,
          `You forgot to define "${varName}" with a type (like int, float, char, etc.).`,
          `You used "${varName}" before the line where it is defined.`
        ],
        suggestedFix: `// Declare the variable with a type:\nint ${varName} = 5;\nprintf("%d", ${varName});`,
        learningTip: "C and C++ are strongly typed and compile from top to bottom. You must declare every variable name with its type before reading it."
      };
    }

    // Expected semicolon
    if (sLower.includes("expected ';'") || sLower.includes("expected ';' before")) {
      return {
        explanation: "You are missing a semicolon (;) at the end of a statement.",
        probableCauses: [
          "You forgot to put a semicolon at the end of the previous line.",
          "You forgot a semicolon inside a structure or class declaration."
        ],
        suggestedFix: `// Add a semicolon at the end of statement lines:\nint x = 5; // Semicolon added!\nprintf("x is %d\\n", x); // Semicolon added!`,
        learningTip: "In C and C++, the compiler uses semicolons (;) to know where a statement ends. A missing semicolon causes the compiler to merge lines and fail!"
      };
    }

    // Segmentation fault
    if (sLower.includes("segmentation fault") || sLower.includes("sigsegv")) {
      return {
        explanation: "Segmentation Fault (SIGSEGV) detected. Your program tried to access a memory space that it does not own or is not allowed to read/write.",
        probableCauses: [
          "You accessed an array index that is out of bounds (e.g., negative index or past the array length).",
          "You dereferenced a pointer that is NULL, uninitialized, or contains an invalid address.",
          "A scanf statement is missing the address-of operator '&' for variables (e.g. scanf(\"%d\", val) instead of scanf(\"%d\", &val)).",
          "You have infinite recursion causing a stack overflow."
        ],
        suggestedFix: `// Correct scanf usage with pointer address:\nint number;\nscanf("%d", &number); // Uses & to point to memory!`,
        learningTip: "Segmentation faults are memory access errors. Double check your pointer math, ensure array indices are valid, and verify scanf functions use '&'."
      };
    }
  }

  // Fallback if no specific regex matches
  return defaultExplanation;
};

module.exports = {
  explainError,
  getRepeatedMistakes
};
