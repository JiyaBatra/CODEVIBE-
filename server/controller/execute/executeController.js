// controllers/execute/executeController.js
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const ExecuteLog = require("../../models/execute.model");

// ─── Error classification ───────────────────────────────────────────────────

const classifyError = (stderr = "", timedOut = false) => {
  if (timedOut) return "TimeoutError";
  const s = stderr.toLowerCase();
  // Compilation-phase errors (before the program runs)
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
  // Runtime errors
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
    s.includes("nullpointerexception")
  ) return "RuntimeError";
  return "ExecutionError";
};

// ─── Extract first error line number from compiler stderr ────────────────────

const extractErrorLine = (stderr = "") => {
  // C/C++: file.c:3:5: error: ...
  const ccMatch = stderr.match(/:(\d+):\d+:/);
  if (ccMatch) return parseInt(ccMatch[1], 10);
  // Python: line 3 / File "...", line 3
  const pyMatch = stderr.match(/line (\d+)/i);
  if (pyMatch) return parseInt(pyMatch[1], 10);
  // Java: JsLesson1.java:5: error:
  const javaMatch = stderr.match(/\.java:(\d+):/);
  if (javaMatch) return parseInt(javaMatch[1], 10);
  // Node.js: at line X
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
  if (s.includes("timeout") || s.includes("timed out"))
    return "💡 Your code took too long to run. Check for infinite loops — a loop condition that never becomes false.";
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

// ─── Command runner with timing ──────────────────────────────────────────────

const runCommandWithTempFile = (commandBuilder, code, ext) =>
  new Promise((resolve, reject) => {
    const filename = `temp_${Date.now()}.${ext}`;
    const filepath = path.join(process.cwd(), filename);

    try {
      fs.writeFileSync(filepath, code);
    } catch (e) {
      return reject({ stderr: `Failed to write temp file: ${e.message}`, timedOut: false });
    }

    const startTime = Date.now();

    exec(commandBuilder(filepath), { timeout: 8000 }, (error, stdout, stderr) => {
      const executionTime = Date.now() - startTime;

      try { if (fs.existsSync(filepath)) fs.unlinkSync(filepath); } catch {}
      try { if (fs.existsSync(`${filepath}.out`)) fs.unlinkSync(`${filepath}.out`); } catch {}
      try { if (fs.existsSync(`${filepath.replace(/\.\w+$/, ".class")}`)) fs.unlinkSync(`${filepath.replace(/\.\w+$/, ".class")}`); } catch {}

      if (error) {
        const timedOut = error.killed || (error.signal === "SIGTERM") || String(error.message).includes("timeout");
        return reject({ stderr: stderr || error.message, timedOut, executionTime });
      }
      resolve({ stdout, executionTime });
    });
  });

// ─── Main controller ─────────────────────────────────────────────────────────

const executeCode = async (req, res) => {
  const { language } = req.params;
  const { email = "guest@codevibe.com", code = "" } = req.body || {};

  if (!code.trim()) return res.status(400).json({ message: "No code provided" });

  let output = "", err = "", executionTime = 0, errorType = null, errorLine = null, hint = null, stderr = "";

  try {
    switch ((language || "").toLowerCase()) {
      case "c":
        ({ stdout: output, executionTime } = await runCommandWithTempFile(
          (file) => `gcc "${file}" -o "${file}.out" && "${file}.out"`, code, "c"
        ));
        break;
      case "cpp":
        ({ stdout: output, executionTime } = await runCommandWithTempFile(
          (file) => `g++ "${file}" -o "${file}.out" && "${file}.out"`, code, "cpp"
        ));
        break;
      case "python":
        ({ stdout: output, executionTime } = await runCommandWithTempFile(
          (file) => `python3 "${file}"`, code, "py"
        ));
        break;
      case "java":
        ({ stdout: output, executionTime } = await runCommandWithTempFile(
          (file) => `javac "${file}" && java -cp "${path.dirname(file)}" ${path.basename(file, ".java")}`,
          code, "java"
        ));
        break;
      case "node":
      case "javascript":
        ({ stdout: output, executionTime } = await runCommandWithTempFile(
          (file) => `node "${file}"`, code, "js"
        ));
        break;
      case "dbms":
      case "mongo":
        output = "✅ Simulated DB/MS execution: Query parsed successfully.";
        executionTime = 0;
        break;
      default:
        return res.status(400).json({ message: `Language '${language}' not supported` });
    }
  } catch (e) {
    stderr = e?.stderr || String(e) || "Unknown execution error";
    const timedOut = e?.timedOut || false;
    executionTime = e?.executionTime || 0;
    errorType = classifyError(stderr, timedOut);
    errorLine = extractErrorLine(stderr);
    err = stderr;
    hint = generateHint(stderr, (language || "").toLowerCase());
  }

  // ─── Persist log ───────────────────────────────────────────────────────────
  try {
    await ExecuteLog.create({
      email,
      language,
      code,
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
