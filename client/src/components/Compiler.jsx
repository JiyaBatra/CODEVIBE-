// src/components/Compiler.jsx
import { useState, useRef, useEffect } from "react";
import axios from "axios";
// Dynamic API URL config resolving to localhost in dev and Render live server in production
import API_BASE_URL from "../config/api";
import Dropdown from "./common/Dropdown";

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
  isSuccess,
  score,
  tries,
  executionTime,
  errorType,
  hint,
  expected,
  got,
  status,
  explanation,
  probableCauses,
  suggestedFix,
  learningTip,
  repeatedMistake,
  errorMessage
}) => {
  const [showRaw, setShowRaw] = useState(false);

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
      {repeatedMistake && (
        <div className="feedback-repeated-mistake-alert">
          <span className="feedback-repeated-icon">⚠️</span>
          <div className="feedback-repeated-text">
            <strong>Repeated Mistake:</strong> {repeatedMistake.message}
          </div>
        </div>
      )}

      <div className="feedback-error-header">
        <span className="feedback-badge" style={{ background: ERROR_BADGE_COLOR[errorType] || "#ef4444" }}>
          {ERROR_BADGE_LABEL[errorType] || "❌ Error"}
        </span>
        {tries > 0 && <span className="feedback-line-badge">Attempt: {tries}</span>}
        {executionTime > 0 && <span className="feedback-time-badge">⚡ {executionTime}ms</span>}
      </div>

      {explanation && (
        <div className="feedback-section feedback-explanation-section">
          <div className="feedback-section-title">💡 What went wrong?</div>
          <p className="feedback-explanation-text">{explanation}</p>
        </div>
      )}

      {probableCauses && probableCauses.length > 0 && (
        <div className="feedback-section feedback-causes-section">
          <div className="feedback-section-title">🔍 Probable Causes</div>
          <ul className="feedback-causes-list">
            {probableCauses.map((cause, idx) => (
              <li key={idx} className="feedback-cause-item">{cause}</li>
            ))}
          </ul>
        </div>
      )}

      {suggestedFix && (
        <div className="feedback-section feedback-fix-section">
          <div className="feedback-section-title">🛠️ Suggested Fix</div>
          <pre className="feedback-fix-code">
            <code>{suggestedFix}</code>
          </pre>
        </div>
      )}

      {learningTip && (
        <div className="feedback-section feedback-learning-section">
          <div className="feedback-learning-title">📚 Learning Tip</div>
          <p className="feedback-learning-text">{learningTip}</p>
        </div>
      )}

      {expected !== undefined && (
        <div className="feedback-section">
          <div className="feedback-diff">
            <div className="feedback-diff-block feedback-diff-expected">
              <div className="feedback-diff-label">Expected Output</div>
              <pre className="feedback-diff-code">{String(expected ?? "")}</pre>
            </div>
            {got !== undefined && (
              <div className="feedback-diff-block feedback-diff-got">
                <div className="feedback-diff-label">Your Output</div>
                <pre className="feedback-diff-code">{String(got ?? "")}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="feedback-section feedback-technical-details">
          <button className="feedback-toggle" onClick={() => setShowRaw(!showRaw)}>
            {showRaw ? "▼ Hide Raw Technical Details" : "▶ Show Raw Technical Details"}
          </button>
          {showRaw && (
            <pre className="feedback-raw">{errorMessage}</pre>
          )}
        </div>
      )}

      {hint && !explanation && (
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

  // AI assistant error details states
  const [explanation, setExplanation]   = useState("");
  const [probableCauses, setProbableCauses] = useState([]);
  const [suggestedFix, setSuggestedFix] = useState("");
  const [learningTip, setLearningTip]   = useState("");
  const [repeatedMistake, setRepeatedMistake] = useState(null);

  const explainClientSideError = async (errorMessage, clientLanguage) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/execute/explain`, {
        error: errorMessage,
        language: clientLanguage,
        code,
        email: localStorage.getItem("userEmail") || "guest@codevibe.com"
      });
      return res.data;
    } catch (e) {
      console.warn("Failed to fetch client error explanation:", e);
      return null;
    }
  };

  const iframeRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [LessonId]);

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
    
    // Clear AI explanations
    setExplanation("");
    setProbableCauses([]);
    setSuggestedFix("");
    setLearningTip("");
    setRepeatedMistake(null);

    saveProgress(LessonId, sc, attempt);
  };

  const fail = ({
    type = "OutputMismatch",
    message = "",
    hint = "",
    line = null,
    ms = 0,
    exp,
    got: gotVal,
    explanation = "",
    probableCauses = [],
    suggestedFix = "",
    learningTip = "",
    repeatedMistake = null
  } = {}) => {
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
    
    // Set AI explanations
    setExplanation(explanation);
    setProbableCauses(probableCauses);
    setSuggestedFix(suggestedFix);
    setLearningTip(learningTip);
    setRepeatedMistake(repeatedMistake);
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
        setExplanation("");
        setProbableCauses([]);
        setSuggestedFix("");
        setLearningTip("");
        setRepeatedMistake(null);
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
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
    setTimeout(async () => {
      const gotVal = (iframeDoc.body?.innerText || "").trim();
      const expStr = typeof expectedOutput === "string" ? expectedOutput : "[use function/regex]";
      if (gotVal.startsWith("Error:")) {
        const errMsg = gotVal.replace(/^Error:\s*/, "");
        const explanationData = await explainClientSideError(gotVal, language);
        fail({
          type: errMsg.toLowerCase().includes("timeout") ? "TimeoutError" : "RuntimeError",
          message: gotVal,
          exp: expStr,
          got: gotVal,
          explanation: explanationData?.explanation || "",
          probableCauses: explanationData?.probableCauses || [],
          suggestedFix: explanationData?.suggestedFix || "",
          learningTip: explanationData?.learningTip || "",
          repeatedMistake: explanationData?.repeatedMistake || null
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
    setTimeout(async () => {
      const gotVal = (iframeDoc.body?.innerText || "").trim();
      if (gotVal.startsWith("Error:")) {
        const explanationData = await explainClientSideError(gotVal, "react");
        fail({
          type: "RuntimeError",
          message: gotVal,
          got: gotVal,
          explanation: explanationData?.explanation || "",
          probableCauses: explanationData?.probableCauses || [],
          suggestedFix: explanationData?.suggestedFix || "",
          learningTip: explanationData?.learningTip || "",
          repeatedMistake: explanationData?.repeatedMistake || null
        });
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
        type:            data.errorType       || "ExecutionError",
        message:         data.stderr          || data.error || e?.message || String(e),
        hint:            data.hint            || "",
        line:            data.errorLine       || null,
        ms:              data.executionTime   || 0,
        explanation:     data.explanation     || "",
        probableCauses:  data.probableCauses  || [],
        suggestedFix:    data.suggestedFix    || "",
        learningTip:     data.learningTip     || "",
        repeatedMistake: data.repeatedMistake || null
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
            setExplanation("");
            setProbableCauses([]);
            setSuggestedFix("");
            setLearningTip("");
            setRepeatedMistake(null);
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
        explanation={explanation}
        probableCauses={probableCauses}
        suggestedFix={suggestedFix}
        learningTip={learningTip}
        repeatedMistake={repeatedMistake}
      />
    </div>
  );
};

export default Compiler;
