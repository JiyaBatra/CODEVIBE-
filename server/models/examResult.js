// models/ExamResult.js
const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    courseId: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    attemptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index so we can efficiently query results per user + course
examResultSchema.index({ email: 1, courseId: 1, attemptedAt: -1 });

module.exports =
  mongoose.models.ExamResult ||
  mongoose.model('ExamResult', examResultSchema);
