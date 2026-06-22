const Notification = require("../models/notification");
const { getIO, emitNewNotification, emitNotificationRead, emitBulkRead } = require("../socket");

/**
 * Helper: emits a notification event to a user's socket room.
 * Safe to call even when Socket.io is not initialised (returns silently).
 * @param {string} email   Recipient email.
 * @param {object} notif   Notification document (mongoose lean or toObject).
 */
const emitNotification = (email, notif) => {
  const io = getIO();
  if (io) emitNewNotification(io, email, notif);
};

exports.getNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ email: req.user.email })
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json(notifs);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await Notification.findOneAndUpdate(
      { _id: id, email: req.user.email },
      { read: true },
      { new: true }
    );
    if (!notif) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Emit read event to all of the user's connected tabs/devices
    const io = getIO();
    if (io) emitNotificationRead(io, req.user.email, id);

    res.status(200).json(notif);
  } catch (err) {
    console.error("Error marking notification as read:", err);
    res.status(500).json({ message: "Failed to mark as read" });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { email: req.user.email, read: false },
      { read: true }
    );

    // Emit bulk-read event
    const io = getIO();
    if (io) emitBulkRead(io, req.user.email);

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error("Error marking all as read:", err);
    res.status(500).json({ message: "Failed to mark all as read" });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { email, type, message, relatedEntity } = req.body;
    if (!email || !type || !message) {
      return res.status(400).json({ message: "email, type, and message are required" });
    }
    const notif = await Notification.create({ email, type, message, relatedEntity });

    // Emit to socket AFTER successful DB write
    emitNotification(email, notif.toObject ? notif.toObject() : notif);

    res.status(201).json(notif);
  } catch (err) {
    console.error("Error creating notification:", err);
    res.status(500).json({ message: "Failed to create notification" });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ email: req.user.email, read: false });
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching unread count:", err);
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
};

// Re-export helper for programmatic use elsewhere in the server
exports.emitNotification = emitNotification;
