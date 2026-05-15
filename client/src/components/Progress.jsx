// src/components/Progress.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../config";

const Progress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail"); // user email stored after login
    if (!email) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE}/api/progress/${email}`)
      .then((res) => {
        setProgress(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ color: "#f472b6", textAlign: "center" }}>Loading your progress...</p>;
  }

  if (!progress) {
    return <p style={{ color: "#f87171", textAlign: "center" }}>No progress found. Start learning today!</p>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#000" }}>
      <div style={{ background: "linear-gradient(to right, #7e22ce, #db2777, #7e22ce)", padding: "24px", borderRadius: "16px", boxShadow: "0 10px 15px rgba(0,0,0,0.3)", width: "400px", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", marginBottom: "16px" }}>📖 Your Progress</h2>
        <p style={{ fontSize: "1.125rem", color: "#fbcfe8", marginBottom: "8px" }}>
          Lessons Completed: <span style={{ fontWeight: "bold", color: "#fff" }}>{progress.completedLessons?.length ?? 0}</span>
        </p>
        <p style={{ fontSize: "1.125rem", color: "#fbcfe8" }}>
          Total Lessons: <span style={{ fontWeight: "bold", color: "#fff" }}>{progress.totalLessons ?? "—"}</span>
        </p>

        {progress.totalLessons > 0 && (
          <div style={{ width: "100%", background: "#fbcfe8", borderRadius: "9999px", height: "16px", marginTop: "16px" }}>
            <div
              style={{
                background: "#581c87",
                height: "16px",
                borderRadius: "9999px",
                width: `${((progress.completedLessons?.length ?? 0) / progress.totalLessons) * 100}%`,
              }}
            ></div>
          </div>
        )}

        <p style={{ marginTop: "12px", color: "#fce7f3", fontStyle: "italic" }}>
          Keep going, you're doing amazing! 🚀
        </p>
      </div>
    </div>
  );
};

export default Progress;
