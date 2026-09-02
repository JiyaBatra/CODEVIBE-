const express = require("express");
const router = express.Router();

const feedbackController = require("../../controller/feedback/feedbackcontroller");

// ✅ Route to submit feedback
router.post("/", feedbackController.submitFeedback);

module.exports = router;
