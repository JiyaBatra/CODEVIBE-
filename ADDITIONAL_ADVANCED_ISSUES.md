# Advanced Project Issues (Continued)

## Issue 3: Implement Real-Time WebSocket Notification Architecture with Redis Pub/Sub

**Level:** Advanced (55 pts)

### Description
Currently, the notification system (`server/controller/notificationController.js`) relies entirely on REST API endpoints (e.g., `getNotifications`, `getUnreadCount`). This forces the client to implement inefficient HTTP polling to receive updates in real-time. As the application scales, this polling mechanism will severely degrade server performance and waste database resources.

To resolve this architectural bottleneck, the notification system must be refactored to use a real-time event-driven architecture using WebSockets (e.g., `Socket.io`) and a Redis Pub/Sub backplane to support horizontal scaling across multiple Node.js instances.

### Requirements
1. **Implement a new feature with multiple interacting parts:** 
   - Integrate `Socket.io` into the Express server.
   - Implement an authentication middleware for the socket connection using the existing JWT strategy.
   - Configure a Redis Pub/Sub adapter so that socket events can be broadcasted across a multi-server deployment.
2. **Performance improvement with measurable benchmarks:** 
   - Demonstrate the reduction in HTTP overhead by replacing client-side polling with WebSocket listeners.
3. **Refactor a module to use a better pattern:** 
   - Update `notificationController.js` and other relevant controllers to emit events (e.g., `NEW_NOTIFICATION`) to the respective user's socket room alongside saving the notification to MongoDB.
4. **Add comprehensive test suite for a complex module:** 
   - Write integration tests for the WebSocket server, ensuring that messages are only delivered to the authenticated user's specific room and handling unexpected disconnects.
5. **Integrate a third-party library with proper error handling and fallbacks:** 
   - Handle Socket connection failures gracefully on the client-side by falling back to HTTP long-polling if WebSockets are blocked by a firewall.

### PR Checklist for Review
- [ ] **Adds tests that weren't in the original issue:** e.g., load testing the Redis adapter with multiple concurrent connections.
- [ ] **Documents a non-obvious decision inline:** e.g., explaining the choice of room naming convention (e.g., `user_${userId}`).
- [ ] **Handles an edge case the issue didn't mention:** e.g., syncing notifications if a user has multiple tabs open simultaneously.
- [ ] **Reduces complexity or technical debt alongside the fix:** e.g., removing legacy polling logic from the frontend components.
- [ ] **The reviewer learned something from this PR:** By establishing a robust real-time communication pattern using Redis.

---

## Issue 4: Secure Authentication Refactor (HTTP-Only Cookies & Refresh Token Rotation)

**Level:** Advanced (55 pts)

### Description
The current authentication flow (`client/src/components/Signup.jsx` and corresponding server logic) sends the JWT token back in the JSON response body and stores it in the browser's `localStorage`. This architecture is highly vulnerable to Cross-Site Scripting (XSS) attacks, where malicious scripts could easily exfiltrate user tokens.

The entire authentication architecture must be overhauled to use strict, secure `HTTP-Only` cookies and implement Refresh Token Rotation to adhere to modern security standards.

### Requirements
1. **Implement a new feature with multiple interacting parts:** 
   - Refactor the backend to issue two tokens: a short-lived Access Token and a long-lived Refresh Token.
   - Send both tokens to the client via `Set-Cookie` headers with `HttpOnly`, `Secure`, and `SameSite=Strict` flags.
2. **Performance improvement with measurable benchmarks:** 
   - Not applicable for raw performance, but drastically improves the security posture and compliance profile.
3. **Refactor a module to use a better pattern:** 
   - Update the client-side `axios` interceptors to automatically catch `401 Unauthorized` responses and hit the `/api/auth/refresh` endpoint to rotate tokens transparently.
4. **Add comprehensive test suite for a complex module:** 
   - Write security-focused tests verifying that tokens cannot be accessed via `document.cookie` and that compromised refresh tokens are blacklisted immediately.
5. **Integrate a third-party library with proper error handling and fallbacks:** 
   - Use `cookie-parser` on the backend and implement CSRF protection logic if necessary.

### PR Checklist for Review
- [ ] **Adds tests that weren't in the original issue:** e.g., testing the automatic logout mechanism when a refresh token expires.
- [ ] **Documents a non-obvious decision inline:** e.g., why `SameSite=Strict` was chosen over `Lax` in the context of the application's CORS setup.
- [ ] **Handles an edge case the issue didn't mention:** e.g., detecting refresh token reuse (a sign of token theft) and invalidating the entire token family.
- [ ] **Reduces complexity or technical debt alongside the fix:** e.g., removing vulnerable `localStorage` access code across all frontend components.
- [ ] **The reviewer learned something from this PR:** By implementing an enterprise-grade OAuth 2.0 / JWT token rotation flow.

---

## Issue 5: Optimize Analytics & Leaderboard via MongoDB Aggregation Pipelines

**Level:** Advanced (55 pts)

### Description
Currently, features that require complex data like course progress, exam results (`examController.js`), or leaderboards are likely processing data locally in Node.js or performing multiple sequential `.find()` queries. As the dataset grows, this approach will block the Node.js event loop and lead to high memory consumption and latency.

To ensure database scalability, complex data retrieval must be refactored to utilize optimized MongoDB Aggregation Pipelines.

### Requirements
1. **Implement a new feature with multiple interacting parts:** 
   - Create complex aggregation pipelines using `$lookup`, `$group`, and `$project` to calculate leaderboards, exam averages, and course progress in a single database query.
2. **Performance improvement with measurable benchmarks:** 
   - Measure query execution time and memory usage before and after the refactor using mock databases of 100,000+ records.
3. **Refactor a module to use a better pattern:** 
   - Migrate local array mapping/filtering logic in the backend controllers directly into the MongoDB layer.
4. **Add comprehensive test suite for a complex module:** 
   - Write tests to ensure the aggregation pipelines handle edge cases, such as users with zero progress or deleted courses, without returning `null` reference errors.
5. **Integrate a third-party library with proper error handling and fallbacks:** 
   - Implement caching for heavy aggregations (like the global leaderboard) using Redis to prevent database strain on high-traffic pages.

### PR Checklist for Review
- [ ] **Adds tests that weren't in the original issue:** e.g., performance tests using `mongoose` query explain plans.
- [ ] **Documents a non-obvious decision inline:** e.g., explaining the use of specific compound indexes to support the `$match` stages of the pipeline.
- [ ] **Handles an edge case the issue didn't mention:** e.g., handling ties in the leaderboard ranking correctly.
- [ ] **Reduces complexity or technical debt alongside the fix:** e.g., deleting redundant schemas or localized sorting functions.
- [ ] **The reviewer learned something from this PR:** By mastering complex MongoDB aggregation stages and index optimization.

---

## Issue 6: Client-Side Data Caching and Race-Condition Prevention using React Query

**Level:** Advanced (55 pts)

### Description
The React frontend frequently makes asynchronous `axios` requests inside `useEffect` hooks across various components. This manual data-fetching pattern is prone to race conditions, lacks automatic retries, and causes unnecessary network waterfalls because responses are not cached centrally.

The entire frontend data-fetching layer must be refactored to use a robust, async state management library like `TanStack Query` (React Query) to abstract away the complexity of loading states, caching, and background synchronization.

### Requirements
1. **Implement a new feature with multiple interacting parts:** 
   - Integrate `TanStack Query` across the application.
   - Configure a global `QueryClient` with sensible default `staleTime` and `cacheTime` configurations.
2. **Performance improvement with measurable benchmarks:** 
   - Prove the reduction in redundant API calls when navigating between views (e.g., from Dashboard to Course and back) utilizing cached data.
3. **Refactor a module to use a better pattern:** 
   - Extract raw `axios` calls from components into dedicated, reusable custom hooks (e.g., `useExamResults`, `useNotifications`).
4. **Add comprehensive test suite for a complex module:** 
   - Write component tests using React Testing Library to verify that loading skeletons, error boundaries, and successful data states render correctly based on the Query state.
5. **Integrate a third-party library with proper error handling and fallbacks:** 
   - Implement global API error handling inside the `QueryClient` to automatically trigger toast notifications on network failures, falling back to cached data when offline.

### PR Checklist for Review
- [ ] **Adds tests that weren't in the original issue:** e.g., testing the optimistic UI updates during mutations (like marking a notification as read).
- [ ] **Documents a non-obvious decision inline:** e.g., justifying the specific invalidation strategy used for mutation queries.
- [ ] **Handles an edge case the issue didn't mention:** e.g., preventing duplicate background fetches when the window regains focus.
- [ ] **Reduces complexity or technical debt alongside the fix:** e.g., deleting hundreds of lines of boilerplate `useState` and `useEffect` hooks used for manual data fetching.
- [ ] **The reviewer learned something from this PR:** By understanding the difference between client state and server state in modern React applications.
