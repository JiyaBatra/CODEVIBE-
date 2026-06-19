const LocalExecutionStrategy = require("./strategies/LocalExecutionStrategy");
const DockerExecutionStrategy = require("./strategies/DockerExecutionStrategy");
const { TimeoutError, ExecutionError } = require("../utils/errors");

class CompilerService {
  constructor() {
    this.mode = (process.env.EXECUTION_MODE || "local").toLowerCase();
    
    if (this.mode === "docker") {
      this.strategy = new DockerExecutionStrategy();
    } else {
      this.strategy = new LocalExecutionStrategy();
    }
    
    console.log(`CompilerService initialized with strategy: ${this.mode}`);
  }

  /**
   * Executes code using the active strategy
   */
  async execute(language, sourceCode, input = "") {
    try {
      const result = await this.strategy.execute(language, sourceCode, input);
      
      if (result.timedOut) {
        throw new TimeoutError("Execution timed out", result.stdout, result.stderr, result.executionTime);
      }
      
      if (result.stderr && !result.stdout && result.code !== 0) {
        throw new ExecutionError("Execution failed", result.stdout, result.stderr, result.executionTime);
      }
      
      return result;
    } catch (e) {
      if (e instanceof ExecutionError) {
        throw e;
      }
      // Wrap unexpected errors
      throw new ExecutionError(e.message || "Unknown error", "", String(e), 0);
    }
  }
}

module.exports = new CompilerService();
