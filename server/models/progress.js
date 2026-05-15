// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  completedLessons: { type: [String], default: [] },
  scores: { type: Map, of: Number, default: {} },
});

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
