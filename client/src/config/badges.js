const ALL_POSSIBLE_BADGES = [
  { id: "first_blood",    label: "First Blood",     desc: "Complete your very first lesson",               icon: "\u2694\uFE0F",  category: "special" },
  { id: "night_owl",      label: "Night Owl",       desc: "Complete a lesson between 12 AM and 5 AM",      icon: "\uD83E\uDD89",  category: "special" },
  { id: "fast_learner",   label: "Fast Learner",    desc: "Complete 5 lessons in a single day",            icon: "\u26A1",        category: "streak" },
  { id: "weekend_warrior", label: "Weekend Warrior", desc: "Complete 5 lessons on a weekend",               icon: "\uD83D\uDEE1\uFE0F", category: "streak" },
  { id: "html_master",    label: "HTML Master",     desc: "Complete all 10 HTML lessons",                  icon: "\uD83C\uDF10",  category: "course" },
  { id: "css_master",     label: "CSS Master",      desc: "Complete all 14 CSS lessons",                   icon: "\uD83C\uDFA8",  category: "course" },
  { id: "js_master",      label: "JS Master",       desc: "Complete all 29 JavaScript lessons",            icon: "\uD83D\uDCDC",  category: "course" },
  { id: "century",        label: "Century",         desc: "Score 100 on any lesson",                       icon: "\uD83D\uDCAF",  category: "special" },
  { id: "persistent",     label: "Persistent",      desc: "Maintain a 7-day streak",                       icon: "\uD83D\uDD25",  category: "streak" },
  { id: "polyglot",       label: "Polyglot",        desc: "Complete lessons in 3 different languages",     icon: "\uD83D\uDDE3\uFE0F", category: "course" },
];

const CATEGORIES = [
  { key: "course",  label: "Course" },
  { key: "streak",  label: "Streak" },
  { key: "special", label: "Special" },
];

export { ALL_POSSIBLE_BADGES, CATEGORIES };
