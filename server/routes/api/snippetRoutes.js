const router = require("express").Router();
const crypto = require("crypto");
const Snippet = require("../../models/snippet");
const verifyToken = require("../../middleware/authMiddleware");

const MAX_CODE_LENGTH = 10000; // matches executeController.js's cap

router.post("/", verifyToken, async (req, res) => {
  try {
    const { code, language, lessonId, title, score } = req.body;
    if (!code || !language) {
      return res.status(400).json({ message: "Code and language are required" });
    }

    // Username comes from the verified JWT payload, never from req.body
    const username = req.user?.username || req.user?.email || "Anonymous";

    const slug = crypto.randomBytes(6).toString("base64url");
    await Snippet.create({
      code: String(code).slice(0, MAX_CODE_LENGTH),
      language,
      lessonId,
      title: title || "Untitled",
      username,
      score: score ?? null,
      slug,
    });
    res.status(201).json({ slug, url: `/snippet/${slug}` });
  } catch (err) {
    console.error("Create snippet error:", err);
    res.status(500).json({ message: "Failed to create snippet" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ slug: req.params.slug });
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found or expired" });
    }
    res.json(snippet);
  } catch (err) {
    console.error("Get snippet error:", err);
    res.status(500).json({ message: "Failed to fetch snippet" });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const [data, total] = await Promise.all([
      Snippet.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Snippet.countDocuments(),
    ]);
    res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("List snippets error:", err);
    res.status(500).json({ message: "Failed to list snippets" });
  }
});

module.exports = router;