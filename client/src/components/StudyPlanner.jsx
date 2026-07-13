import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthProvider.jsx";
import API_BASE_URL from "../config/api";
import { Flame, Target, TrendingUp, AlertCircle } from "lucide-react";
import "./StudyPlanner.css";

const StudyPlanner = () => {
  const { user, token } = useAuth();
  const [progress, setProgress] = useState(null);
  const [dailyGoal, setDailyGoal] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !user?.email) return;
    axios
      .get(`${API_BASE_URL}/api/progress/${encodeURIComponent(user.email)}`, {
        
      })
      .then(({ data }) => {
        setProgress(data);
        setDailyGoal(data.dailyGoal || 1);
      })
      .catch((err) => {
        console.error("Failed to fetch progress:", err);
        setError("Failed to load your study data.");
      });
  }, [token, user?.email]);

  const handleGoalUpdate = async () => {
    if (!token) return;
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await axios.put(
        `${API_BASE_URL}/api/progress/goal`,
        { dailyGoal },
        { }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to update goal:", err);
      setError("Failed to save goal. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const todayCompleted = progress?.completedLessons?.length || 0;
  const goalProgress = dailyGoal > 0 ? Math.min((todayCompleted / dailyGoal) * 100, 100) : 0;

  return (
    <div className="study-planner-container">
      <div className="study-planner-card">
        <h1 className="study-planner-title">
          <Target className="study-planner-icon" />
          Study Planner
        </h1>

        {error && (
          <div className="study-planner-error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="study-planner-stats">
          <div className="stat-card streak-card">
            <Flame className="stat-icon streak-icon" />
            <div className="stat-info">
              <span className="stat-label">Current Streak</span>
              <span className="stat-value">{progress?.currentStreak || 0} days</span>
            </div>
          </div>

          <div className="stat-card streak-card">
            <TrendingUp className="stat-icon best-icon" />
            <div className="stat-info">
              <span className="stat-label">Longest Streak</span>
              <span className="stat-value">{progress?.longestStreak || 0} days</span>
            </div>
          </div>

          <div className="stat-card goal-card">
            <Target className="stat-icon goal-icon" />
            <div className="stat-info">
              <span className="stat-label">Today's Progress</span>
              <span className="stat-value">{todayCompleted} / {dailyGoal} lessons</span>
            </div>
          </div>
        </div>

        <div className="goal-progress-bar">
          <div className="goal-progress-fill" style={{ width: `${goalProgress}%` }} />
        </div>

        <div className="goal-section">
          <h2 className="goal-section-title">
            <Target size={18} />
            Daily Learning Goal
          </h2>
          <p className="goal-description">
            Set how many lessons you want to complete each day (1-10)
          </p>
          <div className="goal-controls">
            <div className="goal-slider-container">
              <span className="goal-range-label">1</span>
              <input
                type="range"
                min="1"
                max="10"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="goal-slider"
              />
              <span className="goal-range-label">10</span>
            </div>
            <span className="goal-display">{dailyGoal} lessons/day</span>
          </div>
          <button
            onClick={handleGoalUpdate}
            disabled={saving}
            className={`goal-save-btn ${saved ? "saved" : ""}`}
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save Goal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
