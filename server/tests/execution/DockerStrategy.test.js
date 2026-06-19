const DockerExecutionStrategy = require("../../services/compiler/strategies/DockerExecutionStrategy");
const Docker = require("dockerode");

const docker = new Docker();
let isDockerRunning = false;

describe("DockerExecutionStrategy", () => {
  let strategy;

  beforeAll(async () => {
    strategy = new DockerExecutionStrategy();
    try {
      await docker.ping();
      isDockerRunning = true;
    } catch (_e) {
      console.warn("Docker is not running, skipping Docker execution tests.");
    }
  });

  test("JavaScript: prints Hello World", async () => {
    if (!isDockerRunning) return;
    const code = 'console.log("Hello World")';
    const result = await strategy.execute("javascript", code);
    expect(result.timedOut).toBe(false);
    expect(result.stdout.trim()).toBe("Hello World");
  }, 25000); // Allow time for pulling image

  test("JavaScript: Syntax Error", async () => {
    if (!isDockerRunning) return;
    const code = 'console.log("Hello World"';
    const result = await strategy.execute("javascript", code);
    expect(result.timedOut).toBe(false);
    expect(result.stderr).toMatch(/SyntaxError/);
  }, 15000);

  test("JavaScript: Infinite loop triggers timeout", async () => {
    if (!isDockerRunning) return;
    const code = 'while(true) {}';
    const result = await strategy.execute("javascript", code);
    expect(result.timedOut).toBe(true);
  }, 15000);
});
