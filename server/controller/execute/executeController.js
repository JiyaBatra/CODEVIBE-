// controllers/execute/executeController.js
// Security-hardening: replace shell `exec()` usage with spawn/execFile
// and safe temporary file handling. See TODO for full sandboxing note.
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs/promises");
const os = require("os");
const crypto = require("crypto");
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

// ─── Safer command runner using spawn (no shell interpolation) ──────────────
// Notes:
// - We avoid building shell command strings; we pass args as arrays to spawn.
// - Temporary files are placed in a fresh temp directory under OS tmp.
// - Process is killed after `EXEC_TIMEOUT_MS` milliseconds.
// - This is NOT a full sandbox — running arbitrary user code can still
//   perform malicious actions. Prefer containerized execution for production.

const EXEC_TIMEOUT_MS = 8000;

const makeTempDir = async () => {
  const base = await fs.mkdtemp(path.join(os.tmpdir(), "codevibe-"));
  return base;
};

const safeWriteFile = async (dir, name, content) => {
  const filePath = path.join(dir, name);
  await fs.writeFile(filePath, content, { mode: 0o600 });
  return filePath;
};

const runSpawn = (cmd, args, opts = {}) =>
  new Promise((resolve) => {
    const child = spawn(cmd, args, { shell: false, ...opts });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const start = Date.now();

    const timer = setTimeout(() => {
      timedOut = true;
      try { child.kill("SIGKILL"); } catch (e) { /* ignore */ }
    }, EXEC_TIMEOUT_MS);

    child.stdout?.on("data", (d) => (stdout += d.toString()));
    child.stderr?.on("data", (d) => (stderr += d.toString()));

    child.on("close", (code, signal) => {
      clearTimeout(timer);
      const executionTime = Date.now() - start;
      resolve({ code, signal, stdout, stderr, timedOut, executionTime });
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({ code: null, signal: null, stdout, stderr: String(err), timedOut, executionTime: Date.now() - start });
    });
  });

// Run user code in a temp directory with minimal shell exposure.
const runCodeInTempDir = async (language, code) => {
  const tmpDir = await makeTempDir();
  const results = { stdout: "", stderr: "", executionTime: 0, timedOut: false };

  // Use a randomly-named file basename to avoid predictable filenames.
  const baseName = `usercode_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

  try {
    switch (language) {
      case "c": {
        const src = `${baseName}.c`;
        const out = path.join(tmpDir, `${baseName}.out`);
        const srcPath = await safeWriteFile(tmpDir, src, code);

        // Compile with gcc (args array prevents shell injection)
        const compile = await runSpawn("gcc", [srcPath, "-o", out]);
        if (compile.code !== 0) return { stderr: compile.stderr || compile.stdout, executionTime: compile.executionTime, timedOut: compile.timedOut };

        const run = await runSpawn(out, [], { cwd: tmpDir });
        return { stdout: run.stdout, stderr: run.stderr, executionTime: run.executionTime, timedOut: run.timedOut };
      }

      case "cpp": {
        const src = `${baseName}.cpp`;
        const out = path.join(tmpDir, `${baseName}.out`);
        const srcPath = await safeWriteFile(tmpDir, src, code);

        const compile = await runSpawn("g++", [srcPath, "-o", out]);
        if (compile.code !== 0) return { stderr: compile.stderr || compile.stdout, executionTime: compile.executionTime, timedOut: compile.timedOut };

        const run = await runSpawn(out, [], { cwd: tmpDir });
        return { stdout: run.stdout, stderr: run.stderr, executionTime: run.executionTime, timedOut: run.timedOut };
      }

      case "python": {
        const src = `${baseName}.py`;
        const srcPath = await safeWriteFile(tmpDir, src, code);
        const run = await runSpawn("python3", [srcPath]);
        return { stdout: run.stdout, stderr: run.stderr, executionTime: run.executionTime, timedOut: run.timedOut };
      }

      case "java": {
        const src = `${baseName}.java`;
        const srcPath = await safeWriteFile(tmpDir, src, code);
        // Java requires class with same name as file; baseName used consistently
        const compile = await runSpawn("javac", [srcPath]);
        if (compile.code !== 0) return { stderr: compile.stderr || compile.stdout, executionTime: compile.executionTime, timedOut: compile.timedOut };

        const className = path.basename(src, ".java");
        const run = await runSpawn("java", ["-cp", tmpDir, className]);
        return { stdout: run.stdout, stderr: run.stderr, executionTime: run.executionTime, timedOut: run.timedOut };
      }

      case "node":
      case "javascript": {
        const src = `${baseName}.js`;
        const srcPath = await safeWriteFile(tmpDir, src, code);
        const run = await runSpawn("node", [srcPath]);
        return { stdout: run.stdout, stderr: run.stderr, executionTime: run.executionTime, timedOut: run.timedOut };
      }

      case "dbms":
      case "mongo": {
        return { stdout: "✅ Simulated DB/MS execution: Query parsed successfully.", stderr: "", executionTime: 0, timedOut: false };
      }

      default:
        return { stderr: `Language '${language}' not supported`, executionTime: 0, timedOut: false };
    }
  } finally {
    // Best-effort cleanup of temp dir (async). Ignore errors during cleanup.
    try {
      const files = await fs.readdir(tmpDir);
      await Promise.all(files.map((f) => fs.unlink(path.join(tmpDir, f)).catch(() => {})));
      await fs.rmdir(tmpDir).catch(() => {});
    } catch (e) {
      // ignore cleanup errors
    }
  }
};

// ─── Main controller ─────────────────────────────────────────────────────────

const executeCode = async (req, res) => {
  const language = String(req.params.language || "").toLowerCase();
  const { email = "guest@codevibe.com", code = "" } = req.body || {};

  // Basic validation
  const allowed = new Set(["c", "cpp", "python", "java", "node", "javascript", "dbms", "mongo"]);
  if (!allowed.has(language)) return res.status(400).json({ message: `Language '${language}' not supported` });
  if (!code || !String(code).trim()) return res.status(400).json({ message: "No code provided" });

  // Sanitize simple headers: email should be a string and limited length
  const safeEmail = String(email).slice(0, 254);

  let output = "", err = "", executionTime = 0, errorType = null, errorLine = null, hint = null, stderr = "";

  try {
    const result = await runCodeInTempDir(language, String(code));
    output = result.stdout || "";
    stderr = result.stderr || "";
    executionTime = result.executionTime || 0;
    if (result.timedOut) throw { stderr: stderr || "Execution timed out", timedOut: true, executionTime };
    if (stderr && stderr.length && !output) throw { stderr, timedOut: false, executionTime };
  } catch (e) {
    stderr = e?.stderr || String(e) || "Unknown execution error";
    const timedOut = e?.timedOut || false;
    executionTime = e?.executionTime || 0;
    errorType = classifyError(stderr, timedOut);
    errorLine = extractErrorLine(stderr);
    err = stderr;
    hint = generateHint(stderr, language);
  }

  // ─── Persist log ───────────────────────────────────────────────────────────
  try {
    await ExecuteLog.create({
      email: safeEmail,
      language,
      code: String(code).slice(0, 10000), // limit stored code to avoid huge docs
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
