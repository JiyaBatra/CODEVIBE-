// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  courseName: { type: String },
  lessonId: { type: String },
  message: { type: String, required: true },
  reply: { type: String, default: '' },
  repliedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
