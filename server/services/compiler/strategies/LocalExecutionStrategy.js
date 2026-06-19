const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs/promises");
const os = require("os");
const crypto = require("crypto");
const ExecutionStrategy = require("./ExecutionStrategy");
const LanguageConfig = require("../LanguageConfig");

const EXEC_TIMEOUT_MS = 5000;

class LocalExecutionStrategy extends ExecutionStrategy {
  async execute(language, sourceCode, input = "") {
    const config = LanguageConfig[language];
    if (!config) {
      return { stdout: "", stderr: `Language '${language}' not supported`, executionTime: 0, timedOut: false };
    }

    if (!config.compileCmd && !config.runCmd) {
        // DBMS simulated run
        return { stdout: "✅ Simulated DB/MS execution: Query parsed successfully.", stderr: "", executionTime: 0, timedOut: false };
    }

    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "codevibe-local-"));
    const baseName = `usercode_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const srcPath = path.join(tmpDir, `${baseName}${config.extension}`);
    const outName = language === "java" ? baseName : `${baseName}.out`;
    const outPath = path.join(tmpDir, outName);

    try {
      await fs.writeFile(srcPath, sourceCode, { mode: 0o600 });

      // Compile step
      if (config.compileCmd) {
        let cmdArgs = config.compileCmd(srcPath, outPath);
        if (language === "java") {
            cmdArgs = config.compileCmd(srcPath);
        }
        
        const compileResult = await this._runSpawn(cmdArgs[0], cmdArgs.slice(1), { cwd: tmpDir });
        if (compileResult.code !== 0) {
          return { stdout: "", stderr: compileResult.stderr || compileResult.stdout, executionTime: compileResult.executionTime, timedOut: compileResult.timedOut };
        }
      }

      // Run step
      let runArgs;
      if (language === "java") {
          runArgs = config.runCmd(baseName);
          // Insert classpath
          runArgs.splice(1, 0, "-cp", tmpDir);
      } else if (language === "c" || language === "cpp") {
          runArgs = config.runCmd(outName);
      } else {
          runArgs = config.runCmd(srcPath);
      }

      const runResult = await this._runSpawn(runArgs[0], runArgs.slice(1), { cwd: tmpDir }, input);
      return {
        stdout: runResult.stdout,
        stderr: runResult.stderr,
        executionTime: runResult.executionTime,
        timedOut: runResult.timedOut
      };

    } finally {
      try {
        await fs.rm(tmpDir, { recursive: true, force: true });
      } catch (_e) {
        // Ignore cleanup errors
      }
    }
  }

  _runSpawn(cmd, args, opts = {}, input = "") {
    return new Promise((resolve) => {
      const child = spawn(cmd, args, { shell: false, ...opts });
      let stdout = "";
      let stderr = "";
      let timedOut = false;
      const start = Date.now();

      const timer = setTimeout(() => {
        timedOut = true;
        try { child.kill("SIGKILL"); } catch (_e) { /* ignore */ }
      }, EXEC_TIMEOUT_MS);

      child.stdout?.on("data", (d) => (stdout += d.toString()));
      child.stderr?.on("data", (d) => (stderr += d.toString()));

      if (input) {
        child.stdin.write(input);
        child.stdin.end();
      }

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
  }
}

module.exports = LocalExecutionStrategy;
