// src/components/Compiler.jsx
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const SCORING = (attempt) =>
  attempt === 1 ? 100 :
  attempt === 2 ? 80  :
  attempt === 3 ? 60  :
  attempt === 4 ? 40  :
  attempt === 5 ? 20  : 0;

const isJSFamily = (lang) => ["js", "dsa-js", "oop-js"].includes(lang);
const serverLanguages = ["c","cpp","python","java","node","dbms","mongo"];

const normalizeHTML = (s = "") => String(s).trim().replace(/\s+/g, " ");

// ─── Error type badge colours ────────────────────────────────────────────────
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
const FeedbackPanel = ({ isSuccess, score, tries, executionTime, errorType, hint, expected, status }) => {
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

  return (
    <div className="feedback-panel feedback-panel--error">
      <div className="feedback-error-header">
        <span className="feedback-badge" style={{ background: "#ef4444" }}>❌ Wrong Answer</span>
      </div>
      {expected !== undefined && (
        <div className="feedback-section">
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "6px" }}>Expected Output:</div>
          <pre className="feedback-raw" style={{ color: "#86efac" }}>{String(expected ?? "")}</pre>
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
  hint: lessonHint,   // ← question-specific hint passed from each lesson
}) => {
  const [language, setLanguage]         = useState(fixedLanguage || "html");
  const [code, setCode]                 = useState(initialCode);
  const [tries, setTries]               = useState(0);
  const [score, setScore]               = useState(null);

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

  const iframeRef = useRef(null);

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

  // ── progress ─────────────────────────────────────────────────────────────
  const saveProgress = (lessonId, sc, attempt) => {
    const email = localStorage.getItem("userEmail");
    window.dispatchEvent(
      new CustomEvent("codevibe-progress-updated", {
        detail: { lessonId, score: sc },
      })
    );
    axios
      .post(`http://localhost:5002/api/lesson/${lessonId}/complete`, { email, score: sc })
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
  };

  // ─── keyboard shortcuts ──────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "Enter") { e.preventDefault(); runCode(); }
      if (e.ctrlKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setCode(initialCode);
        setStatus("");
        setIsSuccess(false);
        setErrorType(null);
        setErrorMessage("");
        setActiveHint("");
        setScore(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, initialCode, language, tries]);

  // ─── client-side runners ─────────────────────────────────────────────────

  const runHTML = (attempt, iframeDoc) => {
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
    setTimeout(() => {
      const gotVal = normalizeHTML(iframeDoc.body?.innerHTML);
      const expVal = normalizeHTML(expectedOutput || "");
      if (decide(gotVal)) pass(attempt);
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
          <\/script>
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
        `http://localhost:5002/api/execute/${language}`,
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

  // ─── render ──────────────────────────────────────────────────────────────
  return (
    <div className="compiler">
      {!fixedLanguage && (
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="compiler-lang-select"
        >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
          <option value="dsa-js">DSA (JavaScript)</option>
          <option value="oop-js">OOP (JavaScript)</option>
          <option value="react">React (JSX)</option>
          <option value="node">Node.js (server)</option>
          <option value="c">C (server)</option>
          <option value="cpp">C++ (server)</option>
          <option value="python">Python (server)</option>
          <option value="java">Java (server)</option>
          <option value="dbms">DBMS/SQL (server)</option>
          <option value="mongo">Mongo (server)</option>
        </select>
      )}

      <div className="compiler-editor-wrap">
        {/* toolbar */}
        <div className="compiler-toolbar">
          <button title="Copy Code" onClick={copyCode} className="compiler-btn compiler-btn--copy">
            📋 Copy
          </button>
          <button title="Download Code" onClick={downloadCode} className="compiler-btn compiler-btn--download">
            ⬇️ Download
          </button>
        </div>

        {/* editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="compiler-textarea"
          placeholder={`// Type your code here. Use console.log for JS outputs.\n// For React define function App(){ return <h1>Hello</h1> }\n// Server languages will be executed by backend: POST /api/execute/:language`}
          spellCheck={false}
        />
      </div>

      {/* action row */}
      <div className="compiler-actions">
        <button title="Run (Ctrl + Enter)" onClick={runCode} className="compiler-btn compiler-btn--run">
          ▶ Run
        </button>
        <button
          title="Reset (Ctrl + R)"
          onClick={() => {
            setCode(initialCode);
            setStatus("");
            setIsSuccess(false);
            setErrorType(null);
            setErrorMessage("");
            setActiveHint("");
            setScore(null);
          }}
          className="compiler-btn compiler-btn--reset"
        >
          ↺ Reset
        </button>
        {status && !isSuccess && !errorType && (
          <span className="compiler-status">{status}</span>
        )}
      </div>

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
    </div>
  );
};

export default Compiler;
