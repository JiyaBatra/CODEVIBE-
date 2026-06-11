const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  lessonId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

bookmarkSchema.index({ email: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema);
