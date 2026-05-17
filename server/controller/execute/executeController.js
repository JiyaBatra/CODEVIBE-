// controllers/execute/executeController.js
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const ExecuteLog = require("../../models/execute.model");

const EXEC_TIMEOUT_MS = 8000;
const MAX_CODE_LENGTH = 12000;

const BLOCKED_PATTERNS = [
  /\bos\.system\s*\(/i,
  /\bsubprocess\b/i,
  /\bchild_process\b/i,
  /\brequire\s*\(\s*['"]child_process['"]\s*\)/i,
  /\bexec\s*\(/i,
  /\beval\s*\(/i,
  /\bFunction\s*\(/i,
];

function validateUserCode(code) {
  if (!code || !code.trim()) {
    return "No code provided";
  }
  if (code.length > MAX_CODE_LENGTH) {
    return "Code exceeds maximum allowed length";
  }
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(code)) {
      return "Code contains disallowed operations for sandboxed execution";
    }
  }
  return null;
}

function extractJavaClassName(code) {
  const match = code.match(/public\s+class\s+([A-Za-z_][\w]*)/);
  return match ? match[1] : "Main";
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      timeout: EXEC_TIMEOUT_MS,
      shell: false,
      ...options,
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (err) => reject(err.message || String(err)));
    child.on("close", (code) => {
      if (code !== 0) return reject(stderr.trim() || `Process exited with code ${code}`);
      resolve(stdout);
    });
  });
}

function resolvePythonCommands() {
  return process.platform === "win32" ? ["python", "py", "python3"] : ["python3", "python"];
}

async function runPython(filepath) {
  const commands = resolvePythonCommands();
  let lastError = "Python runtime not found";

  for (const cmd of commands) {
    try {
      return await runProcess(cmd, [filepath]);
    } catch (err) {
      lastError = String(err);
      if (!/not found|ENOENT|recognized/i.test(lastError)) {
        throw err;
      }
    }
  }

  throw new Error(lastError);
}

const runCommandWithTempFile = async (runner, code, ext) => {
  const filename = `temp_${Date.now()}.${ext}`;
  const filepath = path.join(process.cwd(), filename);

  try {
    fs.writeFileSync(filepath, code, "utf8");
    return await runner(filepath);
  } finally {
    try {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    } catch {
      /* ignore cleanup errors */
    }
    try {
      const outFile = `${filepath}.out`;
      if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
    } catch {
      /* ignore */
    }
    try {
      const classFile = filepath.replace(/\.\w+$/, ".class");
      if (fs.existsSync(classFile)) fs.unlinkSync(classFile);
    } catch {
      /* ignore */
    }
  }
};

const executeCode = async (req, res) => {
  const { language } = req.params;
  const { email = "jia@gmail.com", code = "" } = req.body || {};

  const validationError = validateUserCode(code);
  if (validationError) return res.status(400).json({ message: validationError });

  let output = "";
  let err = "";

  try {
    switch ((language || "").toLowerCase()) {
      case "c": {
        output = await runCommandWithTempFile(async (file) => {
          const outFile = `${file}.out`;
          await runProcess("gcc", [file, "-o", outFile]);
          return runProcess(outFile, []);
        }, code, "c");
        break;
      }
      case "cpp": {
        output = await runCommandWithTempFile(async (file) => {
          const outFile = `${file}.out`;
          await runProcess("g++", [file, "-o", outFile]);
          return runProcess(outFile, []);
        }, code, "cpp");
        break;
      }
      case "python":
        output = await runCommandWithTempFile((file) => runPython(file), code, "py");
        break;
      case "java": {
        const className = extractJavaClassName(code);
        const classDir = path.join(process.cwd(), `java_${Date.now()}`);
        const javaFile = path.join(classDir, `${className}.java`);
        fs.mkdirSync(classDir, { recursive: true });
        fs.writeFileSync(javaFile, code, "utf8");
        try {
          await runProcess("javac", [javaFile]);
          output = await runProcess("java", ["-cp", classDir, className]);
        } finally {
          try {
            fs.rmSync(classDir, { recursive: true, force: true });
          } catch {
            /* ignore */
          }
        }
        break;
      }
      case "node":
      case "javascript":
        output = await runCommandWithTempFile((file) => runProcess("node", [file]), code, "js");
        break;
      case "dbms":
      case "mongo":
        output = "✅ Simulated DB/MS execution: Query parsed successfully.";
        break;
      default:
        return res.status(400).json({ message: `Language '${language}' not supported` });
    }
  } catch (e) {
    err = e?.toString() || "Unknown execution error";
  }

  try {
    await ExecuteLog.create({
      email,
      language,
      code,
      output: err ? "" : String(output || "").trim(),
      error: err ? String(err).trim() : "",
    });
  } catch (dbErr) {
    console.warn("ExecuteLog create failed:", dbErr?.message || dbErr);
  }

  if (err) return res.status(400).json({ message: "Execution error", error: err });
  res.json({ output: String(output || "").trim() });
};

module.exports = { executeCode };
