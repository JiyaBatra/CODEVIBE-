// controller/exam/examController.js
const ExamResult = require('../../models/examResult');
const Notification = require('../../models/notification');
const { getRedisClient } = require('../../config/redis');

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
 * Returns all past exam results for the authenticated user with per-course
 * summary stats, computed via a MongoDB Aggregation Pipeline in one round-trip.
 * Optionally filter by ?courseId=<id>.
 */
exports.getMyResults = async (req, res) => {
  try {
    const email = req.user.email;
    const { courseId } = req.query;

    const matchStage = { email };
    if (courseId) matchStage.courseId = courseId;

    // Aggregation pipeline:
    // 1. $match: filter by user (and optional courseId) — uses compound index { email, courseId, attemptedAt }
    // 2. $sort: newest-first
    // 3. $facet: two parallel sub-pipelines:
    //    - "results": the raw list of attempts
    //    - "summary": $group to compute per-course averages and pass counts in the DB
    const [agg] = await ExamResult.aggregate([
      { $match: matchStage },
      { $sort: { attemptedAt: -1 } },
      {
        $facet: {
          results: [
            {
              $project: {
                _id: 1,
                courseId: 1,
                score: 1,
                totalQuestions: 1,
                percentage: 1,
                passed: 1,
                attemptedAt: 1,
              },
            },
          ],
          summary: [
            {
              $group: {
                _id: '$courseId',
                attempts: { $sum: 1 },
                bestScore: { $max: '$percentage' },
                avgScore: { $avg: '$percentage' },
                passed: {
                  $sum: { $cond: ['$passed', 1, 0] },
                },
                lastAttempt: { $max: '$attemptedAt' },
              },
            },
            { $sort: { lastAttempt: -1 } },
            {
              $project: {
                courseId: '$_id',
                _id: 0,
                attempts: 1,
                bestScore: { $round: ['$bestScore', 1] },
                avgScore: { $round: ['$avgScore', 1] },
                passed: 1,
                lastAttempt: 1,
              },
            },
          ],
        },
      },
    ]);

    return res.json({
      results: agg.results,
      summary: agg.summary,
    });
  } catch (err) {
    console.error('examController.getMyResults error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/exam/leaderboard
 * Returns top scorers per course (or globally) using an aggregation pipeline.
 * Uses the compound index { email, courseId, attemptedAt } for efficient $match + $group.
 * Query params: ?courseId=<id>&limit=<n>
 */
exports.getExamLeaderboard = async (req, res) => {
  try {
    const { courseId } = req.query;
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));

    const cacheKey = `leaderboard:exam:${courseId || 'global'}:limit:${limit}`;
    const redisClient = getRedisClient();

    // 1. Try to fetch from cache
    if (redisClient) {
      try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          return res.json(JSON.parse(cachedData));
        }
      } catch (err) {
        console.warn('⚠️ Redis get error:', err);
      }
    }

    const matchStage = {};
    if (courseId) matchStage.courseId = courseId;

    // Pipeline:
    // 1. $match on courseId if provided
    // 2. $group per user+course → compute bestScore and attempt count in DB
    // 3. $sort by bestScore desc
    // 4. $limit top N
    // 5. $project clean output fields
    const leaderboard = await ExamResult.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { email: '$email', courseId: '$courseId' },
          bestScore: { $max: '$percentage' },
          attempts: { $sum: 1 },
          passed: { $max: { $cond: ['$passed', 1, 0] } },
          lastAttempt: { $max: '$attemptedAt' },
        },
      },
      { $sort: { bestScore: -1, lastAttempt: 1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          email: '$_id.email',
          courseId: '$_id.courseId',
          bestScore: { $round: ['$bestScore', 1] },
          attempts: 1,
          passed: { $eq: ['$passed', 1] },
          lastAttempt: 1,
        },
      },
    ]);

    const responsePayload = { leaderboard };

    // 2. Save result to cache (TTL: 10 minutes)
    if (redisClient) {
      try {
        await redisClient.setEx(cacheKey, 600, JSON.stringify(responsePayload));
      } catch (err) {
        console.warn('⚠️ Redis setEx error:', err);
      }
    }

    return res.json(responsePayload);
  } catch (err) {
    console.error('examController.getExamLeaderboard error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
