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

const BADGE_DEFINITIONS = [
  {
    id: "first_blood",
    label: "First Blood",
    desc: "Complete your very first lesson",
    icon: "\u2694\uFE0F",
    category: "special",
  },
  {
    id: "night_owl",
    label: "Night Owl",
    desc: "Complete a lesson between 12 AM and 5 AM",
    icon: "\uD83E\uDD89",
    category: "special",
  },
  {
    id: "fast_learner",
    label: "Fast Learner",
    desc: "Complete 5 lessons in a single day",
    icon: "\u26A1",
    category: "streak",
  },
  {
    id: "weekend_warrior",
    label: "Weekend Warrior",
    desc: "Complete 5 lessons on a weekend",
    icon: "\uD83D\uDEE1\uFE0F",
    category: "streak",
  },
  {
    id: "html_master",
    label: "HTML Master",
    desc: "Complete all 10 HTML lessons",
    icon: "\uD83C\uDF10",
    category: "course",
  },
  {
    id: "css_master",
    label: "CSS Master",
    desc: "Complete all 14 CSS lessons",
    icon: "\uD83C\uDFA8",
    category: "course",
  },
  {
    id: "js_master",
    label: "JS Master",
    desc: "Complete all 29 JavaScript lessons",
    icon: "\uD83D\uDCDC",
    category: "course",
  },
  {
    id: "century",
    label: "Century",
    desc: "Score 100 on any lesson",
    icon: "\uD83D\uDCAF",
    category: "special",
  },
  {
    id: "persistent",
    label: "Persistent",
    desc: "Maintain a 7-day streak",
    icon: "\uD83D\uDD25",
    category: "streak",
  },
  {
    id: "polyglot",
    label: "Polyglot",
    desc: "Complete lessons in 3 different languages",
    icon: "\uD83D\uDDE3\uFE0F",
    category: "course",
  },
];

const getSubjectFromLessonId = (lessonId) => {
  if (!lessonId || typeof lessonId !== "string") return null;
  return lessonId.split("-")[0]?.replace(/\d+$/, "") || null;
};

const checkAndAwardBadges = (progress, { score, analyticsEvents = [] }) => {
  const earnedBadgeIds = new Set(progress.badges || []);
  const newlyEarned = [];

  for (const badge of BADGE_DEFINITIONS) {
    if (earnedBadgeIds.has(badge.id)) continue;

    let earned = false;

    switch (badge.id) {
      case "first_blood":
        earned = progress.completedLessons.length >= 1;
        break;

      case "night_owl": {
        const hour = new Date().getHours();
        earned = hour >= 0 && hour < 5;
        break;
      }

      case "fast_learner": {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString();
        const todayCount = analyticsEvents.filter(
          (e) =>
            e.createdAt &&
            new Date(e.createdAt).toISOString().slice(0, 10) === todayStr.slice(0, 10)
        ).length;
        earned = todayCount >= 5;
        break;
      }

      case "weekend_warrior": {
        const weekendCount = analyticsEvents.filter((e) => {
          if (!e.createdAt) return false;
          const day = new Date(e.createdAt).getDay();
          return day === 0 || day === 6;
        }).length;
        earned = weekendCount >= 5;
        break;
      }

      case "html_master":
      case "css_master":
      case "js_master": {
        const subject = badge.id.replace("_master", "");
        const total = STATIC_LESSON_LIMITS[subject];
        if (!total) break;
        const completedCount = progress.completedLessons.filter((id) => {
          const s = getSubjectFromLessonId(id);
          return s === subject;
        }).length;
        earned = completedCount >= total;
        break;
      }

      case "century": {
        const scores = progress.scores || {};
        earned = Object.values(scores).some((s) => s >= 100);
        break;
      }

      case "persistent":
        earned = (progress.currentStreak || 0) >= 7;
        break;

      case "polyglot": {
        const languages = new Set(
          progress.completedLessons
            .map((id) => getSubjectFromLessonId(id))
            .filter(Boolean)
        );
        earned = languages.size >= 3;
        break;
      }
    }

    if (earned) {
      earnedBadgeIds.add(badge.id);
      newlyEarned.push(badge.id);
    }
  }

  return { earnedBadgeIds: [...earnedBadgeIds], newlyEarned };
};

module.exports = { BADGE_DEFINITIONS, checkAndAwardBadges };
