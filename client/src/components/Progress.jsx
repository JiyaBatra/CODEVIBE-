// src/components/Progress.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config/api.js";

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
      .get(apiUrl(`/api/progress/${email}`))
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
    return <p className="text-pink-400 text-center">Loading your progress...</p>;
  }

  if (!progress) {
    return <p className="text-red-400 text-center">No progress found. Start learning today!</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 p-6 rounded-2xl shadow-lg w-[400px] text-center">
        <h2 className="text-2xl font-bold text-white mb-4">📖 Your Progress</h2>
        <p className="text-lg text-pink-200 mb-2">
          Lessons Completed: <span className="font-bold text-white">{progress.completedLessons}</span>
        </p>
        <p className="text-lg text-pink-200">
          Total Lessons: <span className="font-bold text-white">{progress.totalLessons}</span>
        </p>

        <div className="w-full bg-pink-200 rounded-full h-4 mt-4">
          <div
            className="bg-purple-900 h-4 rounded-full"
            style={{
              width: `${(progress.completedLessons / progress.totalLessons) * 100}%`,
            }}
          ></div>
        </div>

        <p className="mt-3 text-pink-100 italic">
          Keep going, you're doing amazing! 🚀
        </p>
      </div>
    </div>
  );
};

export default Progress;
