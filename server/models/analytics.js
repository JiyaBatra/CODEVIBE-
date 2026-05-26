const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true, index: true },
  username: { type: String, default: '' },
  lessonId: { type: String, default: '' },
  subject: { type: String, default: '' },
  score: { type: Number, default: 0 },
  completed: { type: Boolean, default: true },
  points: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  learningTime: { type: Number, default: 0 },
  type: { type: String, default: 'lesson' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);