const COMMON_SKILLS = [
  { name: "Java", category: "Language", aliases: ["java", "java8", "java11", "java17"] },
  { name: "Python", category: "Language", aliases: ["python", "python3", "py"] },
  { name: "JavaScript", category: "Language", aliases: ["js", "javascript", "ecmascript", "es6", "es2015"] },
  { name: "TypeScript", category: "Language", aliases: ["ts", "typescript"] },
  { name: "C++", category: "Language", aliases: ["cpp", "cplusplus", "c++"] },
  { name: "C", category: "Language", aliases: ["c"] },
  { name: "C#", category: "Language", aliases: ["csharp", "c#", "c sharp"] },
  { name: "PHP", category: "Language", aliases: ["php"] },
  { name: "Ruby", category: "Language", aliases: ["ruby"] },
  { name: "Go", category: "Language", aliases: ["go", "golang"] },
  { name: "Rust", category: "Language", aliases: ["rust"] },
  { name: "Swift", category: "Language", aliases: ["swift"] },
  { name: "Kotlin", category: "Language", aliases: ["kotlin"] },
  { name: "HTML", category: "Language", aliases: ["html", "html5"] },
  { name: "CSS", category: "Language", aliases: ["css", "css3"] },
  { name: "SQL", category: "Language", aliases: ["sql"] },
  { name: "React", category: "Framework", aliases: ["react", "reactjs", "react.js"] },
  { name: "Angular", category: "Framework", aliases: ["angular", "angularjs", "angular2"] },
  { name: "Vue.js", category: "Framework", aliases: ["vue", "vuejs", "vue.js"] },
  { name: "Node.js", category: "Framework", aliases: ["node", "nodejs", "node.js"] },
  { name: "Express", category: "Framework", aliases: ["express", "expressjs"] },
  { name: "Django", category: "Framework", aliases: ["django"] },
  { name: "Flask", category: "Framework", aliases: ["flask"] },
  { name: "Spring", category: "Framework", aliases: ["spring", "springboot", "spring boot"] },
  { name: "Next.js", category: "Framework", aliases: ["next", "nextjs", "next.js"] },
  { name: "MongoDB", category: "Database", aliases: ["mongo", "mongodb"] },
  { name: "MySQL", category: "Database", aliases: ["mysql"] },
  { name: "PostgreSQL", category: "Database", aliases: ["postgres", "postgresql", "psql"] },
  { name: "Redis", category: "Database", aliases: ["redis"] },
  { name: "Git", category: "Tool", aliases: ["git"] },
  { name: "Docker", category: "Tool", aliases: ["docker"] },
  { name: "Kubernetes", category: "Tool", aliases: ["k8s", "kubernetes"] },
  { name: "AWS", category: "Platform", aliases: ["aws", "amazon web services"] },
  { name: "Azure", category: "Platform", aliases: ["azure", "microsoft azure"] },
  { name: "GCP", category: "Platform", aliases: ["gcp", "google cloud"] },
  { name: "Linux", category: "Concept", aliases: ["linux", "unix"] },
  { name: "Agile", category: "Concept", aliases: ["agile"] },
  { name: "Scrum", category: "Concept", aliases: ["scrum"] },
];

const SKILL_NAMES = COMMON_SKILLS.map((s) => s.name);
const ALIAS_MAP = new Map();
COMMON_SKILLS.forEach((skill) => {
  skill.aliases.forEach((alias) => {
    if (!ALIAS_MAP.has(alias)) {
      ALIAS_MAP.set(alias, skill.name);
    }
  });
});

function normalizeSkill(input) {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  const exactMatch = COMMON_SKILLS.find(
    (s) => s.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (exactMatch) return exactMatch.name;

  const aliasMatch = ALIAS_MAP.get(trimmed.toLowerCase());
  if (aliasMatch) return aliasMatch;

  for (const skill of COMMON_SKILLS) {
    if (skill.name.toLowerCase().includes(trimmed.toLowerCase())) {
      return skill.name;
    }
  }

  return trimmed;
}

function validateAndNormalizeSkills(skillsInput) {
  if (!skillsInput) return [];
  const skillsArray = Array.isArray(skillsInput)
    ? skillsInput
    : skillsInput.split(",").map((s) => s.trim()).filter((s) => s);

  const normalized = skillsArray
    .map(normalizeSkill)
    .filter((s) => s !== null);

  return [...new Set(normalized)];
}

function searchSkills(query) {
  if (!query || typeof query !== "string") return [];
  const q = query.toLowerCase().trim();
  if (!q) return COMMON_SKILLS.map((s) => s.name);

  return COMMON_SKILLS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.aliases.some((a) => a.includes(q))
  ).map((s) => s.name);
}

function getAllSkills() {
  return COMMON_SKILLS.map((s) => s.name);
}

module.exports = {
  COMMON_SKILLS,
  SKILL_NAMES,
  normalizeSkill,
  validateAndNormalizeSkills,
  searchSkills,
  getAllSkills,
};
