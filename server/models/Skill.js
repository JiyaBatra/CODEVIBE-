const { model, Schema } = require("mongoose");

const skillSchema = new Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Language", "Framework", "Tool", "Concept", "Database", "Platform"],
  },
  aliases: [String],
});

module.exports = model("Skill", skillSchema, "skills");
