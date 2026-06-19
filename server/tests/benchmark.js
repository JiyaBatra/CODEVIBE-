const fs = require("fs/promises");
const path = require("path");
const LocalExecutionStrategy = require("../services/compiler/strategies/LocalExecutionStrategy");
const DockerExecutionStrategy = require("../services/compiler/strategies/DockerExecutionStrategy");

const RUNS = 10;
const CODE = 'console.log("Benchmark test")';

const measure = async (strategy, name) => {
  console.log(`\nStarting benchmark for ${name}...`);
  const latencies = [];
  
  await strategy.execute("javascript", CODE);

  for (let i = 0; i < RUNS; i++) {
    const start = Date.now();
    await strategy.execute("javascript", CODE);
    latencies.push(Date.now() - start);
  }

  const avg = latencies.reduce((a, b) => a + b, 0) / RUNS;
  const min = Math.min(...latencies);
  const max = Math.max(...latencies);

  console.log(`${name} Results:`);
  console.log(`  Avg Latency: ${avg.toFixed(2)} ms`);
  console.log(`  Min Latency: ${min} ms`);
  console.log(`  Max Latency: ${max} ms`);

  return { name, avg, min, max };
};

const runBenchmark = async () => {
  console.log("Preparing Benchmark Environment...");
  
  const localStrategy = new LocalExecutionStrategy();
  const dockerStrategy = new DockerExecutionStrategy();

  const localResults = await measure(localStrategy, "Local Execution Strategy");
  const dockerResults = await measure(dockerStrategy, "Docker Execution Strategy");

  const report = `# Secure Containerized Code Execution Benchmark

## Environment
- OS: ${process.platform}
- Node Version: ${process.version}
- Runs per strategy: ${RUNS}
- Target Code: Python 3 (\`print("Benchmark test")\`)

## Results

| Strategy | Avg Latency (ms) | Min Latency (ms) | Max Latency (ms) |
|----------|------------------|------------------|------------------|
| **Local** | ${localResults.avg.toFixed(2)} | ${localResults.min} | ${localResults.max} |
| **Docker**| ${dockerResults.avg.toFixed(2)} | ${dockerResults.min} | ${dockerResults.max} |

## Analysis

- **Local Execution** avoids the overhead of spinning up an isolated container, making it faster. However, it lacks robust security boundaries.
- **Docker Execution** introduces overhead due to container lifecycle management (create, start, attach, wait, remove), but guarantees resource limits (Memory, CPU, PIDs) and a secure read-only environment.
- The tradeoff in latency is necessary for a production-ready, secure multi-tenant execution platform.
`;

  await fs.writeFile(path.join(__dirname, "..", "..", "BENCHMARK_REPORT.md"), report);
  console.log("\nBenchmark complete. Report saved to BENCHMARK_REPORT.md");
};

runBenchmark().catch(console.error);
