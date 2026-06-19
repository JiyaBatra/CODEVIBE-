// src/components/Compiler.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../AuthProvider.jsx";
// Dynamic API URL config resolving to localhost in dev and Render live server in production
import API_BASE_URL from "../config/api";
import Dropdown from "./common/Dropdown";

import "./Compiler.css";
// ─── Debounce Utility ────────────────────────────────────────────────────────
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

import HintModal from "./HintModal";
import SolutionModal from "./SolutionModal";
import { useHints } from "../hooks/useHints";

const SCORING = (attempt) =>
  attempt === 1 ? 100 :
  attempt === 2 ? 80  :
  attempt === 3 ? 60  :
  attempt === 4 ? 40  :
  attempt === 5 ? 20  : 0;

const isJSFamily = (lang) => ["js", "dsa-js", "oop-js"].includes(lang);
const serverLanguages = ["c","cpp","python","java","node","dbms","mongo"];

const normalizeHTML = (s = "") => {
  return String(s)
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// ─── Error type badge colours ────────────────────────────────────────────────
// NOTE: These are intentionally used by FeedbackPanel — keep them.
const ERROR_BADGE_COLOR = {
  CompilationError: "#ef4444",
  RuntimeError:     "#f97316",
  TimeoutError:     "#a855f7",
  OutputMismatch:   "#eab308",
  ExecutionError:   "#ef4444",
};

const ERROR_BADGE_LABEL = {
  CompilationError: "🔨 Compilation Error",
  RuntimeError:     "⚡ Runtime Error",
  TimeoutError:     "⏱️ Timeout Error",
  OutputMismatch:   "🔍 Output Mismatch",
  ExecutionError:   "❌ Execution Error",
};

// ─── Simple Result Panel ─────────────────────────────────────────────────────
const FeedbackPanel = ({
  isSuccess, score, tries, executionTime,
  errorType, errorLine, errorMessage,
  hint, expected, got, status,
}) => {
  if (!isSuccess && !errorType && !status) return null;

  if (isSuccess) {
    return (
      <div className="feedback-panel feedback-panel--success">
        <div className="feedback-success-header">
          <span className="feedback-success-icon">✅</span>
          <span className="feedback-success-title">Correct! Well done!</span>
        </div>
        <div className="feedback-success-meta">
          <span className="feedback-meta-chip">🏆 Score: <b>{score}</b></span>
          <span className="feedback-meta-chip">🔁 Attempt: <b>{tries}</b></span>
          {executionTime > 0 && (
            <span className="feedback-meta-chip">⚡ {executionTime}ms</span>
          )}
        </div>
      </div>
    );
  }

  // Use specific badge colour + label when we have a recognised error type,
  // otherwise fall back to the generic "Wrong Answer" display.
  const badgeColor = ERROR_BADGE_COLOR[errorType] || "#ef4444";
  const badgeLabel = ERROR_BADGE_LABEL[errorType] || "❌ Wrong Answer";

  return (
    <div className="feedback-panel feedback-panel--error">
      <div className="feedback-error-header">
        <span className="feedback-badge" style={{ background: badgeColor }}>{badgeLabel}</span>
        {errorLine != null && (
          <span className="feedback-line-badge">Line {errorLine}</span>
        )}
      </div>
      {errorMessage ? (
        <div className="feedback-section">
          <pre className="feedback-raw">{errorMessage}</pre>
        </div>
      ) : null}
      {expected !== undefined && (
        <div className="feedback-section">
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "6px" }}>Expected Output:</div>
          <pre className="feedback-raw" style={{ color: "#86efac" }}>{String(expected ?? "")}</pre>
        </div>
      )}
      {got !== undefined && got !== expected && (
        <div className="feedback-section">
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "6px" }}>Your Output:</div>
          <pre className="feedback-raw" style={{ color: "#fca5a5" }}>{String(got ?? "")}</pre>
        </div>
      )}
      {hint && (
        <div className="feedback-hint">
          <span className="feedback-hint-icon">💡</span>
          <span className="feedback-hint-text">{hint.replace(/^💡\s*/, "")}</span>
        </div>
      )}
    </div>
  );
};

// ─── Main Compiler component ─────────────────────────────────────────────────
const Compiler = ({
  LessonId,
  language: fixedLanguage,
  initialCode = "",
  expectedOutput,
  onSuccess,
  hint: lessonHint,
  lessonTitle = "",
  // ── New progressive-hints / solution props (all optional, fully backward-compatible) ──
  hints,       // string[]  – ordered list of progressive hints
  solution,    // string    – full solution code; only loadable after all hints viewed
}) => {
  const [language, setLanguage]         = useState(fixedLanguage || "html");
  const [code, setCode]                 = useState(initialCode);
  const [tries, setTries]               = useState(0);
  const [score, setScore]               = useState(null);

  // ─── Auto-Save States ─────────────────────────────────────────────────────
  const [lastSaved, setLastSaved]       = useState(null);
  const [isSaved, setIsSaved]           = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  // feedback state
  const [isSuccess, setIsSuccess]       = useState(false);
  const [errorType, setErrorType]       = useState(null);
  const [errorLine, setErrorLine]       = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeHint, setActiveHint]     = useState("");
  const [executionTime, setExecutionTime] = useState(0);
  const [expected, setExpected]         = useState(undefined);
  const [got, setGot]                   = useState(undefined);
  const [status, setStatus]             = useState("");
  const { token }                        = useAuth();

  const iframeRef = useRef(null);
  const startTimeRef = useRef(Date.now());


  // ─── Load Saved Code on Mount ─────────────────────────────────────────────
  useEffect(() => {
    const loadSavedCode = () => {
      try {
        const savedCode = localStorage.getItem('compiler_code');
        const savedTimestamp = localStorage.getItem('compiler_last_saved');
        
        if (savedCode && savedCode.trim()) {
          setCode(savedCode);
          if (savedTimestamp) {
            setLastSaved(new Date(parseInt(savedTimestamp)));
          }
          setIsSaved(true);
          setStatus(`💾 Restored saved code from ${new Date(parseInt(savedTimestamp)).toLocaleTimeString()}`);
          setTimeout(() => setStatus(""), 3000);
        }
      } catch (error) {
        console.error('Error loading saved code:', error);
      }
    };
    
    loadSavedCode();
  }, []);

  // ─── Auto-Save Function ───────────────────────────────────────────────────
  const debouncedSave = useCallback(
    debounce((newCode) => {
      if (newCode && newCode.trim()) {
        try {
          localStorage.setItem('compiler_code', newCode);
          const timestamp = Date.now();
          localStorage.setItem('compiler_last_saved', timestamp.toString());
          setLastSaved(new Date(timestamp));
          setIsSaved(true);
          
          // Show save indicator
          setShowSaveIndicator(true);
          setTimeout(() => setShowSaveIndicator(false), 2000);
        } catch (error) {
          if (error.name === 'QuotaExceededError') {
            console.warn('LocalStorage quota exceeded. Code not saved.');
            setStatus("⚠️ Storage full - code not saved");
            setTimeout(() => setStatus(""), 3000);
          } else {
            console.error('Error saving code:', error);
          }
        }
      }
    }, 1000),
    []
  );

  // ─── Clear Saved Code ─────────────────────────────────────────────────────
  const clearSavedCode = () => {
    try {
      localStorage.removeItem('compiler_code');
      localStorage.removeItem('compiler_last_saved');
      setLastSaved(null);
      setIsSaved(false);
    } catch (error) {
      console.error('Error clearing saved code:', error);
    }
  };

  // ─── Page Unload Backup ──────────────────────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (code && code.trim()) {
        // Backup before leaving the page
        localStorage.setItem('compiler_code_backup', code);
        localStorage.setItem('compiler_backup_time', Date.now().toString());
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [code]);

  // ─── Handle Lesson Changes ───────────────────────────────────────────────
  useEffect(() => {
    const previousLessonId = localStorage.getItem('current_lesson_id');
    if (LessonId && previousLessonId && previousLessonId !== LessonId) {
      // Clear previous lesson's code when switching lessons
      clearSavedCode();
    }
    if (LessonId) {
      localStorage.setItem('current_lesson_id', LessonId);
    }
  }, [LessonId]);

  // ── Progressive hints + solution ────────────────────────────────────────
  const {
    totalHints,
    revealedIndex,
    allHintsRevealed,
    canShowSolution,
    hasSolution,
    hintModalOpen,
    activeHintText,
    activeHintNumber,
    solutionModalOpen,
    requestNextHint,
    closeHintModal,
    requestSolution,
    closeSolutionModal,
  } = useHints(hints, solution);


  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [LessonId]);

  // ── load solution into editor ────────────────────────────────────────────
  // Wrapped in useCallback so the reference is stable across renders and
  // SolutionModal's onConfirm prop does not cause unnecessary re-renders.
  const loadSolution = useCallback(() => {
    if (solution) {
      setCode(solution);
      // Clear any prior feedback so the editor state is unambiguous.
      // Then set a neutral status that is ALWAYS visible (not gated on
      // !isSuccess) — we rely on a dedicated data-attribute instead.
      setIsSuccess(false);
      setErrorType(null);
      setErrorMessage("");
      setActiveHint("");
      setScore(null);
      setStatus("✅ Solution loaded. You can still edit and run it!");
    }
  }, [solution]);

  // ── copy / download ──────────────────────────────────────────────────────
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("📋 Code copied!");
    } catch {
      setStatus("Failed to copy code");
    }
  };

  const downloadCode = () => {
    const extensions = {
      html: "html", css: "css", js: "js", react: "jsx",
      python: "py", java: "java", c: "c", cpp: "cpp"
    };
    const ext = extensions[language] || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `codevibe-code.${ext}`;
    link.click();
    URL.revokeObjectURL(link.href);
    setStatus("⬇️ Code downloaded!");
  };

  // ── share snippet ────────────────────────────────────────────────────────
  const shareCode = async () => {
    if (!code.trim()) return;
    setStatus("⏳ Creating share link...");
    try {
      const email = localStorage.getItem("userEmail");
      const username = JSON.parse(localStorage.getItem("user") || "{}")?.username || "Anonymous";
      const res = await axios.post(`${API_BASE_URL}/api/snippets`, {
        code,
        language,
        lessonId: LessonId || "",
        title: lessonTitle || LessonId || "Untitled",
        username,
        score,
      });
      const shareUrl = `${window.location.origin}/#/snippet/${res.data.slug}`;
      await navigator.clipboard.writeText(shareUrl);
      setStatus("✅ Share link copied to clipboard!");
    } catch (err) {
      console.error("Share snippet error:", err);
      setStatus("❌ Failed to create share link");
    }
  };

  // ── progress ─────────────────────────────────────────────────────────────
  const saveProgress = (lessonId, sc, attempt) => {
    const email = localStorage.getItem("userEmail");
    window.dispatchEvent(
      new CustomEvent("codevibe-progress-updated", {
        detail: { lessonId, score: sc },
      })
    );
    const learningTime = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    axios
      .post(`${API_BASE_URL}/api/lesson/${lessonId}/complete`, {
        email,
        score: sc,
        learningTime,
      })
      .catch((err) => console.error("Save progress error:", err));
    onSuccess?.({ LessonId: lessonId, score: sc, tries: attempt });
  };

  // ── decide pass/fail ─────────────────────────────────────────────────────
  const decide = (got, ctx = {}) => {
    if (typeof expectedOutput === "function") return !!expectedOutput(got, ctx);
    if (expectedOutput instanceof RegExp) return expectedOutput.test(String(got ?? ""));
    if (typeof expectedOutput === "string" || typeof expectedOutput === "number")
      return String(got ?? "").trim() === String(expectedOutput).trim();
    return false;
  };

  // ── pass / fail helpers ──────────────────────────────────────────────────
  const pass = (attempt, ms = 0) => {
    const sc = SCORING(attempt);
    setScore(sc);
    setIsSuccess(true);
    setErrorType(null);
    setErrorMessage("");
    setActiveHint("");
    setExecutionTime(ms);
    setExpected(undefined);
    setGot(undefined);
    setStatus("");
    saveProgress(LessonId, sc, attempt);
    // Clear saved code on success (optional - if you want to clear after completion)
    // clearSavedCode();
  };

  const logMistake = async ({ type = "OutputMismatch", message = "", exp = "", got: gotVal = "" } = {}) => {
    if (serverLanguages.includes(language)) return;
    if (!token) return;

    try {
      await axios.post(
        `${API_BASE_URL}/api/mistakes/log`,
        {
          code,
          language,
          error: String(message || gotVal || exp || type || "Unknown mistake").trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.dispatchEvent(
        new CustomEvent("codevibe-progress-updated", {
          detail: { lessonId: LessonId, score: 0 },
        })
      );
    } catch (err) {
      console.warn("Mistake log failed:", err?.response?.data || err?.message || err);
    }
  };

  const fail = ({ type = "OutputMismatch", message = "", hint = "", line = null, ms = 0, exp, got: gotVal } = {}) => {
    setIsSuccess(false);
    setErrorType(type);
    setErrorLine(line);
    setErrorMessage(message);
    // lesson-specific hint takes priority over pattern-based
    setActiveHint(lessonHint || hint || "💡 Review your code carefully and compare it with the example in the lesson.");
    setExecutionTime(ms);
    setExpected(exp);
    setGot(gotVal);
    setStatus("");

    if (!serverLanguages.includes(language)) {
      logMistake({ type, message, exp, got: gotVal });
    }
  };

  // ─── keyboard shortcuts ──────────────────────────────────────────────────
  // Single consolidated handler.
  // • Ctrl+Enter / Cmd+Enter → run code
  // • Ctrl+R / Cmd+R         → reset, BUT ONLY when the textarea is focused,
  //   so the browser's native refresh shortcut still works everywhere else.
  // • Escape                 → clear feedback, ONLY when no modal is open
  //   (modals handle their own Escape via useFocusTrap; firing both would
  //    cause redundant state updates and potential focus-management conflicts).
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ── Ctrl+Enter / Cmd+Enter → Run ─────────────────────────────────────
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();

        // Reset with clear saved code
        setCode(initialCode);

        runCode();
        return;
      }

      // ── Ctrl+R / Cmd+R → Reset (textarea-focused only) ───────────────────
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        const isEditorFocused =
          document.activeElement?.classList?.contains("compiler-textarea");
        if (isEditorFocused) {
          e.preventDefault();
          setCode(initialCode);
          setStatus("");
          setIsSuccess(false);
          setErrorType(null);
          setErrorMessage("");
          setActiveHint("");
          setScore(null);
        }
        return;
      }

      // ── Escape → clear feedback only when no modal is currently open ──────
      // Modals register their own Escape handler via useFocusTrap.
      // Letting this handler also fire when a modal is open causes double
      // state updates and can reset feedback the user still needs to see.
      if (e.key === "Escape" && !hintModalOpen && !solutionModalOpen) {

        setStatus("");
        setIsSuccess(false);
        setErrorType(null);
        setErrorMessage("");
        setActiveHint("");

        setScore(null);
        clearSavedCode();

      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // score is intentionally included: runCode() reads it and would capture a
  // stale value if score changed between effect registrations.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, initialCode, language, tries, score, hintModalOpen, solutionModalOpen]);

  // ─── client-side runners ─────────────────────────────────────────────────

  const runHTML = (attempt, iframeDoc) => {
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
    setTimeout(() => {
      let expVal = "";
      if (typeof expectedOutput !== "function") {
        const tempIframe = document.createElement("iframe");
        tempIframe.style.display = "none";
        document.body.appendChild(tempIframe);
        try {
          const tempDoc = tempIframe.contentDocument || tempIframe.contentWindow.document;
          tempDoc.open();
          tempDoc.write(expectedOutput || "");
          tempDoc.close();
          expVal = normalizeHTML(tempDoc.body?.innerHTML);
        } catch (e) {
          console.error("Error rendering expectedOutput in temp iframe:", e);
        } finally {
          document.body.removeChild(tempIframe);
        }
      }

      const gotVal = normalizeHTML(iframeDoc.body?.innerHTML);
      
      const isCorrect = typeof expectedOutput === "function"
        ? expectedOutput(iframeDoc.body?.innerHTML)
        : (gotVal === expVal);

      if (isCorrect) pass(attempt);
      else fail({ type: "OutputMismatch", message: "", exp: expVal, got: gotVal });
    }, 250);
  };

  const runCSS = (attempt, iframeDoc, iframeWin) => {
    if (typeof expectedOutput !== "object" || Array.isArray(expectedOutput) || expectedOutput === null) {
      fail({ type: "ExecutionError", message: "expectedOutput for CSS must be an object like { 'h1': { color: 'rgb(...)' } }" });
      return;
    }
    const selectorHTML = Object.keys(expectedOutput).map((sel) => {
      if (sel.startsWith(".")) return `<div class="${sel.slice(1)}">Test</div>`;
      if (sel.startsWith("#")) return `<div id="${sel.slice(1)}">Test</div>`;
      if (sel.includes(" ")) {
        const [outer, inner] = sel.split(" ");
        return `<div class="${outer.replace(".", "")}"><div class="${inner.replace(".", "")}">Test</div></div>`;
      }
      return `<${sel}>Test</${sel}>`;
    }).join("\n");

    iframeDoc.open();
    iframeDoc.write(`<html><head><style>${code}</style></head><body>${selectorHTML}</body></html>`);
    iframeDoc.close();

    setTimeout(() => {
      const mismatches = [];
      for (const selector of Object.keys(expectedOutput)) {
        const el = iframeDoc.querySelector(selector);
        if (!el) { mismatches.push(`Element "${selector}" not found`); continue; }
        const comp = iframeWin.getComputedStyle(el);
        for (const prop of Object.keys(expectedOutput[selector])) {
          const expProp = expectedOutput[selector][prop];
          if (comp[prop] !== expProp) mismatches.push(`${selector} → ${prop}: expected "${expProp}", got "${comp[prop]}"`);
        }
      }
      if (!mismatches.length || decide(true, { language: "css", code, document: iframeDoc, window: iframeWin })) {
        pass(attempt);
      } else {
        fail({ type: "OutputMismatch", message: mismatches.join("\n"), exp: "Matching CSS properties", got: mismatches.join("\n") });
      }
    }, 300);
  };

  const runJSFamily = (attempt, iframeDoc) => {
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <body>
          <pre id="out"></pre>
          <script>
            (function(){
              try {
                const out = document.getElementById('out');
                const logs = [];
                const oldLog = console.log;
                console.log = (...args) => { logs.push(args.join(" ")); try{oldLog(...args)}catch(e){}; out.textContent = logs.join("\\n"); };
                const killer = setTimeout(() => { throw new Error("Timeout"); }, 1500);
                ${code}
                clearTimeout(killer);
              } catch(e) { document.body.textContent = "Error: " + (e?.message || e); }
            })();
          <${"/"}script>
        </body>
      </html>
    `);
    iframeDoc.close();
    setTimeout(() => {
      const gotVal = (iframeDoc.body?.innerText || "").trim();
      const expStr = typeof expectedOutput === "string" ? expectedOutput : "[use function/regex]";
      if (gotVal.startsWith("Error:")) {
        const errMsg = gotVal.replace(/^Error:\s*/, "");
        fail({
          type: errMsg.toLowerCase().includes("timeout") ? "TimeoutError" : "RuntimeError",
          message: gotVal,
          exp: expStr,
          got: gotVal,
        });
      } else if (decide(gotVal)) {
        pass(attempt);
      } else {
        fail({ type: "OutputMismatch", message: "", exp: expStr, got: gotVal });
      }
    }, 300);
  };

  const runReact = (attempt, iframeDoc) => {
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <pre id="out"></pre>
          <script type="text/babel">
            try {
              const out = document.getElementById('out');
              const logs = [];
              const oldLog = console.log;
              console.log = (...args) => { logs.push(args.join(' ')); try{oldLog(...args)}catch(_){}; out.textContent = logs.join("\\n"); };
              const killer = setTimeout(() => { throw new Error('Timeout'); }, 2000);
              ${code}
              const rootEl = document.getElementById('root');
              const root = ReactDOM.createRoot(rootEl);
              if (typeof App === 'function') root.render(React.createElement(App));
              clearTimeout(killer);
            } catch(e) { document.body.textContent = 'Error: ' + (e?.message || e); }
          </script>
        </body>
      </html>
    `;
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
    setTimeout(() => {
      const gotVal = (iframeDoc.body?.innerText || "").trim();
      if (gotVal.startsWith("Error:")) {
        fail({ type: "RuntimeError", message: gotVal, got: gotVal });
      } else if (decide(gotVal)) {
        pass(attempt);
      } else {
        fail({ type: "OutputMismatch", message: "", got: gotVal });
      }
    }, 700);
  };

  // ─── server-side runner ──────────────────────────────────────────────────
  const runServer = async (attempt) => {
    setStatus("⏳ Running on server...");
    setIsSuccess(false);
    setErrorType(null);
    setErrorMessage("");
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/execute/${language}`,
        { email: localStorage.getItem("userEmail") || "guest@example.com", code },
        { timeout: 12000 }
      );
      const out = String(res.data.output ?? "").trim();
      const ms  = res.data.executionTime || 0;
      setStatus("");
      if (decide(out)) {
        pass(attempt, ms);
      } else {
        const expStr = typeof expectedOutput === "string" ? expectedOutput : "[use function/regex]";
        fail({ type: "OutputMismatch", message: "", exp: expStr, got: out, ms });
      }
    } catch (e) {
      const data = e?.response?.data || {};
      fail({
        type:    data.errorType    || "ExecutionError",
        message: data.stderr       || data.error || e?.message || String(e),
        hint:    data.hint         || "",
        line:    data.errorLine    || null,
        ms:      data.executionTime || 0,
      });
      setStatus("");
    }
  };

  // ─── orchestrator ────────────────────────────────────────────────────────
  const runCode = async () => {
    
    const isFirstPass = score === null;
    const attempt = isFirstPass ? tries + 1 : tries;
    if (isFirstPass) { setTries(attempt); setScore(null); }

    setIsSuccess(false);
    setErrorType(null);
    setErrorMessage("");
    setActiveHint("");
    setStatus("⏳ Running...");

    const iframe    = iframeRef.current;
    const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
    const iframeWin = iframe?.contentWindow;

    if (!iframeDoc && !serverLanguages.includes(language)) {
      fail({ type: "ExecutionError", message: "Iframe not ready" });
      return;
    }

    if (serverLanguages.includes(language)) return runServer(attempt);
    if (language === "html")                 return runHTML(attempt, iframeDoc);
    if (language === "css")                  return runCSS(attempt, iframeDoc, iframeWin);
    if (isJSFamily(language))                return runJSFamily(attempt, iframeDoc);
    if (language === "react")                return runReact(attempt, iframeDoc);
    fail({ type: "ExecutionError", message: "Unsupported language in this setup." });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Enter => Run Code
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }

      // Esc => Clear feedback/status
      if (e.key === "Escape") {
        setStatus("");
        setIsSuccess(false);
        setErrorType(null);
        setErrorMessage("");
        setActiveHint("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [code, language]);

  // ─── render ──────────────────────────────────────────────────────────────
  return (
    <div className="compiler">
      {!fixedLanguage && (
        <Dropdown
          value={language}
          onChange={(val) => setLanguage(val)}
          options={[
            { value: "html", label: "HTML" },
            { value: "css", label: "CSS" },
            { value: "js", label: "JavaScript" },
            { value: "dsa-js", label: "DSA (JavaScript)" },
            { value: "oop-js", label: "OOP (JavaScript)" },
            { value: "react", label: "React (JSX)" },
            { value: "node", label: "Node.js (server)" },
            { value: "c", label: "C (server)" },
            { value: "cpp", label: "C++ (server)" },
            { value: "python", label: "Python (server)" },
            { value: "java", label: "Java (server)" },
            { value: "dbms", label: "DBMS/SQL (server)" },
            { value: "mongo", label: "Mongo (server)" }
          ]}
          placeholder="Select Language"
          style={{ width: "100%", maxWidth: "300px", marginBottom: "12px" }}
          triggerStyle={{
            background: "#161b22",
            color: "#e6edf3",
            border: "1px solid rgba(255, 77, 109, 0.4)",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "0.9rem",
            width: "100%",
            textAlign: "left"
          }}
        />
      )}

      <div className="compiler-editor-wrap">
        {/* toolbar with save indicator */}
        <div className="compiler-toolbar">

          <div className="compiler-toolbar-left">
            <button title="Copy Code" onClick={copyCode} className="compiler-btn compiler-btn--copy">
              📋 Copy
            </button>
            <button title="Download Code" onClick={downloadCode} className="compiler-btn compiler-btn--download">
              ⬇️ Download
            </button>
          </div>
          <div className="compiler-toolbar-right">
            {/* Save Status Indicator */}
            <div className="save-indicator">
              {showSaveIndicator && (
                <span className="save-status saving">💾 Saving...</span>
              )}
              {isSaved && !showSaveIndicator && lastSaved && (
                <span className="save-status saved" title={`Last saved at ${lastSaved.toLocaleTimeString()}`}>
                  ✅ Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              {!isSaved && !showSaveIndicator && code && code.trim() && (
                <span className="save-status unsaved">⚠️ Unsaved</span>
              )}
            </div>
          </div>

          <button
              title="Copy Code"
              aria-label="Copy code to clipboard"
              onClick={copyCode}
              className="compiler-btn compiler-btn--copy"
            >
            📋 Copy
          </button>
          <button
              title="Download Code"
              aria-label="Download code file"
              onClick={downloadCode}
              className="compiler-btn compiler-btn--download"
            >
            ⬇️ Download
          </button>
          <button
              title="Share Code"
              aria-label="Share code snippet"
              onClick={shareCode}
              className="compiler-btn compiler-btn--share"
            >
            🔗 Share
          </button>

        </div>

        {/* editor */}
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            debouncedSave(e.target.value);
          }}
          className="compiler-textarea"
          placeholder={`// Type your code here. Use console.log for JS outputs.\n// For React define function App(){ return <h1>Hello</h1> }\n// Server languages will be executed by backend: POST /api/execute/:language`}
          spellCheck={false}
        />
      </div>

      {/* action row */}
      <div className="compiler-actions">
        <button
            title="Run (Ctrl + Enter)"
            aria-label="Run code"
            onClick={runCode}
            className="compiler-btn compiler-btn--run"
          >
          ▶ Run
        </button>

        <button
          title="Reset (Ctrl + R) - Clears editor and saved code"

       <button

          title="Reset (Ctrl + R)"
          aria-label="Reset code editor"


          title="Reset code to starter (Ctrl + R when editor is focused)"
          aria-label="Reset code editor to original starter code"

          onClick={() => {
            setCode(initialCode);
            setStatus("");
            setIsSuccess(false);
            setErrorType(null);
            setErrorMessage("");
            setActiveHint("");
            setScore(null);
            clearSavedCode();
          }}
          className="compiler-btn compiler-btn--reset"
        >
          ↺ Reset
        </button>

        {status && !isSuccess && !errorType && (
          <span
            className="compiler-status"
            role="status"
            aria-live="polite"
          >
            {status}
          </span>
        )}
      </div>

      {/* ── Hint & Solution controls ── */}
      {(totalHints > 0 || hasSolution) && (
        <div className="compiler-hint-controls" role="group" aria-label="Hints and solution">
          {totalHints > 0 && (
            <button
              className={`compiler-btn compiler-btn--hint ${allHintsRevealed ? "compiler-btn--hint-done" : ""}`}
              onClick={requestNextHint}
              aria-label={
                allHintsRevealed
                  ? `All ${totalHints} hints revealed. Click to review the last hint.`
                  : revealedIndex === -1
                    ? `Reveal hint 1 of ${totalHints}`
                    : `Hint ${revealedIndex + 1} of ${totalHints} shown. Click for hint ${revealedIndex + 2}.`
              }
              title={
                allHintsRevealed
                  ? "All hints revealed — click to review the last one"
                  : revealedIndex === -1
                    ? `Show hint 1 of ${totalHints}`
                    : `Show hint ${revealedIndex + 2} of ${totalHints}`
              }
            >
              💡 {allHintsRevealed
                  ? `All Hints Revealed (${totalHints}/${totalHints})`
                  : revealedIndex === -1
                    ? "Need a Hint?"
                    : `Hint ${revealedIndex + 1}/${totalHints} – Next Hint?`}
            </button>
          )}

          {hasSolution && (
            <button
              className={`compiler-btn compiler-btn--solution ${!canShowSolution ? "compiler-btn--solution-locked" : ""}`}
              onClick={requestSolution}
              disabled={!canShowSolution}
              aria-label={
                canShowSolution
                  ? "Show solution"
                  : `View all ${totalHints} hints to unlock the solution`
              }
              title={
                canShowSolution
                  ? "Load solution into editor"
                  : `View all ${totalHints} hint${totalHints !== 1 ? "s" : ""} to unlock`
              }
            >
              {canShowSolution ? "🔓 Show Solution" : `🔒 Solution (view all hints to unlock)`}
            </button>
          )}
        </div>
      )}

      {/* preview iframe */}
      <iframe
        ref={iframeRef}
        className="compiler-preview"
        title="code-output"
        sandbox="allow-scripts allow-same-origin"
      />

      {/* ── rich feedback panel ── */}
      <FeedbackPanel
        isSuccess={isSuccess}
        score={score}
        tries={tries}
        executionTime={executionTime}
        errorType={errorType}
        errorLine={errorLine}
        errorMessage={errorMessage}
        hint={activeHint}
        expected={expected}
        got={got}
        status={status}
      />

      {/* ── Hint modal ── */}
      <HintModal
        isOpen={hintModalOpen}
        onClose={closeHintModal}
        hint={activeHintText}
        hintNumber={activeHintNumber}
        totalHints={totalHints}
      />

      {/* ── Solution confirmation modal ── */}
      <SolutionModal
        isOpen={solutionModalOpen}
        onClose={closeSolutionModal}
        onConfirm={loadSolution}
      />
    </div>
  );
};

export default Compiler;