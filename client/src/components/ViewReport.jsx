import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../config/api.js";

export default function ViewReport() {
  const { email } = useParams();
  const [search] = useSearchParams();
  const course = search.get("course");
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    axios
      .get(apiUrl(`/api/progress/${email}`))
      .then((res) => setProgress(res.data))
      .catch((err) => console.error("Error fetching progress:", err))
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <div>Loading report...</div>;
  if (!progress) return <div>No report found for {email}</div>;

  // Calculate avg score for selected course
  const lessonScores = Object.entries(progress.scores || {})
    .filter(([lessonId]) =>
      lessonId.toLowerCase().startsWith(course?.toLowerCase() || "")
    )
    .map(([_, val]) => val);

  const avgCourseScore = lessonScores.length
    ? Math.round(
        lessonScores.reduce((a, b) => a + b, 0) / lessonScores.length
      )
    : "—";

  return (
    <div style={{ padding: "32px", color: "white" }}>
      <h2>Progress Report for {email}</h2>
      <p><strong>Email:</strong> {progress.email}</p>
      <p>
        <strong>Completed Lessons ({progress.completedLessons.length}):</strong>
      </p>
      <ul>
        {progress.completedLessons.map((lesson) => (
          <li key={lesson}>
            {lesson}: {progress.scores[lesson] ?? "-"}%
          </li>
        ))}
      </ul>
      <p>
        <strong>{course} Overall Score:</strong> {avgCourseScore}%
      </p>
      <h4>All Scores:</h4>
      <ul>
        {Object.entries(progress.scores || {}).map(([k, v]) => (
          <li key={k}>
            {k}: {v}%
          </li>
        ))}
      </ul>
    </div>
  );
}
