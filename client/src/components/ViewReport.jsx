import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ViewReport() {
  const { email } = useParams();
  const [search] = useSearchParams();
  const course = search.get("course");
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const reportName =
    storedUser?.username ||
    progress?.username ||
    (email?.includes("@") ? email.split("@")[0] : email);

  useEffect(() => {
    if (!email) return;
    axios
      .get(`http://localhost:5002/api/progress/${email}`)
      .then((res) => setProgress(res.data))
      .catch((err) => console.error("Error fetching progress:", err))
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <div>Loading report...</div>;
  if (!progress) return <div>No report found for {email}</div>;

  const coursePrefixMap = {
    html: "html-lesson",
    css: "css-lesson-",
    javascript: "js-lesson-",
    oop: "oop-lesson-",
    dsa: "dsa-lesson-",
    dbms: "dbms-lesson-",
    mongodb: "mongo-lesson-",
    "node.js": "node-lesson-",
    "express.js": "express-lesson-",
    "react.js": "react-lesson-",
  };
  const selectedPrefix = coursePrefixMap[(course || "").toLowerCase()] || "";

  const filteredScoreEntries = Object.entries(progress.scores || {}).filter(
    ([lessonId]) =>
      !selectedPrefix || lessonId.toLowerCase().startsWith(selectedPrefix)
  );
  const filteredScores = Object.fromEntries(filteredScoreEntries);
  const filteredCompletedLessons = (progress.completedLessons || []).filter(
    (lessonId) =>
      !selectedPrefix || lessonId.toLowerCase().startsWith(selectedPrefix)
  );

  const lessonScores = filteredScoreEntries.map(([_, val]) => val);

  const avgCourseScore = lessonScores.length
    ? Math.round(
        lessonScores.reduce((a, b) => a + b, 0) / lessonScores.length
      )
    : "—";

  return (
    <div style={{ padding: "32px", color: "white" }}>
      <h2>Progress Report for {reportName}</h2>
      <p><strong>Email:</strong> {progress.email}</p>
      <p>
        <strong>Completed Lessons ({filteredCompletedLessons.length}):</strong>
      </p>
      <ul>
        {filteredCompletedLessons.map((lesson) => (
          <li key={lesson}>
            {lesson}: {filteredScores[lesson] ?? "-"}%
          </li>
        ))}
      </ul>
      <p>
        <strong>{course} Overall Score:</strong> {avgCourseScore}%
      </p>
      <h4>{course} Scores:</h4>
      <ul>
        {filteredScoreEntries.map(([k, v]) => (
          <li key={k}>
            {k}: {v}%
          </li>
        ))}
      </ul>
    </div>
  );
}
