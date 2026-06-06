const Lesson = require('../../models/lesson');
const Progress = require('../../models/progress');
const User = require('../../models/user.models');
const Analytics = require('../../models/analytics');

const getSubjectFromLessonId = (lessonId) => {
  if (!lessonId || typeof lessonId !== 'string') return 'Other';
  return lessonId.split('-')[0].replace(/\d+$/, '') || lessonId;
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({}).sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findOne({ lessonId: id });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.completeLesson = async (req, res) => {
  try {
    const email = req.user.email; // derived from verified JWT
    const { score, coins, learningTime, type } = req.body; // email removed from body
    const lessonId = req.params.id;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingProgress = await Progress.findOne({ email });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = existingProgress?.currentStreak || 0;
    let longestStreak = existingProgress?.longestStreak || 0;

    if (!existingProgress?.lastActiveDate) {
      currentStreak = 1;
    } else {
      const lastDate = new Date(existingProgress.lastActiveDate);
      lastDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor(
        (today - lastDate) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 1) {
        currentStreak += 1;
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
      // diffDays === 0 -> same day, don't change streak
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    let progress = await Progress.findOne({ email });
    const isNewCompletion = !progress || !progress.completedLessons.includes(lessonId);

    let earnedXp = 0;
    let earnedBadges = progress?.badges || [];

    if (isNewCompletion) {
      let baseXp = Math.round((score || 100) * 0.5) || 50;

      const { getLearningStreak } = require('../analytics/analyticsController');
      const events = await Analytics.find({ email }).sort({ createdAt: 1 }).lean();
      const currentStreak = getLearningStreak(events);
      
      let multiplier = 1.0;
      if (currentStreak >= 7) multiplier = 1.5;
      else if (currentStreak >= 3) multiplier = 1.2;

      earnedXp = Math.round(baseXp * multiplier);

      if (!earnedBadges.includes('first_blood') && (!progress || progress.completedLessons.length === 0)) {
        earnedBadges.push('first_blood');
      }
      
      const hour = new Date().getHours();
      if (!earnedBadges.includes('night_owl') && (hour >= 0 && hour < 5)) {
        earnedBadges.push('night_owl');
      }
    }

    const currentXp = progress?.xp || 0;
    const newTotalXp = currentXp + earnedXp;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    progress = await Progress.findOneAndUpdate(
      { email },
      { 
        $addToSet: { completedLessons: lessonId },
        $set: { 
          [`scores.${lessonId}`]: score || 0,
          xp: newTotalXp,
          level: newLevel,
          badges: earnedBadges,
          currentStreak,
          longestStreak,
          lastActiveDate: today,
        }
      },
      {
        new: true,
        upsert: true,
      }
    );

    const user = await User.findOne({ Email: email }).lean();

    try {
      await Analytics.create({
        userId: user?._id || null,
        email,
        username: user?.username || progress.username || '',
        lessonId,
        subject: getSubjectFromLessonId(lessonId),
        score: score || 0,
        completed: true,
        points: score || 0,
        coins: coins || 0,
        learningTime: learningTime || 0,
        type: type || 'lesson',
      });
    } catch (analyticsErr) {
      console.error('Analytics event creation failed:', analyticsErr);
    }

    res.json({
      message: 'Lesson marked as completed',
      completedLessons: progress.completedLessons,
      scores: progress.scores,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      dailyGoal: progress.dailyGoal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};