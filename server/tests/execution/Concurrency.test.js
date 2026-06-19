const DockerExecutionStrategy = require("../../services/compiler/strategies/DockerExecutionStrategy");
const LocalExecutionStrategy = require("../../services/compiler/strategies/LocalExecutionStrategy");
const Docker = require("dockerode");

const docker = new Docker();
let isDockerRunning = false;

describe("Concurrency", () => {
  beforeAll(async () => {
    try {
      await docker.ping();
      isDockerRunning = true;
    } catch (_e) {
      // ignore
    }
  });

  const runParallel = async (strategy, count) => {
    const code = 'console.log("Concurrency Test")';
    const promises = [];
    for (let i = 0; i < count; i++) {
      promises.push(strategy.execute("javascript", code));
    }
    const results = await Promise.all(promises);
    return results;
  };

  test("Local: 10 parallel executions", async () => {
    const strategy = new LocalExecutionStrategy();
    const results = await runParallel(strategy, 10);
    expect(results.length).toBe(10);
    results.forEach(res => {
      expect(res.stdout.trim()).toBe("Concurrency Test");
      expect(res.timedOut).toBe(false);
    });
  }, 20000);

  test("Docker: 10 parallel executions", async () => {
    if (!isDockerRunning) return;
    const strategy = new DockerExecutionStrategy();
    const results = await runParallel(strategy, 10);
    expect(results.length).toBe(10);
    results.forEach(res => {
      expect(res.stdout.trim()).toBe("Concurrency Test");
      expect(res.timedOut).toBe(false);
    });
  }, 30000);
});
