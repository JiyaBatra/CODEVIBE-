import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import API_BASE_URL from "../config/api";
import { ALL_POSSIBLE_BADGES, CATEGORIES } from "../config/badges";
import "./BadgesPage.css";

const BadgesPage = () => {
  const { user } = useAuth();
  const [earned, setEarned] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const fetchProgress = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/progress/${encodeURIComponent(user.email)}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEarned(data?.badges || []);
      } catch (err) {
        console.error("Failed to load badges:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [user?.email]);

  const isEarned = (badgeId) => earned.includes(badgeId);

  return (
    <div className="badges-page">
      <div className="badges-page-header">
        <h1 className="badges-page-title">Achievements</h1>
        <p className="badges-page-subtitle">
          {earned.length} / {ALL_POSSIBLE_BADGES.length} badges earned
        </p>
      </div>

      {loading ? (
        <div className="badges-page-loading">Loading achievements...</div>
      ) : (
        <div className="badges-page-grid">
          {CATEGORIES.map((cat) => {
            const categoryBadges = ALL_POSSIBLE_BADGES.filter((b) => b.category === cat.key);
            if (categoryBadges.length === 0) return null;
            return (
              <div key={cat.key} className="badges-category-section">
                <h2 className="badges-category-title">{cat.label}</h2>
                <div className="badges-category-grid">
                  {categoryBadges.map((badge) => {
                    const earned_b = isEarned(badge.id);
                    return (
                      <div
                        key={badge.id}
                        className={`badge-card ${earned_b ? "badge-card--earned" : "badge-card--locked"}`}
                        title={badge.desc}
                      >
                        <span className="badge-card-icon">{badge.icon}</span>
                        <span className="badge-card-label">{badge.label}</span>
                        <span className="badge-card-desc">{badge.desc}</span>
                        {earned_b ? (
                          <span className="badge-card-status">Earned</span>
                        ) : (
                          <span className="badge-card-status badge-card-status--locked">Locked</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BadgesPage;
