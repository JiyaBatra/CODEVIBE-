/**
 * @module socket/constants
 * Socket.io event names and configuration constants.
 */

/** Socket event names for notifications */
const EVENTS = {
  /** Emitted when a new notification is created */
  NOTIFICATION_NEW: "notification:new",
  /** Emitted when a notification is marked as read */
  NOTIFICATION_READ: "notification:read",
  /** Emitted when a notification is deleted */
  NOTIFICATION_DELETED: "notification:deleted",
  /** Emitted when all notifications are marked as read */
  NOTIFICATION_BULK_READ: "notification:bulkRead",
  /** Emitted to sync missed notifications after reconnect */
  NOTIFICATION_SYNC: "notification:sync",
  /** Client requests missed notifications since a timestamp */
  NOTIFICATION_SYNC_REQUEST: "notification:syncRequest",
};

/** Room prefix for user-specific channels */
const ROOM_PREFIX = "user:";

/** Current event payload version */
const PAYLOAD_VERSION = 1;

/** Default socket configuration */
const SOCKET_CONFIG = {
  /** Ping timeout in ms */
  PING_TIMEOUT: parseInt(process.env.SOCKET_PING_TIMEOUT, 10) || 20000,
  /** Ping interval in ms */
  PING_INTERVAL: parseInt(process.env.SOCKET_PING_INTERVAL, 10) || 25000,
  /** Max HTTP buffer size */
  MAX_HTTP_BUFFER_SIZE: 1e6,
  /** Allowed CORS origins (read from env or defaults) */
  CORS_ORIGINS: (
    process.env.ALLOWED_ORIGINS ||
    "http://localhost:5173,http://localhost:5174,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:5174,https://codevibeforyou.netlify.app"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};

module.exports = { EVENTS, ROOM_PREFIX, PAYLOAD_VERSION, SOCKET_CONFIG };
