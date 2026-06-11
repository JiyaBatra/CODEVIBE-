// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  completedLessons: { type: [String], default: [] },
  scores: { type: Map, of: Number, default: {} },
  
  // Gamification fields
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: { type: [String], default: [] },
  
  // Streak fields
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: null },
  dailyGoal: { type: Number, default: 1 },

  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
