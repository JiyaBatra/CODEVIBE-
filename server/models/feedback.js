// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },          // optional user name
  courseName: { type: String },    // for which course the feedback is
  lessonId: { type: String },      // optional: to associate feedback with a lesson
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
