const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const notificationController = require("../../controller/notificationController");

router.get("/", verifyToken, notificationController.getNotifications);
router.get("/unread-count", verifyToken, notificationController.getUnreadCount);
router.patch("/:id/read", verifyToken, notificationController.markAsRead);
router.patch("/read-all", verifyToken, notificationController.markAllAsRead);
router.post("/", verifyToken, notificationController.createNotification);

module.exports = router;
