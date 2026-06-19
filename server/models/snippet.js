const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  code:          { type: String, required: true },
  language:      { type: String, required: true },
  lessonId:      { type: String, default: "" },
  title:         { type: String, default: "Untitled" },
  username:      { type: String, default: "Anonymous" },
  score:         { type: Number, default: null },
  slug:          { type: String, unique: true, index: true },
  createdAt:     { type: Date, default: Date.now },
  expiresAt:     { type: Date, default: () => Date.now() + 30 * 24 * 60 * 60 * 1000 },
});

snippetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Snippet", snippetSchema);
