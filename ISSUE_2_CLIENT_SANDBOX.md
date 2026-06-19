# Advanced Project Issues

## Issue 2: Implement Web Worker Sandbox for Client-Side Execution

**Level:** Advanced (55 pts)

### Description
The current implementation of the client-side code execution engine in `client/src/components/Compiler.jsx` uses a hidden `iframe` to execute JavaScript and React code. It attempts to handle timeouts using a standard `setTimeout` that throws an error:

```javascript
const killer = setTimeout(() => { throw new Error("Timeout"); }, 1500);
```

This approach is **fundamentally flawed**. A synchronous infinite loop (e.g., `while(true) {}`) executed within the iframe will block the browser's main thread entirely. The `setTimeout` callback will never be placed on the call stack, resulting in the user's browser tab freezing and crashing completely. 

To resolve this critical reliability and performance bottleneck, the client-side execution logic for JavaScript and React must be refactored to use a **Web Worker** architecture. 

### Requirements
This contribution touches core architectural decisions in the frontend and requires careful handling of asynchronous data flow:

1. **Implement a new feature with multiple interacting parts:** 
   - Create a dedicated Web Worker script (`executor.worker.js`) to handle code compilation and execution safely off the main thread.
   - Implement a secure `postMessage` communication bridge between `Compiler.jsx` and the Web Worker to transmit code and receive execution results (stdout, stderr, runtime errors).
2. **Performance improvement with measurable benchmarks:** 
   - The UI must remain completely responsive while user code is running. Prove that an injected `while(true) {}` loop does not degrade main thread performance (e.g., FPS metrics).
3. **Refactor a module to use a better pattern:** 
   - Extract the `runJSFamily` and `runReact` methods from `Compiler.jsx` into a reusable, asynchronous hook (`useCodeExecutor`) that manages the Web Worker lifecycle (spawning, messaging, and cleanup).
   - Use `worker.terminate()` to forcefully kill the thread if execution exceeds the defined timeout limit, ensuring absolute reliability.
4. **Add comprehensive test suite for a complex module:** 
   - Write integration tests simulating the Web Worker environment. Test specific edge cases such as infinite loops, recursive stack overflows, and correct state updates when the worker is terminated.
5. **Integrate a third-party library with proper error handling and fallbacks:** 
   - For React code execution inside the worker, cleanly integrate standalone Babel to transpile JSX on the fly, handling syntax errors gracefully before execution.

### PR Checklist for Review
To earn the `quality:exceptional` and full 55 pts, the resulting PR must satisfy the following:
- [ ] **Adds tests that weren't in the original issue:** e.g., verifying memory leaks do not occur by repeatedly spawning and terminating workers.
- [ ] **Documents a non-obvious decision inline:** e.g., documenting how `console.log` overrides inside the Web Worker are serialized and posted back to the main thread.
- [ ] **Handles an edge case the issue didn't mention:** e.g., handling asynchronous user code (Promises/async/await) within the Web Worker sandbox.
- [ ] **Reduces complexity or technical debt alongside the fix:** e.g., removing the brittle iframe injection strings currently clogging up `Compiler.jsx`.
- [ ] **The reviewer learned something from this PR:** By establishing a robust, modern multithreading pattern for the React client.

Note: `quality:exceptional` must be justified in a review comment. Applying it without a written reason will cause it to be ignored during scoring.
