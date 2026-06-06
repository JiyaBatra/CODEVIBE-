/**
 * Central lesson route metadata for navigation and progress UI.
 */

export const lessonGroups = [
  {
    course: "HTML",
    key: "html",
    modulePath: "/HtmlLesson",
    lessons: Array.from({ length: 10 }, (_, index) => ({
      title: `HTML Lesson ${index + 1}`,
      path: `/HtmlLesson${index + 1}`,
      lessonId: `html-lesson-${index + 1}`,
    })),
  },
  {
    course: "CSS",
    key: "css",
    modulePath: "/CssLesson",
    lessons: Array.from({ length: 14 }, (_, index) => ({
      title: `CSS Lesson ${index + 1}`,
      path: `/CssLesson${index + 1}`,
      lessonId: `css-lesson${index + 1}`,
    })),
  },
  {
    course: "JavaScript",
    key: "js",
    modulePath: "/JsLesson",
    lessons: Array.from({ length: 29 }, (_, index) => ({
      title: `JS Lesson ${index + 1}`,
      path: `/JsLesson${index + 1}`,
      lessonId: `js-lesson-${index + 1}`,
    })),
  },
  {
    course: "C Programming",
    key: "c",
    modulePath: "/CLesson",
    lessons: Array.from({ length: 17 }, (_, index) => ({
      title: `C Lesson ${index + 1}`,
      path: `/CLesson${index + 1}`,
      lessonId: `c-lesson-${index + 1}`,
    })),
  },
  {
    course: "DBMS",
    key: "dbms",
    modulePath: "/DbmsLesson",
    lessons: Array.from({ length: 12 }, (_, index) => ({
      title: `DBMS Lesson ${index + 1}`,
      path: `/DbmsLesson${index + 1}`,
      lessonId: `dbms-lesson-${index + 1}`,
    })),
  },
  {
    course: "DSA",
    key: "dsa",
    modulePath: "/DsaLesson",
    lessons: Array.from({ length: 12 }, (_, index) => ({
      title: `DSA Lesson ${index + 1}`,
      path: `/DsaLesson${index + 1}`,
      lessonId: `dsa-lesson-${index + 1}`,
    })),
  },
  {
    course: "Express",
    key: "express",
    modulePath: "/ExpressLesson",
    lessons: Array.from({ length: 10 }, (_, index) => ({
      title: `Express Lesson ${index + 1}`,
      path: `/ExpressLesson${index + 1}`,
      lessonId: `express-lesson-${index + 1}`,
    })),
  },
  {
    course: "MongoDB",
    key: "mongo",
    modulePath: "/MongoLesson",
    lessons: Array.from({ length: 8 }, (_, index) => ({
      title: `MongoDB Lesson ${index + 1}`,
      path: `/MongoLesson${index + 1}`,
      lessonId: `mongo-lesson-${index + 1}`,
    })),
  },
  {
    course: "Node.js",
    key: "node",
    modulePath: "/NodeLesson",
    lessons: Array.from({ length: 12 }, (_, index) => ({
      title: `Node Lesson ${index + 1}`,
      path: `/NodeLesson${index + 1}`,
      lessonId: `node-lesson-${index + 1}`,
    })),
  },
  {
    course: "OOP",
    key: "oop",
    modulePath: "/OOPLesson",
    lessons: Array.from({ length: 14 }, (_, index) => ({
      title: `OOP Lesson ${index + 1}`,
      path: `/OOPLesson${index + 1}`,
      lessonId: `oop-lesson-${index + 1}`,
    })),
  },
  {
    course: "React",
    key: "react",
    modulePath: "/ReactLesson",
    lessons: Array.from({ length: 13 }, (_, index) => ({
      title: `React Lesson ${index + 1}`,
      path: `/ReactLesson${index + 1}`,
      lessonId: `react-lesson-${index + 1}`,
    })),
  },
];

const modulePaths = new Set(lessonGroups.map((group) => group.modulePath));

const lessonPathMap = new Map(
  lessonGroups.flatMap((group) =>
    group.lessons.map((lesson) => [lesson.path, group])
  )
);

/**
 * Resolve back navigation for lesson and module overview routes.
 * Uses explicit route metadata so direct URL access always has a valid target.
 */
export function getLessonBackNavigation(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";

  const lessonGroup = lessonPathMap.get(path);
  if (lessonGroup) {
    return {
      to: lessonGroup.modulePath,
      label: `Back to ${lessonGroup.course}`,
      variant: "lesson",
    };
  }

  if (modulePaths.has(path)) {
    return {
      to: "/lessons",
      label: "Back to Courses",
      variant: "module",
    };
  }

  return null;
}

export function findLessonGroupByPath(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  return (
    lessonPathMap.get(path) ||
    lessonGroups.find((group) => group.modulePath === path) ||
    null
  );
}
