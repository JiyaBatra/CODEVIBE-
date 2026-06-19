// controller/exam/examController.js
const ExamResult = require('../../models/examResult');
const Notification = require('../../models/notification');

/**
 * POST /api/exam/submit
 * Persists an MCQ exam result for the authenticated user.
 *
 * Body: { courseId, score, totalQuestions, passingScore? }
 */
exports.submitExam = async (req, res) => {
  try {
    const email = req.user.email; // injected by verifyToken middleware
    const { courseId, score, totalQuestions, passingScore } = req.body;

    // --- basic validation ---
    if (!courseId || typeof courseId !== 'string') {
      return res.status(400).json({ message: 'courseId is required' });
    }
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ message: 'score must be a non-negative number' });
    }
    if (typeof totalQuestions !== 'number' || totalQuestions < 1) {
      return res.status(400).json({ message: 'totalQuestions must be a positive number' });
    }

    const percentage = Math.round((score / totalQuestions) * 100);
    // Default passing threshold is 60 % unless the caller overrides it
    const threshold = typeof passingScore === 'number' ? passingScore : 60;
    const passed = percentage >= threshold;

    const result = await ExamResult.create({
      email,
      courseId,
      score,
      totalQuestions,
      percentage,
      passed,
      attemptedAt: new Date(),
    });

    try {
      await Notification.create({
        email,
        type: 'exam_result',
        message: passed
          ? `You passed the "${courseId}" exam with ${percentage}%!`
          : `You scored ${percentage}% on "${courseId}" exam. Keep practicing!`,
        relatedEntity: courseId,
      });
    } catch (notifErr) {
      console.error('Exam notification creation failed:', notifErr);
    }

    return res.status(201).json({
      message: 'Exam result saved',
      result: {
        id: result._id,
        courseId: result.courseId,
        score: result.score,
        totalQuestions: result.totalQuestions,
        percentage: result.percentage,
        passed: result.passed,
        attemptedAt: result.attemptedAt,
      },
    });
  } catch (err) {
    console.error('examController.submitExam error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/exam/results
 * Returns all past exam results for the authenticated user,
 * sorted newest-first.  Optionally filter by ?courseId=<id>.
 */
exports.getMyResults = async (req, res) => {
  try {
    const email = req.user.email;
    const { courseId } = req.query;

    const filter = { email };
    if (courseId) filter.courseId = courseId;

    const results = await ExamResult.find(filter)
      .sort({ attemptedAt: -1 })
      .lean();

    return res.json({ results });
  } catch (err) {
    console.error('examController.getMyResults error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
