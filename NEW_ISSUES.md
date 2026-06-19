# Advanced Project Issues

## Issue 1: Implement Secure Containerized Code Execution Engine

**Level:** Advanced (55 pts)

### Description
The current implementation of the code execution engine (`server/controller/execute/executeController.js`) uses standard child processes (`spawn`) running in a temporary directory. While it avoids shell interpolation, it is **not a full sandbox**. Arbitrary user code can still perform malicious actions, access the host file system, and utilize host network resources. 

To resolve this critical security vulnerability and technical debt, the execution engine must be refactored to use containerized execution (e.g., via Docker / `dockerode`). 

### Requirements
This contribution is non-trivial and touches core logic and architectural decisions. It requires:

1. **Implement a new feature with multiple interacting parts:** 
   - Integrate a third-party library (`dockerode` or similar) to spin up ephemeral, lightweight containers for each code execution request.
   - Implement proper volume mounting to safely pass user code to the container and retrieve the output.
   - Implement strict resource constraints (e.g., max memory, CPU limits) on the containers.
2. **Performance improvement with measurable benchmarks:** 
   - Establish benchmarks for container spin-up and teardown to ensure the new approach does not introduce unacceptable latency compared to the previous `spawn` method. Use pre-warmed containers or lightweight images (like Alpine) to achieve this.
3. **Refactor a module to use a better pattern:** 
   - Extract the execution strategy into an interface or factory pattern, allowing the system to easily swap between "local spawn" (for local dev) and "containerized" (for production).
4. **Add comprehensive test suite for a complex module:** 
   - Add exhaustive unit and integration tests covering language permutations (C, C++, Python, Java, Node), timeout edge cases (infinite loops), and proper cleanup of resources (orphaned containers/volumes).
5. **Integrate a third-party library with proper error handling and fallbacks:** 
   - Ensure the Docker daemon connection is robust. Handle cases where the daemon is unreachable, gracefully falling back or providing a clear error message to the user.

### PR Checklist for Review
To earn the `quality:exceptional` and full 55 pts, the resulting PR must satisfy the following:
- [ ] **Adds tests that weren't in the original issue:** e.g., testing concurrent code executions under heavy load.
- [ ] **Documents a non-obvious decision inline:** e.g., explaining why a specific base image or memory limit was chosen.
- [ ] **Handles an edge case the issue didn't mention:** e.g., preventing fork bombs inside the container by applying strict PID limits.
- [ ] **Reduces complexity or technical debt alongside the fix:** e.g., cleaning up the old temporary file generation logic that is no longer needed.
- [ ] **The reviewer learned something from this PR:** By introducing robust container security primitives and well-commented Docker integration code.

Note: `quality:exceptional` must be justified in a review comment. Applying it without a written reason will cause it to be ignored during scoring.
