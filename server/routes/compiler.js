const { exec, spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const EXECUTION_TIMEOUT_MS = 5000;  // 5 seconds
const MAX_OUTPUT_BYTES = 10240;     // 10 KB

// Inside the route handler, for language === 'c':
const tmpDir = `/tmp/codevibe_${Date.now()}_${Math.random().toString(36).slice(2)}`;
const srcFile = path.join(tmpDir, 'program.c');
const binFile = path.join(tmpDir, 'program');

try {
  await fs.mkdir(tmpDir, { recursive: true });
  await fs.writeFile(srcFile, code, { encoding: 'utf8' });

  // Compile step (10s limit is generous — gcc is fast)
  await new Promise((resolve, reject) => {
    exec(`gcc -o ${binFile} ${srcFile} -Wall`, { timeout: 10000 }, (err, _, stderr) => {
      if (err) reject(new Error(stderr || 'Compilation failed'));
      else resolve();
    });
  });

  // Execute with hard limits
  const child = spawn(binFile, [], {
    timeout: EXECUTION_TIMEOUT_MS,
    maxBuffer: MAX_OUTPUT_BYTES,
  });

  let output = '';
  let outputSize = 0;

  child.stdout.on('data', (d) => {
    outputSize += d.length;
    if (outputSize <= MAX_OUTPUT_BYTES) output += d.toString();
  });
  child.stderr.on('data', (d) => {
    outputSize += d.length;
    if (outputSize <= MAX_OUTPUT_BYTES) output += d.toString();
  });

  child.on('close', async (code, signal) => {
    await fs.rm(tmpDir, { recursive: true, force: true });
    if (signal === 'SIGTERM') {
      return res.status(408).json({
        error: 'Execution timed out (5s limit). Check for infinite loops.',
        exitCode: null,
      });
    }
    res.json({ output, exitCode: code });
  });

  child.on('error', async (err) => {
    await fs.rm(tmpDir, { recursive: true, force: true });
    res.status(500).json({ error: 'Execution failed', detail: err.message });
  });
} catch (compileErr) {
  await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  res.status(400).json({ error: compileErr.message });
}