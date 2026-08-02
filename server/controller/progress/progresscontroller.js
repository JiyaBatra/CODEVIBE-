const Progress = require('../../models/progress');
const Analytics = require('../../models/analytics');
const { getRedisClient } = require('../../config/redis');

exports.getProgress = async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    const progress = await Progress.findOne({ email });

    if (req.user && req.user.email !== email) {
      return res.status(403).json({ message: 'Forbidden: you can only access your own progress' });
    }
    
    if (!progress) {
      return res.json({ 
        email, 
        completedLessons: [], 
        scores: {},
        xp: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        dailyGoal: 1,
      });
    }

    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.exportProgress = async (req, res) => {
  try {
    const { email } = req.params;

    if (req.user.email !== email) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const SUBJECT_TOTALS = {
      HTML: 10, CSS: 14, JavaScript: 29, 'C Programming': 17,
      DBMS: 12, DSA: 12, Express: 10, MongoDB: 8,
      'Node.js': 12, OOP: 14, React: 13,
    };

    const subjectMap = {
      html: 'HTML', css: 'CSS', js: 'JavaScript', javascript: 'JavaScript',
      react: 'React', node: 'Node.js', mongo: 'MongoDB', mongodb: 'MongoDB',
      dbms: 'DBMS', oop: 'OOP', express: 'Express', c: 'C Programming', dsa: 'DSA',
    };

    const normalizeSubject = (lessonId) => {
      if (!lessonId || typeof lessonId !== 'string') return 'Other';
      const lower = lessonId.toLowerCase();
      for (const key of Object.keys(subjectMap)) {
        if (lower.startsWith(key)) return subjectMap[key];
      }
      return 'Other';
    };

    const lessonAgg = await Analytics.aggregate([
      { $match: { email } },
      {
        $group: {
          _id: "$lessonId",
          totalScore: { $sum: "$score" },
          count: { $sum: { $cond: [{ $type: "$score" }, { $cond: [{ $ne: ["$score", null] }, 1, 0] }, 0] } }
        }
      }
    ]);

    const subjectStats = {};
    for (const entry of lessonAgg) {
      const subject = normalizeSubject(entry._id);
      if (!subjectStats[subject]) {
        subjectStats[subject] = { completed: new Set(), totalScore: 0, count: 0 };
      }
      if (entry._id) subjectStats[subject].completed.add(entry._id);
      subjectStats[subject].totalScore += entry.totalScore || 0;
      subjectStats[subject].count += entry.count || 0;
    }

    const rows = Object.entries(subjectStats).map(([subject, stats]) => {
      const completed = stats.completed.size;
      const total = SUBJECT_TOTALS[subject] || completed;
      const avgScore = stats.count > 0 ? Math.round(stats.totalScore / stats.count) : 0;
      return `"${subject}",${completed},${total},${avgScore}`;
    });

    const header = "Subject,Lessons Completed,Total Lessons,Average Score\n";
    const csv = header + rows.join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=progress-${email}.csv`);
    res.send(csv);
  } catch (err) {
    console.error("EXPORT ERROR:", err);
    res.status(500).json({ message: "Failed to export" });
  }
};

exports.updateDailyGoal = async (req, res) => {
  try {
    const { dailyGoal } = req.body;
    const email = req.user.email;

    if (!dailyGoal || dailyGoal < 1 || dailyGoal > 10) {
      return res.status(400).json({ message: "Daily goal must be between 1 and 10" });
    }

    const progress = await Progress.findOneAndUpdate(
      { email },
      { dailyGoal },
      { new: true }
    );

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.json({ success: true, dailyGoal: progress.dailyGoal });
  } catch (err) {
    console.error("UPDATE GOAL ERROR:", err);
    res.status(500).json({ message: "Failed to update goal" });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const cacheKey = `leaderboard:global:page:${page}:limit:${limit}`;
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

    // Single aggregation pipeline replaces two separate queries.
    // Uses the compound index { xp: -1, level: -1 } for efficient sorting.
    // $facet lets us compute paginated data AND total count in one database round-trip.
    const [result] = await Progress.aggregate([
      {
        $facet: {
          data: [
            { $sort: { xp: -1, level: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                username: 1,
                xp: 1,
                level: 1,
                badges: 1,
              },
            },
          ],
          totalCount: [{ $count: 'count' }],
        },
      },
      {
        $project: {
          data: 1,
          total: { $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0] },
        },
      },
    ]);

    const responsePayload = {
      data: result.data,
      total: result.total,
      page,
      totalPages: Math.ceil(result.total / limit),
    };

    // 2. Save result to cache (TTL: 10 minutes)
    if (redisClient) {
      try {
        await redisClient.setEx(cacheKey, 600, JSON.stringify(responsePayload));
      } catch (err) {
        console.warn('⚠️ Redis setEx error:', err);
      }
    }

    res.json(responsePayload);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Server error' });
  }
};