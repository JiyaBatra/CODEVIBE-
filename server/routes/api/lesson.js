const express = require("express");
const { 
  getAllLessons, 
  getLesson, 
  completeLesson 
} = require("../../controller/Lesson/lessoncontroller");
const verifyToken = require("../../middleware/authMiddleware"); // added

const router = express.Router();

// GET /api/lessons/search?q=<query>&courseId=<optional>
router.get('/search', async (req, res) => {
  try {
    const { q, courseId } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        error: 'Query must be at least 2 characters',
      });
    }

    const filter = {
      $or: [
        { title:       { $regex: q.trim(), $options: 'i' } },
        { description: { $regex: q.trim(), $options: 'i' } },
        { tags:        { $in: [new RegExp(q.trim(), 'i')] } },
      ],
    };

    if (courseId) {
      filter.courseId = courseId;
    }

    const lessons = await Lesson.find(filter)
      .select('title courseId lessonNumber description')
      .limit(20)
      .lean();

    res.json({ results: lessons, query: q, count: lessons.length });
  } catch (err) {
    console.error('[LessonSearch]', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

router.get("/", getAllLessons);
router.get("/:id", getLesson);
router.post("/:id/complete", verifyToken, completeLesson); // added verifyToken

module.exports = router;