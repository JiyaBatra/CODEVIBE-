const StudySession = require("../models/studySession");
const Progress = require("../models/progress");

const MAX_SESSIONS_PER_DAY = 8;
const XP_PER_SESSION = 10;

exports.completeSession = async (req, res) => {
  try {
    const { email, duration } = req.body;
    if (!email || !duration) {
      return res.status(400).json({ message: "Email and duration are required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await StudySession.countDocuments({
      email,
      type: "focus",
      completedAt: { $gte: today, $lt: tomorrow },
    });

    if (count >= MAX_SESSIONS_PER_DAY) {
      return res.status(429).json({ message: "Daily session limit reached (max 8)" });
    }

    await StudySession.create({ email, duration, type: "focus", xpAwarded: XP_PER_SESSION });

    await Progress.findOneAndUpdate(
      { email },
      { $inc: { xp: XP_PER_SESSION } },
      { upsert: true }
    );

    res.status(201).json({ xpAwarded: XP_PER_SESSION, sessionsToday: count + 1 });
  } catch (err) {
    console.error("Complete session error:", err);
    res.status(500).json({ message: "Failed to log study session" });
  }
};

exports.getTodaySessions = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await StudySession.countDocuments({
      email,
      type: "focus",
      completedAt: { $gte: today, $lt: tomorrow },
    });

    const totalDuration = await StudySession.aggregate([
      { $match: { email, type: "focus", completedAt: { $gte: today, $lt: tomorrow } } },
      { $group: { _id: null, total: { $sum: "$duration" } } },
    ]);

    res.json({
      count,
      totalSeconds: totalDuration[0]?.total || 0,
      maxDaily: MAX_SESSIONS_PER_DAY,
    });
  } catch (err) {
    console.error("Get sessions error:", err);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};
