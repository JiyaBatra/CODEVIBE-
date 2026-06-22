/**
 * @module socket/socketEvents
 * Shared event constants mirroring the server's socket/constants.js.
 */

export const EVENTS = {
  NOTIFICATION_NEW: "notification:new",
  NOTIFICATION_READ: "notification:read",
  NOTIFICATION_DELETED: "notification:deleted",
  NOTIFICATION_BULK_READ: "notification:bulkRead",
  NOTIFICATION_SYNC: "notification:sync",
  NOTIFICATION_SYNC_REQUEST: "notification:syncRequest",
};
