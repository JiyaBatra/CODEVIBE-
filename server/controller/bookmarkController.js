const Bookmark = require("../models/bookmark");

exports.toggleBookmark = async (req, res) => {
  try {
    const { lessonId } = req.body;
    if (!lessonId) {
      return res.status(400).json({ message: "lessonId is required" });
    }

    const existing = await Bookmark.findOne({ email: req.user.email, lessonId });
    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.json({ bookmarked: false, lessonId });
    }

    await Bookmark.create({ email: req.user.email, lessonId });
    return res.status(201).json({ bookmarked: true, lessonId });
  } catch (err) {
    console.error("Error toggling bookmark:", err);
    res.status(500).json({ message: "Failed to toggle bookmark" });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ email: req.user.email })
      .sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    res.status(500).json({ message: "Failed to fetch bookmarks" });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const result = await Bookmark.findOneAndDelete({
      email: req.user.email,
      lessonId,
    });

    if (!result) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.status(200).json({ message: "Bookmark removed", lessonId });
  } catch (err) {
    console.error("Error removing bookmark:", err);
    res.status(500).json({ message: "Failed to remove bookmark" });
  }
};
