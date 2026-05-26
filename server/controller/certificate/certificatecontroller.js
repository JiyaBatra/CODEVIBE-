// controller/certificate/certificatecontroller.js
const Progress = require('../../models/progress');

// Maps display course name → lesson-ID prefix
const getCoursePrefix = (courseName) => {
  const key = (courseName || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/\./g, "");

  const map = {
    javascript: "js-",
    reactjs: "react-",
    nodejs: "node-",
    oop: "oop-",
    mongodb: "mongo-",
    expressjs: "express-",
    dbms: "dbms-",
    dsa: "dsa-",
    html: "html-",
    css: "css-",
  };

  return map[key] || `${key}-`;
};

const calculateFeedback = (score) => {
  if (score >= 90) return "Outstanding performance! Keep it up!";
  if (score >= 75) return "Great job! You have a solid understanding.";
  if (score >= 50) return "Good effort! Keep practicing to improve.";
  return "Needs improvement. Let's work together on tougher areas.";
};

exports.getCertificateInfo = async (req, res) => {
  try {
    const email = req.user?.email;
    const { courseName } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    if (!courseName) {
      return res.status(400).json({ message: "courseName required" });
    }

    const progress = await Progress.findOne({ email });
    if (!progress) return res.status(404).json({ message: "User not found" });

    const prefix = getCoursePrefix(courseName);

    // Use prefix-based lookup so "JavaScript" → scores["js-lesson-1"] etc.
    const scoresObj = progress.scores instanceof Map
      ? Object.fromEntries(progress.scores)
      : (progress.scores?.toObject ? progress.scores.toObject() : progress.scores || {});

  const courseScores = Object.entries(scoresObj)
    .filter(([lessonId]) => lessonId.toLowerCase().startsWith(prefix))
    .map(([, val]) => val);

    const score = courseScores.length
      ? Math.round(courseScores.reduce((a, b) => a + b, 0) / courseScores.length)
      : 0;

    // Count only lessons that belong to this course
    const completedLessons = (progress.completedLessons || []).filter((id) =>
      id.toLowerCase().startsWith(prefix)
    ).length;

    const feedbackMessage = calculateFeedback(score);

    res.json({
      studentName: progress.username || "Student",
      courseName,
      score,
      completedLessons,
      feedbackMessage,
      certificateImageUrl: "url or base64 of generated cert image"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
