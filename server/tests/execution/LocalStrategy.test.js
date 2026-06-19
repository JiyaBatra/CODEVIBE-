const LocalExecutionStrategy = require("../../services/compiler/strategies/LocalExecutionStrategy");

describe("LocalExecutionStrategy", () => {
  let strategy;

  beforeAll(() => {
    strategy = new LocalExecutionStrategy();
  });

  test("JavaScript: prints Hello World", async () => {
    const code = 'console.log("Hello World")';
    const result = await strategy.execute("javascript", code);
    expect(result.timedOut).toBe(false);
    expect(result.stdout.trim()).toBe("Hello World");
    expect(result.stderr).toBe("");
  });

  test("JavaScript: Syntax Error", async () => {
    const code = 'console.log("Hello World"';
    const result = await strategy.execute("javascript", code);
    expect(result.timedOut).toBe(false);
    expect(result.stderr).toMatch(/SyntaxError/);
  });

  test("JavaScript: Infinite loop triggers timeout", async () => {
    const code = 'while(true) {}';
    const result = await strategy.execute("javascript", code);
    expect(result.timedOut).toBe(true);
  }, 10000);
});
