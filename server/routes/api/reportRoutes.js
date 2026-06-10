const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const { generateWeeklyReport } = require("../../services/weeklyReport");

router.get("/weekly", verifyToken, async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const report = await generateWeeklyReport(email);
    if (!report) {
      return res.status(200).json({ message: "Not enough data for a report yet", stats: null });
    }
    res.json(report);
  } catch (err) {
    console.error("Weekly report error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
