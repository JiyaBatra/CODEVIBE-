/**
 * @module socket/socketAuth
 * JWT authentication middleware for Socket.io connections.
 */

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

/**
 * Extracts the JWT token from various sources on the socket handshake.
 * Checks: auth.token → Authorization header → query.token
 * @param {import("socket.io").Socket} socket
 * @returns {string|null}
 */
const extractToken = (socket) => {
  // 1. auth.token (recommended – set by client via io({ auth: { token } }))
  if (socket.handshake.auth?.token) {
    return socket.handshake.auth.token;
  }

  // 2. Authorization header (Bearer <token>)
  const authHeader =
    socket.handshake.headers?.authorization ||
    socket.handshake.headers?.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  // 3. Query parameter fallback
  if (socket.handshake.query?.token) {
    return socket.handshake.query.token;
  }

  return null;
};

/**
 * Socket.io middleware that authenticates incoming connections via JWT.
 * On success, attaches the decoded payload to `socket.user`.
 * On failure, calls `next()` with an Error to reject the connection.
 * @param {import("socket.io").Socket} socket
 * @param {Function} next
 */
const socketAuthMiddleware = (socket, next) => {
  try {
    const token = extractToken(socket);

    if (!token) {
      console.warn(`[Socket Auth] Connection rejected – no token provided (id: ${socket.id})`);
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    const reason =
      err.name === "TokenExpiredError"
        ? "Token expired"
        : err.name === "JsonWebTokenError"
          ? "Invalid token"
          : "Authentication failed";
    console.warn(`[Socket Auth] Connection rejected – ${reason} (id: ${socket.id})`);
    next(new Error(`Authentication error: ${reason}`));
  }
};

module.exports = { socketAuthMiddleware, extractToken };
