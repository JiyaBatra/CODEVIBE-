const Lesson = require('../../models/lesson');
const Progress = require('../../models/progress');
const User = require('../../models/user.models');
const Analytics = require('../../models/analytics');
const Notification = require('../../models/notification');

const LESSON_ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;
const MAX_LESSON_ID_LENGTH = 80;
const MAX_COINS = 1000;
const MAX_LEARNING_TIME_SECONDS = 60 * 60 * 6;
const VALID_COMPLETION_TYPES = new Set(['lesson', 'quiz', 'practice', 'project']);
const STATIC_LESSON_LIMITS = {
  html: 10,
  css: 14,
  js: 29,
  c: 17,
  dbms: 12,
  dsa: 12,
  express: 10,
  mongo: 8,
  node: 12,
  oop: 14,
  react: 13,
};
const STATIC_LESSON_ID_RE = /^(html|css|js|c|dbms|dsa|express|mongo|node|oop|react)-lesson-?(\d+)$/i;

const getSubjectFromLessonId = (lessonId) => {
  if (!lessonId || typeof lessonId !== 'string') return 'Other';
  return lessonId.split('-')[0].replace(/\d+$/, '') || lessonId;
};

const parseFiniteNumber = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const parseBoundedNumber = (value, { field, min, max, required = false, fallback = 0 }) => {
  if (value === undefined || value === null || value === '') {
    if (required) {
      return { error: `${field} is required` };
    }
    return { value: fallback };
  }

  const parsed = parseFiniteNumber(value);

  if (parsed === null || parsed < min || parsed > max) {
    return { error: `${field} must be a number between ${min} and ${max}` };
  }

  return { value: Math.round(parsed) };
};

const validateLessonId = (lessonId) => {
  if (typeof lessonId !== 'string') {
    return 'Lesson id must be a string';
  }

  const normalizedLessonId = lessonId.trim();

  if (!normalizedLessonId) {
    return 'Lesson id is required';
  }

  if (normalizedLessonId.length > MAX_LESSON_ID_LENGTH || !LESSON_ID_RE.test(normalizedLessonId)) {
    return 'Lesson id format is invalid';
  }

  return null;
};

const isKnownStaticLessonId = (lessonId) => {
  const match = STATIC_LESSON_ID_RE.exec(lessonId);
  if (!match) return false;

  const [, courseKey, lessonNumberText] = match;
  const lessonNumber = Number(lessonNumberText);
  const maxLessonNumber = STATIC_LESSON_LIMITS[courseKey.toLowerCase()];

  return Number.isInteger(lessonNumber) && lessonNumber >= 1 && lessonNumber <= maxLessonNumber;
};

const lessonExists = async (lessonId) => {
  if (isKnownStaticLessonId(lessonId)) {
    return true;
  }

  const lesson = await Lesson.findOne({ lessonId }).select('lessonId').lean();
  return Boolean(lesson);
};

const validateCompletionPayload = (body = {}) => {
  const scoreResult = parseBoundedNumber(body.score, {
    field: 'score',
    min: 0,
    max: 100,
    required: true,
  });

  if (scoreResult.error) return { error: scoreResult.error };

  const coinsResult = parseBoundedNumber(body.coins, {
    field: 'coins',
    min: 0,
    max: MAX_COINS,
    fallback: 0,
  });

  if (coinsResult.error) return { error: coinsResult.error };

  const learningTimeResult = parseBoundedNumber(body.learningTime, {
    field: 'learningTime',
    min: 0,
    max: MAX_LEARNING_TIME_SECONDS,
    fallback: 0,
  });

  if (learningTimeResult.error) return { error: learningTimeResult.error };

  const type = typeof body.type === 'string' && body.type.trim()
    ? body.type.trim().toLowerCase()
    : 'lesson';

  if (!VALID_COMPLETION_TYPES.has(type)) {
    return { error: 'type must be one of: lesson, quiz, practice, project' };
  }

  return {
    value: {
      score: scoreResult.value,
      coins: coinsResult.value,
      learningTime: learningTimeResult.value,
      type,
    },
  };
};

exports.getAllLessons = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Lesson.find({}).sort({ order: 1 }).skip(skip).limit(limit).lean(),
      Lesson.countDocuments({}),
    ]);

    res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
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
    const email = req.user?.email; // derived from verified JWT
    const lessonId = typeof req.params.id === 'string' ? req.params.id.trim() : req.params.id;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const lessonIdError = validateLessonId(lessonId);
    if (lessonIdError) {
      return res.status(400).json({ message: lessonIdError });
    }

    if (!(await lessonExists(lessonId))) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const payload = validateCompletionPayload(req.body);
    if (payload.error) {
      return res.status(400).json({ message: payload.error });
    }

    const { score, coins, learningTime, type } = payload.value;

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
      const baseXp = Math.round(score * 0.5);

      const { getLearningStreak } = require('../analytics/analyticsController');
      const events = await Analytics.find({ email }).sort({ createdAt: 1 }).lean();
      const currentStreak = getLearningStreak(events);

      let multiplier = 1.0;
      if (currentStreak >= 7) multiplier = 1.5;
      else if (currentStreak >= 3) multiplier = 1.2;

      earnedXp = Math.round(baseXp * multiplier);

      const { checkAndAwardBadges } = require('../../config/badges');
      const progressData = progress ? { ...progress.toObject(), badges: earnedBadges } : { completedLessons: [], scores: {}, badges: [], currentStreak: 0 };
      const result = checkAndAwardBadges(
        progressData,
        { score, analyticsEvents: events }
      );
      earnedBadges = result.earnedBadgeIds;
    }

    const currentXp = progress?.xp || 0;
    const newTotalXp = currentXp + earnedXp;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    progress = await Progress.findOneAndUpdate(
      { email },
      {
        $addToSet: { completedLessons: lessonId },
        $set: {
          [`scores.${lessonId}`]: score,
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

    const user = await User.findOne({ email }).lean();

    try {
      await Analytics.create({
        userId: user?._id || null,
        email,
        username: user?.username || progress.username || '',
        lessonId,
        subject: getSubjectFromLessonId(lessonId),
        score,
        completed: true,
        points: score,
        coins,
        learningTime,
        type,
      });
    } catch (analyticsErr) {
      console.error('Analytics event creation failed:', analyticsErr);
    }

    try {
      await Notification.create({
        email,
        type: 'lesson_complete',
        message: `You completed the lesson "${lessonId}" with a score of ${score}!`,
        relatedEntity: lessonId,
      });
    } catch (notifErr) {
      console.error('Notification creation failed:', notifErr);
    }

    if (currentStreak > 1 && currentStreak % 5 === 0) {
      try {
        await Notification.create({
          email,
          type: 'streak_milestone',
          message: `You've reached a ${currentStreak}-day learning streak! Keep it up!`,
          relatedEntity: '',
        });
      } catch (notifErr) {
        console.error('Streak notification creation failed:', notifErr);
      }
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
