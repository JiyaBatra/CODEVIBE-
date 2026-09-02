// routes/api/executeRoutes.js
const rateLimit = require('express-rate-limit');
const express = require("express");
const { executeCode } = require("../../controller/execute/executeController");
const verifyToken = require("../../middleware/authMiddleware");

// Limit each caller to 10 code executions per minute.
// Previously executeLimiter was defined before the router imports and applied
// in a second router.post registration after module.exports — making it
// unreachable dead code. This rewrite places all middleware on a single
// route registration and exports the router exactly once.
const executeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many code executions. Please wait a minute before trying again.'
  }
});

const router = express.Router();

// POST => /api/compiler/:language
// verifyToken first so only authenticated users consume the rate-limit window.
// executeLimiter second so the throttle is applied to every authenticated request.
router.post("/:language", verifyToken, executeLimiter, executeCode);

module.exports = router;
