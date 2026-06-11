const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  type: {
    type: String,
    enum: ['lesson_complete', 'exam_result', 'certificate_earned', 'streak_milestone', 'feedback_reply'],
    required: true,
  },
  message: { type: String, required: true },
  relatedEntity: { type: String, default: '' },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
