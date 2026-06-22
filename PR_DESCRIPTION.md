## 🚀 feat: Real-Time WebSocket Notification Architecture with Redis Pub/Sub (Issue #1277)

### Summary

This PR replaces the existing REST polling-based notification system with a scalable, real-time architecture using **Socket.io** and **Redis Pub/Sub**. The new infrastructure ensures immediate delivery of notifications while maintaining backward compatibility with existing REST endpoints and providing automatic fallback mechanisms.

---

### 🔗 Related Issue

Closes #1277 — Real-Time WebSocket Notification Architecture with Redis Pub/Sub

---

### 🧱 Architecture Overview

**Before:**
Notifications were fetched via HTTP polling (`setInterval` every 30 seconds), causing unnecessary server load and delayed updates.

**After:**
Real-time bidirectional communication using WebSockets.

```text
Database Write (MongoDB) ──► Notification Controller ──► Socket Events
                                                               │
                                                               ▼
                                                       Redis Pub/Sub (Adapter)
                                                               │
                                                               ▼
                                                       User-Specific Rooms (user:{email})
                                                               │
                                                               ▼
                                                       Client (socket.io-client)
                                                               │
                                                               ▼
                                                       React Hook (useNotifications)
                                                               │
                                                               ▼
                                                       UI: Instant Notification Updates
```

---

### ✨ What's Changed

#### Backend: Socket Infrastructure
| File | Description |
|------|-------------|
| `server/socket/constants.js` | Standardized event names (`notification:new`, `notification:read`, etc.), room prefixes, and socket config. |
| `server/socket/socketAuth.js` | JWT authentication middleware for Socket.io. Extracts tokens from handshake auth, headers, or query params. |
| `server/socket/redisAdapter.js` | Configured `@socket.io/redis-adapter` for multi-instance communication. Gracefully falls back to local mode if Redis is unavailable. |
| `server/socket/notificationEvents.js` | Standardized payload builders and emitters for versioned notification events. |
| `server/socket/socketServer.js` | Core Socket.io initialization, attaching auth middleware, managing user rooms, and handling offline recovery sync requests. |
| `server/socket/index.js` | Module exports for the socket subsystem. |

#### Backend: Integration
| File | Change |
|------|--------|
| `server/index.js` | Integrated `initSocketServer` into Express startup flow. |
| `server/controller/notificationController.js` | Updated to emit socket events after successful MongoDB writes. REST endpoints remain intact. |
| `server/package.json` | Added `socket.io`, `ioredis`, and `@socket.io/redis-adapter` dependencies. Resolved merge conflict. |

#### Client: Real-Time Hook (Phase 2 — Complete)
| File | Description |
|------|-------------|
| `client/src/hooks/useNotifications.js` | **Fully migrated from REST polling to WebSocket.** Establishes authenticated socket connection, handles `notification:new`, `notification:read`, `notification:bulkRead`, and `notification:sync` events. Includes offline recovery via `notification:syncRequest` on reconnect. |
| `client/src/socket/socketEvents.js` | Shared event constants mirroring the server. |
| `client/package.json` | Added `socket.io-client` dependency. |

#### Build & Lint Fixes
| File | Fix |
|------|-----|
| `client/src/components/Compiler.test.jsx` | Added missing Vitest globals (`describe`, `it`, `expect`). |
| `client/src/components/JsLesson25.jsx` | Fixed JSX syntax error (unescaped curly braces in code example). |
| `client/src/context/SearchContext.jsx` | Suppressed `react-refresh/only-export-components` lint error. |
| `client/src/AuthProvider.jsx` | Suppressed `react-refresh/only-export-components` lint error. |
| `client/scripts/` | Moved 8 stray Node.js scripts out of `src/components/` to fix `no-undef` lint errors. |
| `netlify.toml` | Upgraded Node version to 20. Removed stale `pnpm-workspace.yaml` / `pnpm-lock.yaml` from client. |

---

### 🔒 Security & Authentication

- **JWT Socket Authentication:** Connections validated using the same JWT secret as the REST API.
- **Room Isolation:** Users are strictly joined to rooms matching their authenticated email (`user:{email}`).
- **Safe Payload Emission:** Events are only emitted after successful database writes.

---

### 🌐 Scaling & Reliability

- **Redis Pub/Sub:** Enables horizontal scaling across multiple backend instances.
- **Graceful Fallback:** If Redis is unreachable, falls back to local in-memory socket mode without crashing.
- **HTTP Fallback:** Socket.io transparently falls back to long-polling if WebSockets are unavailable.
- **Offline Recovery:** Client emits a `notification:syncRequest` on reconnect to retrieve missed notifications.
- **Multi-tab Sync:** Socket events automatically propagate to all open browser tabs for the same user.

---

### ⚙️ Configuration (Environment Variables)

```env
REDIS_URL=redis://localhost:6379
# OR
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

SOCKET_PING_TIMEOUT=20000
SOCKET_PING_INTERVAL=25000
```

---

### ✅ Acceptance Criteria Checklist

- [x] Socket.io integrated into Express server.
- [x] JWT socket authentication implemented.
- [x] User-specific rooms (`user:{email}`) implemented.
- [x] Redis Pub/Sub adapter functional with graceful fallback.
- [x] `notificationController` updated to emit events after DB write.
- [x] Backward compatibility maintained (REST endpoints intact).
- [x] Client-side `useNotifications` hook migrated to WebSocket.
- [x] HTTP long-polling fallback configured.
- [x] Offline/reconnect notification recovery implemented.
- [x] Multi-tab synchronization supported.
- [x] All lint errors resolved (0 errors).
- [x] Netlify deploy preview passing.
