import { lessonGroups } from "../config/lessonRoutes";

const courseLessonMap = Object.fromEntries(
  lessonGroups.map((group) => [group.modulePath, group.lessons.map((lesson) => lesson.lessonId)]),
);

const MODULE_PATH_ALIASES = {
  "/OopLesson": "/OOPLesson",
};

export function getCourseLessonIds(modulePath) {
  const normalizedPath = MODULE_PATH_ALIASES[modulePath] || modulePath;
  return courseLessonMap[normalizedPath] || [];
}

export function isCourseCompleted(completedLessons, modulePath) {
  const lessonIds = getCourseLessonIds(modulePath);
  if (!lessonIds.length) return false;
  return lessonIds.every((lessonId) => completedLessons.includes(lessonId));
}
