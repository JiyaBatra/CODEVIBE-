/**
 * @typedef {Object} ExecutionResult
 * @property {string} stdout
 * @property {string} stderr
 * @property {number} executionTime
 * @property {boolean} timedOut
 */

class ExecutionStrategy {
  /**
   * @param {string} language
   * @param {string} sourceCode
   * @param {string} [input]
   * @returns {Promise<ExecutionResult>}
   */
  async execute(_language, _sourceCode, _input) {
    throw new Error("Method 'execute()' must be implemented.");
  }
}

module.exports = ExecutionStrategy;
