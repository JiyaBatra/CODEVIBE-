import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const DURATIONS = {
  focus: { 15: 15 * 60, 25: 25 * 60, 45: 45 * 60 },
  break: { 5: 5 * 60, 10: 10 * 60, 15: 15 * 60 },
};

const DEFAULT_FOCUS = 25 * 60;
const DEFAULT_BREAK = 5 * 60;

export default function PomodoroTimer() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("focus");
  const [seconds, setSeconds] = useState(DEFAULT_FOCUS);
  const [running, setRunning] = useState(false);
  const [sessionsToday, setSessionsToday] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [statusMsg, setStatusMsg] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;
    axios.get(`${API_BASE_URL}/api/study-sessions/today?email=${email}`)
      .then((res) => setSessionsToday(res.data.count))
      .catch(() => {});
  }, []);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleSessionComplete = useCallback(async () => {
    clearTimer();
    setRunning(false);

    try {
      const audio = new Audio();
      audio.src = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUlvT18AAAAAAA==";
      audio.play().catch(() => {});
    } catch {}

    if (mode === "focus") {
      const email = localStorage.getItem("userEmail");
      if (email && sessionsToday < 8) {
        try {
          const res = await axios.post(`${API_BASE_URL}/api/study-sessions/complete`, {
            email,
            duration: DURATIONS.focus[focusMinutes] || DEFAULT_FOCUS,
          });
          setSessionsToday((prev) => prev + 1);
          setStatusMsg(`+${res.data.xpAwarded} XP earned!`);
          setTimeout(() => setStatusMsg(""), 3000);
        } catch (err) {
          if (err.response?.status === 429) {
            setStatusMsg("Daily limit reached (8 sessions)");
          } else {
            setStatusMsg("Failed to log session");
          }
          setTimeout(() => setStatusMsg(""), 3000);
        }
      }
      setMode("break");
      setSeconds(DURATIONS.break[breakMinutes] || DEFAULT_BREAK);
    } else {
      setMode("focus");
      setSeconds(DURATIONS.focus[focusMinutes] || DEFAULT_FOCUS);
    }
  }, [mode, sessionsToday, focusMinutes, breakMinutes, clearTimer]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [running, handleSessionComplete, clearTimer]);

  const toggleTimer = () => {
    if (seconds <= 0) {
      setSeconds(mode === "focus"
        ? (DURATIONS.focus[focusMinutes] || DEFAULT_FOCUS)
        : (DURATIONS.break[breakMinutes] || DEFAULT_BREAK));
    }
    setRunning((prev) => !prev);
  };

  const resetTimer = () => {
    clearTimer();
    setRunning(false);
    setSeconds(mode === "focus"
      ? (DURATIONS.focus[focusMinutes] || DEFAULT_FOCUS)
      : (DURATIONS.break[breakMinutes] || DEFAULT_BREAK));
    setStatusMsg("");
  };

  const changeMode = (newMode) => {
    clearTimer();
    setRunning(false);
    setMode(newMode);
    setStatusMsg("");
    if (newMode === "focus") {
      setSeconds(DURATIONS.focus[focusMinutes] || DEFAULT_FOCUS);
    } else {
      setSeconds(DURATIONS.break[breakMinutes] || DEFAULT_BREAK);
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const progress = mode === "focus"
    ? 1 - seconds / (DURATIONS.focus[focusMinutes] || DEFAULT_FOCUS)
    : 1 - seconds / (DURATIONS.break[breakMinutes] || DEFAULT_BREAK);

  return (
    <>
      <style>{`
        .pomodoro-fab-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }
        .pomodoro-fab {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.5);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .pomodoro-fab:hover {
          transform: scale(1.1) rotate(-10deg);
        }
        .pomodoro-fab.running {
          animation: pomoPulse 2s infinite;
        }
        @keyframes pomoPulse {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.6); }
          70% { box-shadow: 0 0 0 15px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        .pomodoro-card {
          position: fixed;
          bottom: 100px;
          right: 40px;
          z-index: 9999;
          background: linear-gradient(145deg, rgba(20,20,30,0.97), rgba(30,30,45,0.97));
          border-radius: 24px;
          padding: 24px;
          border: 1px solid rgba(99, 102, 241, 0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          width: 280px;
          backdrop-filter: blur(15px);
          animation: pomoScaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: bottom right;
        }
        @keyframes pomoScaleIn {
          0% { opacity: 0; transform: scale(0.5) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .pomo-mode-tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          background: rgba(0,0,0,0.3);
          border-radius: 12px;
          padding: 4px;
        }
        .pomo-mode-tab {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s;
          background: transparent;
          color: rgba(255,255,255,0.5);
        }
        .pomo-mode-tab.active {
          background: rgba(99, 102, 241, 0.3);
          color: white;
        }
        .pomo-clock {
          text-align: center;
          font-size: 3.5rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: white;
          margin: 8px 0;
          letter-spacing: 2px;
        }
        .pomo-progress-bar {
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .pomo-progress-fill {
          height: 100%;
          border-radius: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: width 0.3s linear;
        }
        .pomo-controls {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .pomo-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .pomo-btn-start {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          flex: 1;
        }
        .pomo-btn-start:hover {
          opacity: 0.9;
        }
        .pomo-btn-reset {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .pomo-btn-reset:hover {
          background: rgba(255,255,255,0.2);
        }
        .pomo-stats {
          text-align: center;
          margin-top: 12px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
        }
        .pomo-status-msg {
          text-align: center;
          margin-top: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #4ade80;
        }
        .pomo-duration-select {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-bottom: 12px;
        }
        .pomo-duration-btn {
          padding: 4px 12px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          background: transparent;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 0.75rem;
          transition: all 0.2s;
        }
        .pomo-duration-btn.active {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.2);
          color: white;
        }
        .pomo-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255,77,109,0.15);
          border: 1px solid rgba(255,77,109,0.3);
          color: #ff4d4d;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 10px;
          transition: all 0.2s;
        }
        .pomo-close-btn:hover {
          background: rgba(255,77,109,0.8);
          color: white;
        }
        .pomo-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 9998;
          background: transparent;
        }
      `}</style>

      {open && <div className="pomo-backdrop" onClick={() => setOpen(false)} />}

      {open && (
        <div className="pomodoro-card">
          <button className="pomo-close-btn" onClick={() => setOpen(false)}>✕</button>

          <div className="pomo-mode-tabs">
            <button
              className={`pomo-mode-tab ${mode === "focus" ? "active" : ""}`}
              onClick={() => changeMode("focus")}
            >
              🎯 Focus
            </button>
            <button
              className={`pomo-mode-tab ${mode === "break" ? "active" : ""}`}
              onClick={() => changeMode("break")}
            >
              ☕ Break
            </button>
          </div>

          {!running && (
            <div className="pomo-duration-select">
              {mode === "focus"
                ? [15, 25, 45].map((m) => (
                    <button
                      key={m}
                      className={`pomo-duration-btn ${focusMinutes === m ? "active" : ""}`}
                      onClick={() => { setFocusMinutes(m); setSeconds(m * 60); }}
                    >
                      {m}m
                    </button>
                  ))
                : [5, 10, 15].map((m) => (
                    <button
                      key={m}
                      className={`pomo-duration-btn ${breakMinutes === m ? "active" : ""}`}
                      onClick={() => { setBreakMinutes(m); setSeconds(m * 60); }}
                    >
                      {m}m
                    </button>
                  ))}
            </div>
          )}

          <div className="pomo-clock">{formatTime(seconds)}</div>

          <div className="pomo-progress-bar">
            <div className="pomo-progress-fill" style={{ width: `${Math.min(100, progress * 100)}%` }} />
          </div>

          <div className="pomo-controls">
            <button className="pomo-btn pomo-btn-start" onClick={toggleTimer}>
              {running ? "⏸ Pause" : seconds <= 0 ? "↻ Restart" : "▶ Start"}
            </button>
            <button className="pomo-btn pomo-btn-reset" onClick={resetTimer}>↺ Reset</button>
          </div>

          <div className="pomo-stats">
            Today: {sessionsToday}/8 sessions completed
          </div>

          {statusMsg && <div className="pomo-status-msg">{statusMsg}</div>}
        </div>
      )}

      <div className="pomodoro-fab-container">
        <button
          className={`pomodoro-fab ${running ? "running" : ""}`}
          onClick={() => setOpen(!open)}
          title={running ? `${mode === "focus" ? "Focus" : "Break"}: ${formatTime(seconds)}` : "Study Timer"}
        >
          {running ? "⏱" : "🍅"}
        </button>
      </div>
    </>
  );
}
