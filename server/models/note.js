const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  lessonId: { type: String, required: true, index: true },
  content: { type: String, default: '' },
}, { timestamps: true });

noteSchema.index({ email: 1, lessonId: 1 });

module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);
