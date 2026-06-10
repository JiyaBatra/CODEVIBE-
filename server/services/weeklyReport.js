const Progress = require("../models/progress");
const Analytics = require("../models/analytics");

async function generateWeeklyReport(email) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const lastMonday = new Date(monday);
  lastMonday.setDate(monday.getDate() - 7);

  const twoWeeksAgo = new Date(lastMonday);
  twoWeeksAgo.setDate(lastMonday.getDate() - 7);

  const [progress, thisWeekEvents, lastWeekEvents] = await Promise.all([
    Progress.findOne({ email }).lean(),
    Analytics.find({ email, createdAt: { $gte: lastMonday } }).lean(),
    Analytics.find({ email, createdAt: { $gte: twoWeeksAgo, $lt: lastMonday } }).lean(),
  ]);

  if (!progress) return null;

  const thisWeekLessons = thisWeekEvents.length;
  const lastWeekLessons = lastWeekEvents.length;
  const thisWeekXp = thisWeekEvents.reduce((sum, e) => sum + (e.points || 0), 0);
  const lastWeekXp = lastWeekEvents.reduce((sum, e) => sum + (e.points || 0), 0);
  const thisWeekTime = thisWeekEvents.reduce((sum, e) => sum + (e.learningTime || 0), 0);
  const lastWeekTime = lastWeekEvents.reduce((sum, e) => sum + (e.learningTime || 0), 0);

  const subjectStats = {};
  thisWeekEvents.forEach((e) => {
    const sub = e.subject || "Other";
    if (!subjectStats[sub]) subjectStats[sub] = { lessons: 0, totalScore: 0 };
    subjectStats[sub].lessons += 1;
    subjectStats[sub].totalScore += e.score || 0;
  });

  const subjects = Object.entries(subjectStats).map(([name, stats]) => ({
    name,
    lessons: stats.lessons,
    avgScore: stats.lessons > 0 ? Math.round(stats.totalScore / stats.lessons) : 0,
  }));

  subjects.sort((a, b) => b.lessons - a.lessons);
  const topSubject = subjects[0]?.name || null;
  const weakSubject = subjects.length > 0
    ? subjects.reduce((worst, s) => (s.avgScore < worst.avgScore ? s : worst))
    : null;

  return {
    email,
    period: {
      weekStart: lastMonday,
      weekEnd: monday,
    },
    stats: {
      lessonsCompleted: thisWeekLessons,
      lessonsDelta: thisWeekLessons - lastWeekLessons,
      xpEarned: thisWeekXp,
      xpDelta: thisWeekXp - lastWeekXp,
      timeSpent: thisWeekTime,
      timeDelta: thisWeekTime - lastWeekTime,
      currentStreak: progress.currentStreak || 0,
      longestStreak: progress.longestStreak || 0,
      totalXp: progress.xp || 0,
      level: progress.level || 1,
      totalLessons: progress.completedLessons?.length || 0,
      totalBadges: (progress.badges || []).length,
    },
    subjects,
    topSubject,
    weakSubject: weakSubject && weakSubject.avgScore < 60
      ? { name: weakSubject.name, avgScore: weakSubject.avgScore }
      : null,
  };
}

module.exports = { generateWeeklyReport };
