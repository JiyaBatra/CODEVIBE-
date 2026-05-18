import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import "./DynamicProgressSidebar.css";

const lessonGroups = [
  {
    course: "HTML",
    key: "html",
    lessons: Array.from({ length: 10 }, (_, index) => ({
      title: `HTML Lesson ${index + 1}`,
      path: `/HtmlLesson${index + 1}`,
      lessonId: `html-lesson${index + 1}`,
    })),
  },
  {
    course: "CSS",
    key: "css",
    lessons: Array.from({ length: 14 }, (_, index) => ({
      title: `CSS Lesson ${index + 1}`,
      path: `/CssLesson${index + 1}`,
      lessonId: `css-lesson${index + 1}`,
    })),
  },
  {
    course: "JavaScript",
    key: "js",
    lessons: Array.from({ length: 29 }, (_, index) => ({
      title: `JS Lesson ${index + 1}`,
      path: `/JsLesson${index + 1}`,
      lessonId: `js-lesson-${index + 1}`,
    })),
  },
  {
    course: "C Programming",
    key: "c",
    lessons: Array.from({ length: 17 }, (_, index) => ({
      title: `C Lesson ${index + 1}`,
      path: `/CLesson${index + 1}`,
      lessonId: `c-lesson-${index + 1}`,
    })),
  },
  {
    course: "DBMS",
    key: "dbms",
    lessons: Array.from({ length: 12 }, (_, index) => ({
      title: `DBMS Lesson ${index + 1}`,
      path: `/DbmsLesson${index + 1}`,
      lessonId: `dbms-lesson-${index + 1}`,
    })),
  },
  {
    course: "DSA",
    key: "dsa",
    lessons: Array.from({ length: 12 }, (_, index) => ({
      title: `DSA Lesson ${index + 1}`,
      path: `/DsaLesson${index + 1}`,
      lessonId: `dsa-lesson-${index + 1}`,
    })),
  },
  {
    course: "Express",
    key: "express",
    lessons: Array.from({ length: 10 }, (_, index) => ({
      title: `Express Lesson ${index + 1}`,
      path: `/ExpressLesson${index + 1}`,
      lessonId: `express-lesson-${index + 1}`,
    })),
  },
  {
    course: "MongoDB",
    key: "mongo",
    lessons: Array.from({ length: 8 }, (_, index) => ({
      title: `MongoDB Lesson ${index + 1}`,
      path: `/MongoLesson${index + 1}`,
      lessonId: `mongo-lesson-${index + 1}`,
    })),
  },
  {
    course: "Node.js",
    key: "node",
    lessons: Array.from({ length: 12 }, (_, index) => ({
      title: `Node Lesson ${index + 1}`,
      path: `/NodeLesson${index + 1}`,
      lessonId: `node-lesson-${index + 1}`,
    })),
  },
  {
    course: "OOP",
    key: "oop",
    lessons: Array.from({ length: 14 }, (_, index) => ({
      title: `OOP Lesson ${index + 1}`,
      path: `/OOPLesson${index + 1}`,
      lessonId: `oop-lesson-${index + 1}`,
    })),
  },
  {
    course: "React",
    key: "react",
    lessons: Array.from({ length: 13 }, (_, index) => ({
      title: `React Lesson ${index + 1}`,
      path: `/ReactLesson${index + 1}`,
      lessonId: `react-lesson-${index + 1}`,
    })),
  },
];

const getProgressScores = (scores) => {
  if (!scores) return {};
  return scores instanceof Map ? Object.fromEntries(scores) : scores;
};

const mergeProgress = (current, next) => {
  const currentLessons = current?.completedLessons || [];
  const nextLessons = next?.completedLessons || [];

  return {
    ...current,
    ...next,
    completedLessons: Array.from(new Set([...currentLessons, ...nextLessons])),
    scores: {
      ...getProgressScores(current?.scores),
      ...getProgressScores(next?.scores),
    },
  };
};

const DynamicProgressSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [progress, setProgress] = useState(null);

  const activeGroup = useMemo(
    () =>
      lessonGroups.find((group) =>
        group.lessons.some((lesson) => lesson.path === location.pathname)
      ),
    [location.pathname]
  );

  const fetchProgress = useCallback(() => {
    if (!activeGroup) return;

    const email = localStorage.getItem("userEmail");
    if (!email) {
      return;
    }

    axios
      .get(`http://localhost:5002/api/progress/${email}`)
      .then((res) =>
        setProgress((current) => mergeProgress(current, res.data))
      )
      .catch(() => {});
  }, [activeGroup]);

  const handleProgressUpdated = useCallback(
    (event) => {
      const { lessonId, score } = event.detail || {};

      if (!lessonId || !activeGroup?.lessons.some((lesson) => lesson.lessonId === lessonId)) {
        return;
      }

      setProgress((current) => {
        const completedLessons = current?.completedLessons || [];
        const scores = getProgressScores(current?.scores);

        return {
          ...current,
          completedLessons: completedLessons.includes(lessonId)
            ? completedLessons
            : [...completedLessons, lessonId],
          scores: {
            ...scores,
            [lessonId]: score || 0,
          },
        };
      });

      if (localStorage.getItem("userEmail")) {
        fetchProgress();
      }
    },
    [activeGroup, fetchProgress]
  );

  useEffect(() => {
    fetchProgress();

    window.addEventListener("codevibe-progress-updated", handleProgressUpdated);

    return () => {
      window.removeEventListener(
        "codevibe-progress-updated",
        handleProgressUpdated
      );
    };
  }, [fetchProgress, handleProgressUpdated, location.pathname]);

  useEffect(() => {
    if (!activeGroup) return undefined;

    document.body.classList.add("dynamic-progress-sidebar-visible");
    document.body.classList.toggle(
      "dynamic-progress-sidebar-collapsed",
      isCollapsed
    );

    return () => {
      document.body.classList.remove(
        "dynamic-progress-sidebar-visible",
        "dynamic-progress-sidebar-collapsed"
      );
    };
  }, [activeGroup, isCollapsed]);

  if (!activeGroup) return null;

  const completedLessons = progress?.completedLessons || [];
  const scores = getProgressScores(progress?.scores);
  const completedCount = activeGroup.lessons.filter((lesson) =>
    completedLessons.includes(lesson.lessonId)
  ).length;
  const completionPercent = Math.round(
    (completedCount / activeGroup.lessons.length) * 100
  );
  const courseScores = activeGroup.lessons
    .map((lesson) => scores[lesson.lessonId])
    .filter((score) => typeof score === "number");
  const averageScore = courseScores.length
    ? Math.round(
        courseScores.reduce((total, score) => total + score, 0) /
          courseScores.length
      )
    : 0;
  const totalPoints = courseScores.reduce((total, score) => total + score, 0);

  return (
    <aside
      className={`dynamic-progress-sidebar ${
        isCollapsed ? "dynamic-progress-sidebar--collapsed" : ""
      }`}
    >
      {isCollapsed && (
        <button
          className="dynamic-progress-sidebar__toggle"
          type="button"
          onClick={() => setIsCollapsed((current) => !current)}
          aria-label="Expand progress sidebar"
        >
          {">"}
        </button>
      )}

      {!isCollapsed && (
        <>
          <div className="dynamic-progress-sidebar__header">
            <span>Course</span>
            <h2>{activeGroup.course}</h2>
            <button
              className="dynamic-progress-sidebar__toggle"
              type="button"
              onClick={() => setIsCollapsed((current) => !current)}
              aria-label="Collapse progress sidebar"
            >
              {"<"}
            </button>
          </div>

          <div className="dynamic-progress-sidebar__analytics">
            <div
              className="dynamic-progress-sidebar__ring"
              style={{
                background: `conic-gradient(#ff4d6d ${completionPercent * 3.6}deg, #26233a 0deg)`,
              }}
            >
              <div>
                <strong>{completionPercent}%</strong>
                <span>Done</span>
              </div>
            </div>

            <div className="dynamic-progress-sidebar__metrics">
              <p>
                <span>Average</span>
                <strong>{averageScore}%</strong>
              </p>
              <p>
                <span>Points</span>
                <strong>{totalPoints}</strong>
              </p>
              <p>
                <span>Completed</span>
                <strong>
                  {completedCount}/{activeGroup.lessons.length}
                </strong>
              </p>
            </div>
          </div>

          <nav className="dynamic-progress-sidebar__nav" aria-label="Lesson progress">
            {activeGroup.lessons.map((lesson, index) => (
              <NavLink
                className={({ isActive }) =>
                  `dynamic-progress-sidebar__link ${
                    isActive ? "dynamic-progress-sidebar__link--active" : ""
                  }`
                }
                key={lesson.path}
                to={lesson.path}
              >
                <span>{index + 1}</span>
                <em>{lesson.title}</em>
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
};

export default DynamicProgressSidebar;
