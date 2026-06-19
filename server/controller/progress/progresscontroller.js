const Progress = require('../../models/progress');

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

exports.getLeaderboard = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Progress.find({}, 'username xp level badges')
        .sort({ xp: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Progress.countDocuments({}),
    ]);

    res.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Server error' });
  }
};