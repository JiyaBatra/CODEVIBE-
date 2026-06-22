const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
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
  skills: {
    type: [String],
    default: [],
  },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

module.exports = model("User", userSchema, "users");
