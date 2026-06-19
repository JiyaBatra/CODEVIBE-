const express = require("express");
const router = express.Router();

const feedbackController = require("../../controller/feedback/feedbackcontroller");
const verifyToken = require("../../middleware/authMiddleware");

// ✅ Route to submit feedback
router.post("/", feedbackController.submitFeedback);

// ✅ Route to reply to feedback (admin/moderator)
router.patch("/:id/reply", verifyToken, feedbackController.replyToFeedback);

module.exports = router;
