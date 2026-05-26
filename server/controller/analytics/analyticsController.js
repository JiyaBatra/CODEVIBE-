const User = require('../../models/user.models');
const Progress = require('../../models/progress');
const Lesson = require('../../models/lesson');
const Analytics = require('../../models/analytics');

const subjectMap = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  javascript: 'JavaScript',
  react: 'React',
  node: 'Node.js',
  mongo: 'MongoDB',
  mongodb: 'MongoDB',
  dbms: 'DBMS',
  oop: 'OOP',
  express: 'Express',
  c: 'C Programming',
  dsa: 'DSA',
};

const normalizeSubject = (lessonId) => {
  if (!lessonId || typeof lessonId !== 'string') return 'Other';
  const lower = lessonId.toLowerCase();

  for (const key of Object.keys(subjectMap)) {
    if (lower.startsWith(key)) {
      return subjectMap[key];
    }
  }

  const prefixMatch = lower.match(/^(html|css|js|javascript|react|node|mongo|mongodb|dbms|oop|express|c|dsa)/);
  if (prefixMatch) {
    return subjectMap[prefixMatch[1]] || prefixMatch[1].toUpperCase();
  }

  const cleaned = lower.replace(/[^a-z]/g, '');
  if (!cleaned) return 'Other';
  return subjectMap[cleaned] || `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}`;
};

const getProgressScores = (scores) => {
  if (!scores) return {};
  if (scores instanceof Map) return Object.fromEntries(scores);
  return scores;
};

const normalizeDateValue = (value) => {
  if (!value) return null;
  if (typeof value === 'string' || value instanceof Date) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
  }
  if (typeof value === 'object' && value !== null) {
    const date = new Date(value.createdAt || value.x || value.date);
    return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
  }
  return null;
};

const getLearningStreak = (values) => {
  if (!Array.isArray(values) || values.length === 0) return 0;

  const uniqueDates = Array.from(
    new Set(values.map((date) => normalizeDateValue(date)).filter(Boolean))
  ).sort((a, b) => new Date(b) - new Date(a));

  if (!uniqueDates.length) return 0;

  let streak = 1;
  let previousDate = new Date(uniqueDates[0]);

  for (let i = 1; i < uniqueDates.length; i += 1) {
    const currentDate = new Date(uniqueDates[i]);
    const expectedDate = new Date(previousDate);
    expectedDate.setDate(expectedDate.getDate() - 1);

    if (currentDate.toISOString().slice(0, 10) === expectedDate.toISOString().slice(0, 10)) {
      streak += 1;
      previousDate = currentDate;
    } else {
      break;
    }
  }

  return streak;
};

const buildSubjectHistory = (subject, lessons, completedLessonIds, events, scores) => {
  const subjectLessons = lessons.filter((lesson) => normalizeSubject(lesson.lessonId) === subject);
  const completedLessons = subjectLessons.filter((lesson) => completedLessonIds.has(lesson.lessonId));
  const eventMap = new Map(
    events
      .filter((event) => normalizeSubject(event.lessonId) === subject)
      .map((event) => [event.lessonId, event])
  );

  let orderedLessons = completedLessons.slice().sort((a, b) => {
    const eventA = eventMap.get(a.lessonId);
    const eventB = eventMap.get(b.lessonId);
    const dateA = eventA?.createdAt ? new Date(eventA.createdAt) : null;
    const dateB = eventB?.createdAt ? new Date(eventB.createdAt) : null;

    if (dateA && dateB) return dateA - dateB;
    if (dateA) return -1;
    if (dateB) return 1;
    return a.order - b.order;
  });

  if (!orderedLessons.length && completedLessonIds.size > 0) {
    orderedLessons = Array.from(completedLessonIds)
      .filter((lessonId) => normalizeSubject(lessonId) === subject)
      .map((lessonId) => ({ lessonId, order: 0 }));
  }

  const subjectTotalLessons = subjectLessons.length || orderedLessons.length;

  return orderedLessons.map((lesson, index) => {
    const event = eventMap.get(lesson.lessonId) || {};
    const createdAt = event.createdAt || lesson.createdAt || null;
    const label = createdAt
      ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : `Lesson ${index + 1}`;
    const progressPercent = Math.round(((index + 1) / Math.max(subjectTotalLessons, 1)) * 100);

    return {
      lessonId: lesson.lessonId,
      score: event.score || scores[lesson.lessonId] || 0,
      points: event.points || 0,
      coins: event.coins || 0,
      createdAt,
      value: progressPercent,
      label,
    };
  });
};

const buildPointsTimeline = (events = []) => {
  return events.map((event) => ({
    x: event.createdAt || null,
    y: Number(event.points) || 0,
    lessonId: event.lessonId || null,
  }));
};

const getAnalytics = async (req, res) => {
  try {
    const email = req.params.email;
    const tokenEmail = req.user?.email || req.user?.Email;

    if (!email || !tokenEmail) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (email.toLowerCase() !== tokenEmail.toLowerCase()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const [user, progress, events] = await Promise.all([
      User.findOne({ Email: email }).lean(),
      Progress.findOne({ email }).lean(),
      Analytics.find({ email }).sort({ createdAt: 1 }).lean(),
    ]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const scores = getProgressScores(progress?.scores);
    const completedLessons = Array.isArray(progress?.completedLessons) ? progress.completedLessons : [];
    const eventLessonIds = Array.from(
      new Set(events.map((event) => event.lessonId).filter(Boolean))
    );
    const progressLessonIds = Array.from(
      new Set([
        ...completedLessons,
        ...Object.keys(scores),
        ...eventLessonIds,
      ])
    );

    const lessons = progressLessonIds.length
      ? await Lesson.find({ lessonId: { $in: progressLessonIds } }).lean()
      : [];

    const scoreValues = Object.values(scores).filter((value) => typeof value === 'number');
    const totalPoints = scoreValues.reduce((sum, value) => sum + value, 0);
    const averageScore = scoreValues.length
      ? Math.round(totalPoints / scoreValues.length)
      : 0;

    const lessonSubjects = lessons.reduce((acc, lesson) => {
      const subject = normalizeSubject(lesson.lessonId);
      if (!acc[subject]) acc[subject] = { totalLessons: 0, completedLessons: 0, scores: [], lessons: [] };
      acc[subject].totalLessons += 1;
      acc[subject].lessons.push(lesson);
      return acc;
    }, {});

    const completedLessonIds = new Set(completedLessons);

    for (const lessonId of completedLessons) {
      const subject = normalizeSubject(lessonId);
      if (!lessonSubjects[subject]) {
        lessonSubjects[subject] = { totalLessons: 0, completedLessons: 0, scores: [], lessons: [] };
      }
      lessonSubjects[subject].completedLessons += 1;
      if (typeof scores[lessonId] === 'number') {
        lessonSubjects[subject].scores.push(scores[lessonId]);
      }
    }

    const subjects = Object.entries(lessonSubjects)
      .filter(([_, data]) => data.completedLessons > 0)
      .map(([subject, data]) => {
        const history = buildSubjectHistory(subject, data.lessons, completedLessonIds, events, scores);
        const datedActivity = history
          .map((item) => item.createdAt)
          .filter(Boolean)
          .map((d) => new Date(d).toISOString().slice(0, 10));

        return {
          subject,
          totalLessons: data.totalLessons,
          completedLessons: data.completedLessons,
          completionRate: Math.round((data.completedLessons / Math.max(data.totalLessons, 1)) * 100),
          averageScore: data.scores.length
            ? Math.round(data.scores.reduce((sum, val) => sum + val, 0) / data.scores.length)
            : 0,
          history,
          streak: getLearningStreak(datedActivity),
          lastActivity: history.length ? history[history.length - 1].createdAt : null,
        };
      });

    const subjectHistory = events.reduce((acc, event) => {
      const subject = normalizeSubject(event.lessonId);
      if (!acc[subject]) acc[subject] = [];
      acc[subject].push({
        lessonId: event.lessonId,
        score: event.score,
        points: event.points,
        coins: event.coins,
        learningTime: event.learningTime,
        createdAt: event.createdAt,
      });
      return acc;
    }, {});

    const userLessons = lessons;
    const stats = {
      lessonsCompleted: completedLessons.length,
      totalLessons: userLessons.length,
      subjectsCompleted: subjects.filter((item) => item.completedLessons > 0).length,
      totalPoints,
      averageScore,
      completionRate: userLessons.length
        ? Math.round((completedLessons.length / userLessons.length) * 100)
        : 0,
      coinsEarned: events.reduce((sum, event) => sum + (event.coins || 0), 0),
      learningTime: events.reduce((sum, event) => sum + (event.learningTime || 0), 0),
      quizAttempts: events.filter((event) => event.type === 'quiz').length,
      streak: getLearningStreak(events),
      lastUpdated: events.length ? events[events.length - 1].createdAt : null,
    };

    const analytics = {
      subjects: subjects.map((subject) => ({
        subject: subject.subject,
        completionRate: subject.completionRate,
        averageScore: subject.averageScore,
        completedLessons: subject.completedLessons,
        totalLessons: subject.totalLessons,
        history: subject.history,
        streak: subject.streak,
        lastActivity: subject.lastActivity,
      })),
      timelines: {
        points: buildPointsTimeline(events),
        coins: events.map((event) => ({ x: event.createdAt, y: event.coins || 0 })),
        learningTime: events.map((event) => ({ x: event.createdAt, y: event.learningTime || 0 })),
      },
      subjectHistory,
    };

    const profile = {
      username: user.username,
      email: user.Email,
      college: user.college,
      year: user.year,
      bio: user.bio || '',
      avatarUrl: user.avatarUrl || '',
      joinedAt:
        user.joinedAt ||
        (user._id && typeof user._id.getTimestamp === 'function'
          ? user._id.getTimestamp()
          : null),
    };

    return res.json({
      profile,
      stats,
      subjects,
      analytics,
    });
  } catch (err) {
    console.error('Analytics error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAnalytics,
};