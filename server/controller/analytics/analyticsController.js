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
  let date;
  if (typeof value === 'string' || value instanceof Date) {
    date = new Date(value);
  } else if (typeof value === 'object' && value !== null) {
    date = new Date(value.createdAt || value.x || value.date);
  } else {
    return null;
  }
  
  if (Number.isNaN(date.getTime())) return null;
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getLearningStreak = (values) => {
  if (!Array.isArray(values) || values.length === 0) return 0;

  const uniqueDates = Array.from(
    new Set(values.map((date) => normalizeDateValue(date)).filter(Boolean))
  ).sort((a, b) => new Date(b) - new Date(a));

  if (!uniqueDates.length) return 0;

  const getLocalDateStr = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getLocalDateStr(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getLocalDateStr(yesterday);

  const newestDateStr = uniqueDates[0];

  // If the most recent activity is older than yesterday, the current streak is broken.
  if (newestDateStr !== todayStr && newestDateStr !== yesterdayStr) {
    return 0;
  }

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

/**
 * Returns the longest ever consecutive-day streak from a list of date values.
 */
const getLongestStreak = (values) => {
  if (!Array.isArray(values) || values.length === 0) return 0;

  const uniqueDates = Array.from(
    new Set(values.map((d) => normalizeDateValue(d)).filter(Boolean))
  ).sort((a, b) => new Date(a) - new Date(b));

  if (!uniqueDates.length) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < uniqueDates.length; i += 1) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      current += 1;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }

  return longest;
};

/**
 * Returns how many distinct weeks (Mon–Sun) the user has had at least one activity.
 */
const getWeeklyStreak = (values) => {
  if (!Array.isArray(values) || values.length === 0) return 0;

  const weekKeys = new Set();
  values.forEach((v) => {
    const d = normalizeDateValue(v);
    if (!d) return;
    const date = new Date(d);
    const dayOfWeek = date.getDay(); // 0 = Sun
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7));
    weekKeys.add(monday.toISOString().slice(0, 10));
  });

  const sorted = Array.from(weekKeys).sort((a, b) => new Date(b) - new Date(a));
  if (!sorted.length) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i += 1) {
    const diff = Math.round(
      (new Date(sorted[i - 1]) - new Date(sorted[i])) / (1000 * 60 * 60 * 24)
    );
    if (diff === 7) streak += 1;
    else break;
  }

  return streak;
};

/**
 * Builds a heatmap map: { 'YYYY-MM-DD': count } for the last `weeks` weeks.
 * Count = number of lesson events on that day (intensity).
 */
const buildHeatmapData = (events, weeks = 32) => {
  const dayMs = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today.getTime() - dayMs * (weeks * 7 - 1));
  const countMap = {};

  events.forEach((event) => {
    const d = normalizeDateValue(event.createdAt || event.x);
    if (!d) return;
    const eventDate = new Date(d);
    if (eventDate >= start && eventDate <= today) {
      countMap[d] = (countMap[d] || 0) + 1;
    }
  });

  return countMap;
};

/**
 * Builds this-week vs last-week summary stats.
 */
const buildWeeklyStats = (events) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const lastMonday = new Date(monday);
  lastMonday.setDate(monday.getDate() - 7);

  let thisWeekLessons = 0, thisWeekPoints = 0, thisWeekTime = 0;
  let lastWeekLessons = 0, lastWeekPoints = 0, lastWeekTime = 0;

  events.forEach((event) => {
    const d = new Date(event.createdAt);
    if (d >= monday) {
      thisWeekLessons += 1;
      thisWeekPoints += event.points || 0;
      thisWeekTime += event.learningTime || 0;
    } else if (d >= lastMonday) {
      lastWeekLessons += 1;
      lastWeekPoints += event.points || 0;
      lastWeekTime += event.learningTime || 0;
    }
  });

  return {
    thisWeek: { lessons: thisWeekLessons, points: thisWeekPoints, time: thisWeekTime },
    lastWeek: { lessons: lastWeekLessons, points: lastWeekPoints, time: lastWeekTime },
    lessonsDelta: thisWeekLessons - lastWeekLessons,
    pointsDelta: thisWeekPoints - lastWeekPoints,
  };
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

    console.log(`[getAnalytics] Querying user with email: "${email}"`);
    const [user, progress, events] = await Promise.all([
      User.findOne({
        $or: [
          { email },
          { Email: email }
        ],
      })
        .select('username Email college year bio avatarUrl joinedAt')
        .lean(),
      Progress.findOne({ email }).select('scores completedLessons').lean(),
      Analytics.find({ email })
        .select('lessonId score points coins learningTime createdAt type')
        .sort({ createdAt: 1 })
        .lean(),
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
      ? await Lesson.find({ lessonId: { $in: progressLessonIds } })
          .select('lessonId order createdAt')
          .lean()
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

    // True per-subject totals from lessonRoutes config (server-side mirror)
    const SUBJECT_TOTALS = {
      HTML: 10, CSS: 14, JavaScript: 29, 'C Programming': 17,
      DBMS: 12, DSA: 12, Express: 10, MongoDB: 8,
      'Node.js': 12, OOP: 14, React: 13,
    };

    // Weak subjects: averageScore < 60 and at least 1 lesson completed
    const weakSubjects = subjects
      .filter((s) => s.completedLessons > 0 && s.averageScore < 60 && s.averageScore > 0)
      .map((s) => ({
        subject: s.subject,
        averageScore: s.averageScore,
        completedLessons: s.completedLessons,
        totalLessons: SUBJECT_TOTALS[s.subject] || s.totalLessons,
      }))
      .sort((a, b) => a.averageScore - b.averageScore);

    // Solved / unsolved per subject using known totals
    const subjectSolvedStats = subjects.map((s) => ({
      subject: s.subject,
      solved: s.completedLessons,
      total: SUBJECT_TOTALS[s.subject] || s.totalLessons || s.completedLessons,
      unsolved: Math.max(0, (SUBJECT_TOTALS[s.subject] || s.totalLessons || s.completedLessons) - s.completedLessons),
    }));

    const eventDates = events.map((e) => e.createdAt);
    const currentStreak = getLearningStreak(eventDates);
    const longestStreak = getLongestStreak(eventDates);
    const weeklyStreak = getWeeklyStreak(eventDates);
    const weeklyStats = buildWeeklyStats(events);
    const heatmapData = buildHeatmapData(events, 32);

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
      streak: currentStreak,
      longestStreak,
      weeklyStreak,
      lastUpdated: events.length ? events[events.length - 1].createdAt : null,
      xp: progress?.xp || 0,
      level: progress?.level || 1,
      badges: progress?.badges || [],
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
      weakSubjects,
      subjectSolvedStats,
      weeklyStats,
      heatmapData,
    };

    const profile = {
      username: user.username,
      email: user.email,
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
  getLearningStreak,
};