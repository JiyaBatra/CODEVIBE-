import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaSignOutAlt, FaDownload, FaFire, FaMedal,
  FaChartLine, FaArrowRight, FaPlay, FaUser,
  FaGraduationCap, FaStar, FaTimes, FaLock, FaSpinner
} from "react-icons/fa";
import { useAuth } from "../AuthProvider.jsx";
import API_BASE_URL from "../config/api.js";

// ── Constants ──────────────────────────────────────────────
const COURSES = ["HTML", "CSS","C", "JavaScript", "OOP", "DSA", "DBMS", "MongoDB", "Node.js", "Express.js", "React.js"];
const COURSE_LESSONS = {
  HTML: 12, CSS: 14, C: 17, JavaScript: 20, OOP: 10,
  DSA: 18, DBMS: 12, MongoDB: 10, "Node.js": 14,
  "Express.js": 10, "React.js": 16,
};
const COURSE_ICONS = {
  HTML: "🌐",C: "💻", CSS: "🎨", JavaScript: "⚡", OOP: "💡",
  DSA: "🧠", DBMS: "🗄️", MongoDB: "🍃", "Node.js": "🟢",
  "Express.js": "🚂", "React.js": "⚛️",
};
const COURSE_ROUTES = {
  HTML: "/HtmlLesson",
  CSS: "/CssLesson",
  C: "/CLesson",
  JavaScript: "/JsLesson",
  OOP: "/OopLesson",
  DSA: "/DsaLesson",
  DBMS: "/DbmsLesson",
  MongoDB: "/MongoLesson",
  "Node.js": "/NodeLesson",
  "Express.js": "/ExpressLesson",
  "React.js": "/ReactLesson",
};

// ── Helpers ────────────────────────────────────────────────
function buildCourseData(completedLessons = [], scores = {}) {
  const scoresObj = scores instanceof Map
    ? Object.fromEntries(scores)
    : (scores || {});

  return COURSES.map(name => {
    const total = COURSE_LESSONS[name];
    const courseLower = name.toLowerCase().replace(/\./g, "").replace(/\s/g, "");

    const done = completedLessons.filter(l => {
      const low = l.toLowerCase().replace(/\s/g, "").replace(/\./g, "");
      return (            
        low.startsWith(courseLower + "-lesson-") ||     // "c-lesson-1"
        low.startsWith(courseLower + "-lesson") ||      // "html-lesson1"
        low.startsWith(courseLower + "_lesson")         // "html_lesson1"
      );
    }).length;

    // find score regardless of key format
    const courseScores = Object.entries(scoresObj)
  .filter(([key]) => {
    const k = key.toLowerCase().replace(/\./g, "").replace(/\s/g, "");
    return (
      k.startsWith(courseLower + "-lesson-") ||
      k.startsWith(courseLower + "-lesson") ||
      k.startsWith(courseLower + "_lesson")
    );
  })
  .map(([, val]) => val);

  const score = courseScores.length
    ? Math.round(courseScores.reduce((a, b) => a + b, 0) / courseScores.length)
    : 0;

    return { name, done, total, score };
  });
}

function deriveCertificates(courseData) {
  return courseData
    .filter(c => c.done === c.total && c.score >= 80)
    .map(c => ({ course: c.name, score: c.score, date: "2025-03-15" }));
}

function scoreColor(s) {
  if (s === 0) return "rgba(255,255,255,0.4)";
  if (s >= 80) return "#4caf50";
  if (s >= 60) return "#BA7517";
  return "#E24B4A";
}

// ── UI Primitives ──────────────────────────────────────────
function ProgressBar({ pct }) {
  return (
    <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden", marginTop: 8 }}>
      <div style={{ height: "100%", width: `${Math.min(100, pct)}%`, background: "linear-gradient(90deg,#ff113d,#ff85a1)", borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <FaSpinner style={{ color: "#ff4d6d", fontSize: 24, animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
    }} onClick={onClose}>
      <div style={{
        background: "#13152a", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20, padding: "1.5rem", width: "100%", maxWidth: 700,
        maxHeight: "82vh", overflowY: "auto",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#f0f0f0" }}>{title}</h2>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, padding: "6px 10px", color: "#a0a0b0", cursor: "pointer",
          }}><FaTimes size={13} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Certificates Modal ─────────────────────────────────────
function CertificatesView({ courseData, email }) {
  const navigate = useNavigate();
  const earned = deriveCertificates(courseData);
  const locked = courseData.filter(c => !(c.done === c.total && c.score >= 80));

  const handleDownload = (courseName) => {
  navigate(`/certificate?course=${encodeURIComponent(courseName)}&email=${encodeURIComponent(email)}`);
  };

  return (
    <div>
      {earned.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
          <FaMedal style={{ fontSize: 44, color: "rgba(255,255,255,0.1)", marginBottom: "0.7rem" }} />
          <p style={{ fontWeight: 700, fontSize: 15, color: "#f0f0f0", margin: "0 0 0.4rem" }}>No certificates yet</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>Complete all lessons and score ≥ 80%</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.2rem" }}>
          {earned.map((cert, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16, padding: "1rem 1.2rem",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{COURSE_ICONS[cert.course] || "🏅"}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#f0f0f0" }}>{cert.course}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                    Score: <span style={{ color: "#4caf50", fontWeight: 600 }}>{cert.score}%</span>
                  </p>
                </div>
              </div>
              <button onClick={() => handleDownload(cert.course)} style={{
                padding: "6px 14px", borderRadius: 8,
                background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.3)",
                color: "#ff4d6d", fontSize: 12, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <FaDownload size={10} /> Download
              </button>
            </div>
          ))}
        </div>
      )}

      {locked.length > 0 && (
        <>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" }}>
            Locked ({locked.length})
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 10 }}>
            {locked.map(c => {
              const pct = c.total > 0 ? Math.round((c.done / c.total) * 100) : 0;
              return (
                <div key={c.name} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14, padding: "0.8rem 1rem", opacity: 0.65,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <FaLock size={10} color="rgba(255,255,255,0.3)" />
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#f0f0f0" }}>{c.name}</p>
                  </div>
                  <ProgressBar pct={pct} />
                  <p style={{ margin: "5px 0 0", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{pct}% complete</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ── Scores Modal ───────────────────────────────────────────
function ScoresView({ courseData, onViewReport }) {
  const attempted = courseData.filter(c => c.done > 0);
  const avgScore = attempted.length
    ? Math.round(attempted.reduce((s, c) => s + c.score, 0) / attempted.length)
    : 0;

  return (
    <div>
      {/* Summary bar */}
      <div style={{
        background: "rgba(255,77,109,0.06)", border: "1px solid rgba(255,77,109,0.15)",
        borderRadius: 14, padding: "0.9rem 1.2rem", marginBottom: "1.2rem",
        display: "flex", gap: 24, flexWrap: "wrap",
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Courses Started</p>
          <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 800, color: "#f0f0f0" }}>{attempted.length}/{COURSES.length}</p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Completed</p>
          <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 800, color: "#4caf50" }}>
            {courseData.filter(c => c.done === c.total && c.done > 0).length}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10 }}>
        {courseData.map(c => {
          const pct = c.total > 0 ? Math.round((c.done / c.total) * 100) : 0;
          const notStarted = c.done === 0;
          const isComplete = c.done === c.total && c.done > 0;
          const statusLabel = isComplete ? "Complete" : notStarted ? "Not started" : "In progress";
          const sColor = scoreColor(c.score);

          return (
            <div key={c.name} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16, padding: "1rem 1.15rem",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{COURSE_ICONS[c.name] || "📘"}</span>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#f0f0f0" }}>{c.name}</p>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20,
                  background: `${sColor}22`, color: sColor,
                }}>{statusLabel}</span>
              </div>
              <ProgressBar pct={pct} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                  {c.done}/{c.total} lessons &nbsp;·&nbsp;
                  <span style={{ color: sColor, fontWeight: 600 }}>
                    {notStarted ? "—" : `${c.score}%`}
                  </span>
                </span>
                <button onClick={() => onViewReport(c.name)} style={{
                  padding: "4px 10px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer",
                  background: notStarted ? "transparent" : "linear-gradient(135deg,#ff113d,#ff4d6d)",
                  border: notStarted ? "1px solid rgba(255,255,255,0.15)" : "none",
                  color: notStarted ? "rgba(255,255,255,0.4)" : "#fff",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {notStarted
                    ? <><FaPlay size={9} /> Start</>
                    : isComplete
                      ? <><FaChartLine size={9} /> Report</>
                      : <><FaArrowRight size={9} /> Continue</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Continue Card ──────────────────────────────────────────
function ContinueCourseCard({ course, done, total, onView }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 16, padding: "1rem 1.1rem",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.25)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,77,109,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
          {COURSE_ICONS[course] || "📘"}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#f0f0f0" }}>{course}</p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Lesson {done} · Out of {total}</p>
        </div>
      </div>
      <ProgressBar pct={pct} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{pct}%</span>
        <button onClick={() => onView(course)} style={{
          padding: "4px 12px", borderRadius: 7, border: "none",
          background: "linear-gradient(135deg,#ff113d,#ff4d6d)",
          color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer",
        }}>Continue →</button>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [modal, setModal] = useState(null); // "certificates" | "scores" | null
  const [progressData, setProgressData] = useState(null); // raw API response
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = user?.email || user?.Email || "";
  const token = localStorage.getItem("authToken");

  // ── Fetch real progress on mount ──
  useEffect(() => {
    if (!email || !token) return;
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/progress/${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProgressData(res.data);
        setError("");
      })
      .catch(() => setError("Failed to load progress. Showing defaults."))
      .finally(() => setLoading(false));
  }, [email, token]);

  const handleLogout = () => { logout(); navigate("/Login"); };
  const handleViewReport = (course) => {
  const route = COURSE_ROUTES[course];
  if (route) {
    navigate(route);
  } else {
    navigate(`/report/${encodeURIComponent(email)}?course=${encodeURIComponent(course)}`);
  }
};

  if (!user) return (
    <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>⚠️ Please log in first!</p>
  );

  // ── Derive course data from real API response ──
  const completedLessons = progressData?.completedLessons || [];
  const scores = progressData?.scores || {};
  const courseData = buildCourseData(completedLessons, scores);
  const continueLearning = courseData.filter(c => c.done > 0 && c.done < c.total).slice(0, 3);

  // streak: count of unique lesson days (fallback to 0 until you add it to schema)
  const streakDays = progressData?.streak || 0;

  const glassCard = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 20, padding: "1.1rem 1.25rem",
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard" style={{ padding: "1.5rem 2rem", maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Welcome Header ── */}
        <div style={{ ...glassCard, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,77,109,0.12)", border: "1.5px solid rgba(255,77,109,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FaUser style={{ color: "#ff4d6d", fontSize: 22 }} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#f0f0f0" }}>
              Welcome back, {user.username}! 👋
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.45)", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span>👤 {user.username}</span>
              <span>🏛️ {user.college}</span>
              <span>📅 Year {user.year}</span>
            </p>
          </div>
          {streakDays > 0 && (
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: "rgba(255,77,109,0.1)", border: "1.5px solid rgba(255,77,109,0.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#ff4d6d", lineHeight: 1 }}>{streakDays}</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>streak</span>
            </div>
          )}
          <button onClick={handleLogout} style={{
            padding: "0.5rem 1.1rem", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg,#ff113d,#ff85a1)",
            color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5, flexShrink: 0,
          }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div style={{ background: "rgba(226,75,74,0.1)", border: "1px solid rgba(226,75,74,0.3)", borderRadius: 10, padding: "0.6rem 1rem", marginBottom: "1rem", fontSize: 13, color: "#E24B4A" }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Loading ── */}
        {loading ? <Spinner /> : (
          <>
            {/* Continue Learning */}
            {continueLearning.length > 0 && (
              <>
                <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Continue Learning
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: "1.5rem" }}>
                  {continueLearning.map(c => (
                    <ContinueCourseCard key={c.name} {...c} course={c.name} onView={handleViewReport} />
                  ))}
                </div>
              </>
            )}

            {/* Progress + Quick Access */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

              {/* Your Progress */}
              <div style={glassCard}>
                <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 14, color: "#f0f0f0" }}>Your Progress</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: <FaGraduationCap />, label: "LEVEL", value: "Beginner" },
                    { icon: <FaFire />, label: "LESSONS DONE", value: `${completedLessons.length}` },
                  ].map(({ icon, label, value }) => (
                    <div key={label} style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,77,109,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ff4d6d", flexShrink: 0 }}>
                        {icon}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 16, fontWeight: 700, color: "#f0f0f0" }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Access */}
              <div style={glassCard}>
                <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 14, color: "#f0f0f0" }}>Quick Access</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { icon: <FaMedal style={{ color: "#BA7517", fontSize: 22 }} />, label: "Certificates", sub: "View your achievements", key: "certificates" },
                    { icon: <FaStar style={{ color: "#ff4d6d", fontSize: 22 }} />, label: "Scores", sub: "Check your performance", key: "scores" },
                  ].map(({ icon, label, sub, key }) => (
                    <button key={key} onClick={() => setModal(key)} style={{
                      padding: "1rem", borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.04)",
                      cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <div style={{ marginBottom: 6 }}>{icon}</div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#f0f0f0" }}>{label}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Modals ── */}
        {modal === "certificates" && (
          <Modal title="🏅 Your Certificates" onClose={() => setModal(null)}>
            <CertificatesView courseData={courseData} email={email} />
          </Modal>
        )}
        {modal === "scores" && (
          <Modal title="⭐ Your Scores" onClose={() => setModal(null)}>
            <ScoresView courseData={courseData} onViewReport={course => { setModal(null); handleViewReport(course); }} />
          </Modal>
        )}

      </div>
    </div>
  );
};

export default Dashboard;