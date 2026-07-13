const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  family: {
    type: String,
    required: true,
    index: true,
  },
  isRevoked: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

// Optional: Automatically remove expired tokens from the DB
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
