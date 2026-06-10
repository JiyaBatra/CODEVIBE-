const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  duration: { type: Number, required: true },
  type: { type: String, enum: ["focus", "break"], default: "focus" },
  xpAwarded: { type: Number, default: 10 },
  completedAt: { type: Date, default: Date.now },
});

studySessionSchema.index({ email: 1, completedAt: -1 });

module.exports = mongoose.model("StudySession", studySessionSchema);
