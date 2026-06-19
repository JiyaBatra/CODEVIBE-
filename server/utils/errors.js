class ExecutionError extends Error {
  constructor(message, stdout = "", stderr = "", executionTime = 0, errorLine = null, hint = null) {
    super(message);
    this.name = "ExecutionError";
    this.stdout = stdout;
    this.stderr = stderr;
    this.executionTime = executionTime;
    this.errorLine = errorLine;
    this.hint = hint;
  }
}

class CompilationError extends ExecutionError {
  constructor(message, stdout = "", stderr = "", executionTime = 0, errorLine = null, hint = null) {
    super(message, stdout, stderr, executionTime, errorLine, hint);
    this.name = "CompilationError";
  }
}

class RuntimeError extends ExecutionError {
  constructor(message, stdout = "", stderr = "", executionTime = 0, errorLine = null, hint = null) {
    super(message, stdout, stderr, executionTime, errorLine, hint);
    this.name = "RuntimeError";
  }
}

class TimeoutError extends ExecutionError {
  constructor(message, stdout = "", stderr = "", executionTime = 0) {
    super(message, stdout, stderr, executionTime);
    this.name = "TimeoutError";
  }
}

class ResourceLimitError extends ExecutionError {
  constructor(message, stdout = "", stderr = "", executionTime = 0) {
    super(message, stdout, stderr, executionTime);
    this.name = "ResourceLimitError";
  }
}

class ContainerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ContainerError";
  }
}

module.exports = {
  ExecutionError,
  CompilationError,
  RuntimeError,
  TimeoutError,
  ResourceLimitError,
  ContainerError
};
