// My Mistakes Dashboard Widget
import React from "react";
import { AlertCircle, BookOpen, Loader } from "lucide-react";
import { useMistakes } from "../hooks/useMistakes";
import "./MyMistakesDashboard.css";

const MyMistakesDashboard = () => {
  const { mistakes, loading, error } = useMistakes();

  // Loading state
  if (loading) {
    return (
      <section className="mistakes-dashboard glass-card">
        <div className="mistakes-header">
          <h2>⚠️ My Mistakes</h2>
        </div>
        <div className="mistakes-loading">
          <Loader className="loading-spinner" size={32} />
          <p>Loading your mistakes...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="mistakes-dashboard glass-card mistakes-error">
        <div className="mistakes-header">
          <h2>⚠️ My Mistakes</h2>
        </div>
        <div className="mistakes-message">
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (!mistakes || mistakes.length === 0) {
    return (
      <section className="mistakes-dashboard glass-card mistakes-empty">
        <div className="mistakes-header">
          <h2>⚠️ My Mistakes</h2>
          <span className="header-subtitle">Track your coding errors</span>
        </div>
        <div className="mistakes-message">
          <AlertCircle size={24} />
          <p>No mistakes tracked yet!</p>
          <small>Start solving lessons to track common errors.</small>
        </div>
      </section>
    );
  }

  return (
    <section className="mistakes-dashboard glass-card">
      <div className="mistakes-header">
        <h2>⚠️ My Mistakes</h2>
        <span className="header-subtitle">Most common errors in your code</span>
      </div>

      <div className="mistakes-list">
        {mistakes.map((mistake, index) => (
          <article key={index} className="mistake-card">
            <div className="mistake-content">
              <div className="mistake-name">
                <span className="mistake-icon">❌</span>
                <h3>{mistake.name}</h3>
              </div>

              <div className="mistake-stats">
                <div className="mistake-count">
                  <span className="count-number">{mistake.count}</span>
                  <span className="count-label">
                    occurrence{mistake.count !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="mistake-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(
                          100,
                          (mistake.count / (mistakes[0]?.count || 10)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mistake-suggestion">
                <BookOpen size={16} />
                <span>📚 Review: {mistake.suggestedLesson}</span>
              </div>
            </div>

            <div className="mistake-severity">
              {mistake.count >= 10 && (
                <span className="severity-badge severity-high">🔴 High</span>
              )}
              {mistake.count >= 5 && mistake.count < 10 && (
                <span className="severity-badge severity-medium">🟡 Medium</span>
              )}
              {mistake.count < 5 && (
                <span className="severity-badge severity-low">🟢 Low</span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mistakes-footer">
        <small>💡 Tip: Review suggested lessons to improve these weak areas</small>
      </div>
    </section>
  );
};

export default MyMistakesDashboard;
