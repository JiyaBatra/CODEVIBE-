import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import API_BASE_URL from "../config/api";
import "./WeeklyReport.css";

const TrendingUp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const TrendingDown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>;

const DeltaBadge = ({ value, suffix = "" }) => {
  if (value === 0) return <span className="wr-delta wr-delta--neutral">0{suffix}</span>;
  const isUp = value > 0;
  return (
    <span className={`wr-delta ${isUp ? "wr-delta--up" : "wr-delta--down"}`}>
      {isUp ? <TrendingUp /> : <TrendingDown />}
      {isUp ? "+" : ""}{value}{suffix}
    </span>
  );
};

const WeeklyReport = () => {
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/api/report/weekly`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setReport(data);
      } catch (err) {
        console.error("Failed to load report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [user?.email]);

  const weekRange = report?.period
    ? `${new Date(report.period.weekStart).toLocaleDateString()} – ${new Date(report.period.weekEnd).toLocaleDateString()}`
    : "";

  if (loading) {
    return <div className="wr-loading">Loading your report...</div>;
  }

  if (!report || !report.stats) {
    return (
      <div className="wr-page">
        <div className="wr-empty">
          <h1 className="wr-title">Your Weekly Report</h1>
          <p className="wr-empty-msg">Not enough data for a report yet. Complete some lessons this week to see your progress!</p>
        </div>
      </div>
    );
  }

  const s = report.stats;

  return (
    <div className="wr-page">
      <div className="wr-header">
        <h1 className="wr-title">Your Weekly Report</h1>
        <p className="wr-subtitle">{weekRange}</p>
      </div>

      <div className="wr-grid">
        <div className="wr-card">
          <div className="wr-card-label">Lessons Completed</div>
          <div className="wr-card-value">{s.lessonsCompleted}</div>
          <DeltaBadge value={s.lessonsDelta} suffix="" />
        </div>

        <div className="wr-card">
          <div className="wr-card-label">XP Earned</div>
          <div className="wr-card-value">{s.xpEarned}</div>
          <DeltaBadge value={s.xpDelta} suffix=" XP" />
        </div>

        <div className="wr-card">
          <div className="wr-card-label">Time Spent</div>
          <div className="wr-card-value">{Math.round(s.timeSpent / 60)} min</div>
          <DeltaBadge value={Math.round(s.timeDelta / 60)} suffix=" min" />
        </div>

        <div className="wr-card">
          <div className="wr-card-label">Current Streak</div>
          <div className="wr-card-value">{s.currentStreak} days</div>
          <div className="wr-sub-meta">Longest: {s.longestStreak} days</div>
        </div>

        <div className="wr-card wr-card--wide">
          <div className="wr-card-label">Overall Progress</div>
          <div className="wr-multi-stats">
            <div className="wr-multi-item">
              <span className="wr-multi-value">{s.totalXp}</span>
              <span className="wr-multi-label">Total XP</span>
            </div>
            <div className="wr-multi-item">
              <span className="wr-multi-value">{s.level}</span>
              <span className="wr-multi-label">Level</span>
            </div>
            <div className="wr-multi-item">
              <span className="wr-multi-value">{s.totalLessons}</span>
              <span className="wr-multi-label">Lessons</span>
            </div>
            <div className="wr-multi-item">
              <span className="wr-multi-value">{s.totalBadges}</span>
              <span className="wr-multi-label">Badges</span>
            </div>
          </div>
        </div>
      </div>

      {report.topSubject && (
        <div className="wr-insight">
          <strong>Top Subject:</strong> {report.topSubject}
        </div>
      )}

      {report.weakSubject && (
        <div className="wr-insight wr-insight--warn">
          <strong>Needs Improvement:</strong> {report.weakSubject.name} (avg {report.weakSubject.avgScore}%)
        </div>
      )}

      {report.subjects?.length > 0 && (
        <div className="wr-section">
          <h2 className="wr-section-title">Subject Breakdown</h2>
          <div className="wr-subject-list">
            {report.subjects.map((sub) => (
              <div key={sub.name} className="wr-subject-row">
                <span className="wr-subject-name">{sub.name}</span>
                <div className="wr-subject-bar-bg">
                  <div
                    className="wr-subject-bar-fill"
                    style={{ width: `${Math.min(100, sub.avgScore)}%` }}
                  />
                </div>
                <span className="wr-subject-score">{sub.avgScore}%</span>
                <span className="wr-subject-lessons">{sub.lessons} lessons</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="wr-footer">
        <p>Keep learning to unlock your full potential!</p>
      </div>
    </div>
  );
};

export default WeeklyReport;
