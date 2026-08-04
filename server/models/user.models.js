const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  college: {
    type: String,
    trim: true,
  },
  year: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  resetToken: { type: String },       // for password reset token
  resetTokenExpiry: { type: Date },   // for password reset token expiry
  notificationPreferences: {
    mutedTypes: {
      type: [String],
      enum: ['lesson_complete', 'exam_result', 'certificate_earned', 'streak_milestone', 'feedback_reply'],
      default: [],
    },
  },
});

module.exports = model("User", userSchema, "users");