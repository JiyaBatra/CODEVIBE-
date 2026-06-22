/**
 * @module socket/notificationEvents
 * Helpers for building versioned notification payloads and emitting them
 * to user-specific rooms.
 */

const { EVENTS, ROOM_PREFIX, PAYLOAD_VERSION } = require("./constants");

/**
 * Builds a standardized notification event payload.
 * @param {string} event  One of the EVENTS constants.
 * @param {object} data   Event-specific data (notification document, id, etc.).
 * @returns {{ event: string, version: number, timestamp: number, data: object }}
 */
const buildPayload = (event, data) => ({
  event,
  version: PAYLOAD_VERSION,
  timestamp: Date.now(),
  data,
});

/**
 * Returns the room name for a given user email.
 * @param {string} email
 * @returns {string}
 */
const getUserRoom = (email) => `${ROOM_PREFIX}${email}`;

/**
 * Emits a notification:new event to a specific user's room.
 * @param {import("socket.io").Server} io
 * @param {string} email        The recipient's email.
 * @param {object} notification The MongoDB notification document (plain object).
 */
const emitNewNotification = (io, email, notification) => {
  if (!io) return;
  const room = getUserRoom(email);
  const payload = buildPayload(EVENTS.NOTIFICATION_NEW, {
    id: notification._id,
    type: notification.type,
    message: notification.message,
    relatedEntity: notification.relatedEntity,
    read: notification.read,
    createdAt: notification.createdAt,
  });
  io.to(room).emit(EVENTS.NOTIFICATION_NEW, payload);
};

/**
 * Emits a notification:read event.
 * @param {import("socket.io").Server} io
 * @param {string} email
 * @param {string} notificationId
 */
const emitNotificationRead = (io, email, notificationId) => {
  if (!io) return;
  const room = getUserRoom(email);
  const payload = buildPayload(EVENTS.NOTIFICATION_READ, { id: notificationId });
  io.to(room).emit(EVENTS.NOTIFICATION_READ, payload);
};

/**
 * Emits a notification:bulkRead event (mark-all-as-read).
 * @param {import("socket.io").Server} io
 * @param {string} email
 */
const emitBulkRead = (io, email) => {
  if (!io) return;
  const room = getUserRoom(email);
  const payload = buildPayload(EVENTS.NOTIFICATION_BULK_READ, {});
  io.to(room).emit(EVENTS.NOTIFICATION_BULK_READ, payload);
};

/**
 * Emits a notification:deleted event.
 * @param {import("socket.io").Server} io
 * @param {string} email
 * @param {string} notificationId
 */
const emitNotificationDeleted = (io, email, notificationId) => {
  if (!io) return;
  const room = getUserRoom(email);
  const payload = buildPayload(EVENTS.NOTIFICATION_DELETED, { id: notificationId });
  io.to(room).emit(EVENTS.NOTIFICATION_DELETED, payload);
};

/**
 * Emits a sync payload containing all notifications since a timestamp.
 * @param {import("socket.io").Socket} socket  The requesting socket.
 * @param {object[]} notifications             Array of notification docs.
 */
const emitSync = (socket, notifications) => {
  const payload = buildPayload(EVENTS.NOTIFICATION_SYNC, { notifications });
  socket.emit(EVENTS.NOTIFICATION_SYNC, payload);
};

module.exports = {
  buildPayload,
  getUserRoom,
  emitNewNotification,
  emitNotificationRead,
  emitBulkRead,
  emitNotificationDeleted,
  emitSync,
};
