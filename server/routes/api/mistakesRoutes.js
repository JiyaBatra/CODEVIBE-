// Routes for mistakes analytics API
const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const mistakesController = require("../../controller/mistakes/mistakesController");

// POST /api/mistakes/log
// Logs a client-side or frontend mistake for the authenticated user
router.post("/log", verifyToken, mistakesController.logMistake);

// GET /api/mistakes/:email
// Returns top recurring mistakes for the user
router.get("/:email", verifyToken, mistakesController.getMistakes);

// GET /api/mistakes/:email/:pattern
// Returns detailed info about a specific mistake pattern
router.get("/:email/:pattern", verifyToken, mistakesController.getMistakeDetails);

module.exports = router;
