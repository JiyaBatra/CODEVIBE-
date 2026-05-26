import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

// Maps display course name → lesson-ID prefix
const getCoursePrefix = (courseName) => {
  const key = (courseName || "").toLowerCase();

  const map = {
    javascript: "js-",
    "react.js": "react-",
    "node.js": "node-",
    oop: "oop-",
    mongodb: "mongo-",
    "express.js": "express-",
    dbms: "dbms-",
    dsa: "dsa-",
    html: "html-",
    css: "css-",
  };

  return map[key] || `${key}-`;
};

export default function ViewReport() {
  const { email } = useParams();
  const [search] = useSearchParams();

  const course = search.get("course");

  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    axios
      .get(`${API_BASE_URL}/api/progress/${email}`)
      .then((res) => setProgress(res.data))
      .catch((err) =>
        console.error("Error fetching progress:", err)
      )
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) {
    return (
      <div className="vr-loading">
        Loading report...
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="vr-loading">
        No report found for {email}
      </div>
    );
  }

  // Course score calculation
  const coursePrefix = course
    ? getCoursePrefix(course)
    : "";

  const lessonScores = Object.entries(
    progress.scores || {}
  )
    .filter(([lessonId]) =>
      coursePrefix &&
      lessonId
        .toLowerCase()
        .startsWith(coursePrefix)
    )
    .map(([, val]) => val);

  const avgCourseScore = lessonScores.length
    ? Math.round(
        lessonScores.reduce((a, b) => a + b, 0) /
          lessonScores.length
      )
    : "—";

  return (
    <div className="vr-wrapper">

      <div className="vr-card">

        <h1 className="vr-title">
          📊 {course} Progress Report
        </h1>

        <div className="vr-email">
          <strong>Email:</strong> {progress.email}
        </div>

        <div className="vr-stats">

          <div className="vr-stat-box">
            <span className="vr-label">
              Completed Lessons
            </span>

            <span className="vr-value">
              {progress.completedLessons.length}
            </span>
          </div>

          <div className="vr-stat-box">
            <span className="vr-label">
              Course Score
            </span>

            <span className="vr-value">
              {avgCourseScore}%
            </span>
          </div>

        </div>

        {/* Completed Lessons */}
        <div className="vr-section">

          <h2>Completed Lessons</h2>

          <div className="vr-lessons">

            {progress.completedLessons.length === 0 ? (
              <p className="vr-empty">
                No lessons completed yet.
              </p>
            ) : (
              progress.completedLessons.map((lesson) => (
                <div
                  key={lesson}
                  className="vr-lesson-card"
                >

                  <span>{lesson}</span>

                  <span className="vr-score">
                    {progress.scores[lesson] ?? "-"}%
                  </span>

                </div>
              ))
            )}

          </div>

        </div>

        {/* All Scores */}
        <div className="vr-section">

          <h2>All Scores</h2>

          <div className="vr-lessons">

            {Object.entries(progress.scores || {})
              .length === 0 ? (
              <p className="vr-empty">
                No scores available yet.
              </p>
            ) : (
              Object.entries(progress.scores || {}).map(
                ([k, v]) => (
                  <div
                    key={k}
                    className="vr-lesson-card"
                  >

                    <span>{k}</span>

                    <span className="vr-score">
                      {v}%
                    </span>

                  </div>
                )
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}