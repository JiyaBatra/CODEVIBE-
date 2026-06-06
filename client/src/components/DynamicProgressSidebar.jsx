import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { NavLink, useLocation } from "react-router-dom";
import { lessonGroups } from "../config/lessonRoutes";
import "./DynamicProgressSidebar.css";

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
        group.lessons.some((lesson) => lesson.path.toLowerCase() === location.pathname.toLowerCase())
      ),
    [location.pathname]
  );

  const fetchProgress = useCallback(() => {
    if (!activeGroup) return;

    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("authToken");
    if (!email || !token) return;

    axios
      .get(`${API_BASE_URL}/api/progress/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProgress((current) => mergeProgress(current, res.data)))
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
      window.removeEventListener("codevibe-progress-updated", handleProgressUpdated);
    };
  }, [fetchProgress, handleProgressUpdated, location.pathname]);

  useEffect(() => {
    if (!activeGroup) return undefined;

    const layoutRoot = document.getElementById("root") || document.body;
    
    layoutRoot.classList.add("codevibe-layout-managed");
    layoutRoot.classList.toggle("codevibe-layout-sidebar-collapsed", isCollapsed);

    return () => {
      layoutRoot.classList.remove("codevibe-layout-managed", "codevibe-layout-sidebar-collapsed");
    };
  }, [activeGroup, isCollapsed]);

  if (!activeGroup) return null;

  const completedLessons = progress?.completedLessons || [];
  const scores = getProgressScores(progress?.scores);
  const completedCount = activeGroup.lessons.filter((lesson) =>
    completedLessons.includes(lesson.lessonId)
  ).length;
  const completionPercent = Math.round((completedCount / activeGroup.lessons.length) * 100);
  const courseScores = activeGroup.lessons
    .map((lesson) => scores[lesson.lessonId])
    .filter((score) => typeof score === "number");
  const averageScore = courseScores.length
    ? Math.round(courseScores.reduce((total, score) => total + score, 0) / courseScores.length)
    : 0;
  const totalPoints = courseScores.reduce((total, score) => total + score, 0);
  const toggleSidebar = () => {
  setIsCollapsed((current) => !current);
};
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
          onClick={toggleSidebar}
          aria-label="Expand progress sidebar"
          aria-expanded={!isCollapsed}
        >
          {">"}
        </button>
      )}

      {!isCollapsed && (
        <>
          <div className="dynamic-progress-sidebar__header">
            <div className="dynamic-progress-sidebar__header-text-container">
              <span>Course</span>
              <h2>{activeGroup.course}</h2>
            </div>
            <button
              className="dynamic-progress-sidebar__toggle"
              type="button"
              onClick={toggleSidebar}
              aria-label="Collapse progress sidebar"
              aria-expanded={!isCollapsed}
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