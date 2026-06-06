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
  Email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  college: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: { type: String },       // for password reset token
  resetTokenExpiry: { type: Date },   // for password reset token expiry
});

userSchema.pre("validate", function syncEmailAlias(next) {
  if (!this.email && this.Email) {
    this.email = this.Email;
  }

  if (this.email && !this.Email) {
    this.Email = this.email;
  }

  next();
});

module.exports = model("User", userSchema, "users");
