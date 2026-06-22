/**
 * @module socket
 * Public API for the socket subsystem.
 * Re-exports everything other modules need to interact with the socket layer.
 */

const { initSocketServer, getIO } = require("./socketServer");
const {
  emitNewNotification,
  emitNotificationRead,
  emitBulkRead,
  emitNotificationDeleted,
} = require("./notificationEvents");
const { EVENTS, ROOM_PREFIX, PAYLOAD_VERSION } = require("./constants");

module.exports = {
  // Lifecycle
  initSocketServer,
  getIO,
  // Emitters
  emitNewNotification,
  emitNotificationRead,
  emitBulkRead,
  emitNotificationDeleted,
  // Constants
  EVENTS,
  ROOM_PREFIX,
  PAYLOAD_VERSION,
};
