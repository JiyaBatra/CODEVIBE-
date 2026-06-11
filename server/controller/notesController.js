const Note = require("../models/note");

exports.getNotes = async (req, res) => {
  try {
    const { lessonId } = req.query;
    const filter = { email: req.user.email };
    if (lessonId) {
      filter.lessonId = lessonId;
    }
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { lessonId, content } = req.body;
    if (!lessonId) {
      return res.status(400).json({ message: "lessonId is required" });
    }
    const note = await Note.create({
      email: req.user.email,
      lessonId,
      content: content || "",
    });
    res.status(201).json(note);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ message: "Failed to create note" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, email: req.user.email },
      { content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ message: "Failed to update note" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({
      _id: id,
      email: req.user.email,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Failed to delete note" });
  }
};
