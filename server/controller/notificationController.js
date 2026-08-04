const Notification = require("../models/notification");
const User = require("../models/user.models");
const { getIO, emitNewNotification, emitNotificationRead, emitBulkRead } = require("../socket");

const emitNotification = (email, notif) => {
  const io = getIO();
  if (io) emitNewNotification(io, email, notif);
};

exports.getNotifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [notifs, total] = await Promise.all([
      Notification.find({ email: req.user.email })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments({ email: req.user.email }),
    ]);

    res.status(200).json({
      notifications: notifs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
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

    const user = await User.findOne({ email }).select("notificationPreferences");
    if (user?.notificationPreferences?.mutedTypes?.includes(type)) {
      return res.status(200).json({ message: "Notification type muted, not created" });
    }

    const notif = await Notification.create({ email, type, message, relatedEntity });
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

exports.getPreferences = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select("notificationPreferences");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      mutedTypes: user.notificationPreferences?.mutedTypes || [],
    });
  } catch (err) {
    console.error("Error fetching notification preferences:", err);
    res.status(500).json({ message: "Failed to fetch preferences" });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { mutedTypes } = req.body;
    if (!Array.isArray(mutedTypes)) {
      return res.status(400).json({ message: "mutedTypes must be an array" });
    }

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { "notificationPreferences.mutedTypes": mutedTypes },
      { new: true }
    ).select("notificationPreferences");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      mutedTypes: user.notificationPreferences?.mutedTypes || [],
    });
  } catch (err) {
    console.error("Error updating notification preferences:", err);
    res.status(500).json({ message: "Failed to update preferences" });
  }
};

exports.emitNotification = emitNotification;