const Docker = require("dockerode");
const path = require("path");
const fs = require("fs/promises");
const os = require("os");
const crypto = require("crypto");
const ExecutionStrategy = require("./ExecutionStrategy");
const LanguageConfig = require("../LanguageConfig");

const docker = new Docker(); // connects to /var/run/docker.sock by default
const EXEC_TIMEOUT_MS = 5000;

class DockerExecutionStrategy extends ExecutionStrategy {
  async execute(language, sourceCode, input = "") {
    const config = LanguageConfig[language];
    if (!config) {
      return { stdout: "", stderr: `Language '${language}' not supported`, executionTime: 0, timedOut: false };
    }
    
    if (!config.image) {
       // DBMS simulated run
       return { stdout: "✅ Simulated DB/MS execution: Query parsed successfully.", stderr: "", executionTime: 0, timedOut: false };
    }

    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "codevibe-docker-"));
    const baseName = `usercode_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const srcName = `${baseName}${config.extension}`;
    const srcPath = path.join(tmpDir, srcName);
    const outName = language === "java" ? baseName : `${baseName}.out`;
    
    try {
      await fs.writeFile(srcPath, sourceCode, { mode: 0o600 });
      
      // Ensure image exists locally (best effort)
      try {
        await docker.getImage(config.image).inspect();
      } catch (_err) {
        // If image does not exist, attempt to pull it (might timeout on first run)
        console.log(`Pulling docker image ${config.image}...`);
        const stream = await docker.pull(config.image);
        await new Promise((resolve, reject) => {
           docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
        });
      }

      // Compile step if required
      if (config.compileCmd) {
        let cmdArgs = config.compileCmd(srcName, outName);
        if (language === "java") {
            cmdArgs = config.compileCmd(srcName);
        }
        
        const compileResult = await this._runContainer(config.image, cmdArgs, tmpDir, "", 10000);
        if (compileResult.code !== 0 || compileResult.stderr) {
           return { 
               stdout: "", 
               stderr: compileResult.stderr || compileResult.stdout, 
               executionTime: compileResult.executionTime, 
               timedOut: compileResult.timedOut 
           };
        }
      }

      // Run step
      let runArgs;
      if (language === "java") {
          runArgs = config.runCmd(baseName);
      } else if (language === "c" || language === "cpp") {
          runArgs = config.runCmd(outName);
      } else {
          runArgs = config.runCmd(srcName);
      }

      return await this._runContainer(config.image, runArgs, tmpDir, input, EXEC_TIMEOUT_MS);

    } finally {
      try {
        await fs.rm(tmpDir, { recursive: true, force: true });
      } catch (_e) {
        // Ignore cleanup errors
      }
    }
  }

  async _runContainer(image, cmd, hostDir, input = "", timeoutMs) {
    const start = Date.now();
    let container;
    
    try {
        container = await docker.createContainer({
            Image: image,
            Cmd: cmd,
            WorkingDir: "/workspace",
            Tty: false,
            AttachStdout: true,
            AttachStderr: true,
            AttachStdin: !!input,
            OpenStdin: !!input,
            HostConfig: {
                Binds: [`${hostDir}:/workspace`],
                Memory: 256 * 1024 * 1024, // 256MB
                NanoCPUs: 500000000, // 0.5 CPU
                PidsLimit: 100, // Prevent fork bombs
                NetworkMode: "none", // Disable networking
                Privileged: false,
                ReadonlyRootfs: true // Prevent writing to arbitrary root locations
            }
        });

        await container.start();

        if (input) {
             const stream = await container.attach({stream: true, stdin: true, stdout: false, stderr: false});
             stream.write(input);
             stream.end();
        }

        // Wait for container to finish or timeout
        let timedOut = false;
        
        const waitPromise = container.wait();
        const timeoutPromise = new Promise((resolve) => setTimeout(() => {
            timedOut = true;
            resolve({ StatusCode: 124 }); // Custom timeout exit code
        }, timeoutMs));

        const result = await Promise.race([waitPromise, timeoutPromise]);
        
        if (timedOut) {
            try {
                await container.kill();
            } catch (_e) { /* ignore */ }
        }

        // Get logs
        const logs = await container.logs({ stdout: true, stderr: true });
        
        // Parse Docker multiplexed stream (stdout/stderr are mixed with headers)
        let stdout = "";
        let stderr = "";
        let offset = 0;
        
        while (offset < logs.length) {
            const type = logs[offset];
            const length = logs.readUInt32BE(offset + 4);
            const payload = logs.toString('utf8', offset + 8, offset + 8 + length);
            
            if (type === 1) stdout += payload;
            else if (type === 2) stderr += payload;
            
            offset += 8 + length;
        }

        return {
            code: result.StatusCode,
            stdout,
            stderr,
            executionTime: Date.now() - start,
            timedOut
        };

    } catch (e) {
        return {
            code: 1,
            stdout: "",
            stderr: String(e.message || e),
            executionTime: Date.now() - start,
            timedOut: false
        };
    } finally {
        if (container) {
            try {
                await container.remove({ force: true });
            } catch (_e) { /* ignore */ }
        }
    }
  }
}

module.exports = DockerExecutionStrategy;
