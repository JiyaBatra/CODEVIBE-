/**
 * @module socket/socketServer
 * Creates and configures the Socket.io server, attaches JWT auth middleware,
 * manages user rooms, and handles sync requests.
 */

const { Server } = require("socket.io");
const { socketAuthMiddleware } = require("./socketAuth");
const { setupRedisAdapter } = require("./redisAdapter");
const { getUserRoom, emitSync } = require("./notificationEvents");
const { EVENTS, SOCKET_CONFIG } = require("./constants");
const Notification = require("../models/notification");

/** @type {Server|null} */
let io = null;

/**
 * Initializes Socket.io on the given HTTP server.
 *
 * @param {import("http").Server} httpServer  The Node HTTP server returned by express().listen().
 * @returns {Promise<Server>} The configured Socket.io server instance.
 */
const initSocketServer = async (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: SOCKET_CONFIG.CORS_ORIGINS,
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: SOCKET_CONFIG.PING_TIMEOUT,
    pingInterval: SOCKET_CONFIG.PING_INTERVAL,
    maxHttpBufferSize: SOCKET_CONFIG.MAX_HTTP_BUFFER_SIZE,
    // Prefer WebSocket, fall back to polling transparently
    transports: ["websocket", "polling"],
    allowUpgrades: true,
  });

  // Attempt Redis adapter (falls back gracefully)
  await setupRedisAdapter(io);

  // JWT authentication
  io.use(socketAuthMiddleware);

  // Connection handler
  io.on("connection", (socket) => {
    const email = socket.user?.email || socket.user?.Email;
    if (!email) {
      console.warn(`[Socket] Authenticated socket has no email – disconnecting (${socket.id})`);
      socket.disconnect(true);
      return;
    }

    const room = getUserRoom(email);
    socket.join(room);
    console.log(`[Socket] ${email} joined ${room} (id: ${socket.id})`);

    // Handle sync requests (offline recovery)
    socket.on(EVENTS.NOTIFICATION_SYNC_REQUEST, async (data) => {
      try {
        const since = data?.since ? new Date(data.since) : new Date(0);
        const missed = await Notification.find({
          email,
          createdAt: { $gt: since },
        })
          .sort({ createdAt: -1 })
          .limit(50)
          .lean();
        emitSync(socket, missed);
      } catch (err) {
        console.error("[Socket] Sync error:", err.message);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`[Socket] ${email} disconnected (${reason}, id: ${socket.id})`);
      // Room auto-cleaned by Socket.io on disconnect
    });
  });

  console.log("✅ Socket.io server initialized");
  return io;
};

/**
 * Returns the current Socket.io server instance.
 * @returns {Server|null}
 */
const getIO = () => io;

module.exports = { initSocketServer, getIO };
