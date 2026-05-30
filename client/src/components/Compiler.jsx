// src/components/Compiler.jsx
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

// ── CodeMirror 6 imports ──────────────────────────────────────────────────────
import { EditorView, basicSetup } from "codemirror";
import { EditorState }            from "@codemirror/state";
import { html }                   from "@codemirror/lang-html";
import { css }                    from "@codemirror/lang-css";
import { javascript }             from "@codemirror/lang-javascript";
import { python }                 from "@codemirror/lang-python";
import { java }                   from "@codemirror/lang-java";
import { cpp }                    from "@codemirror/lang-cpp";
import { sql }                    from "@codemirror/lang-sql";
import { oneDark }                from "@codemirror/theme-one-dark";
import { Decoration } from "@codemirror/view";
import { StateField, StateEffect } from "@codemirror/state";

// ─── Scoring ──────────────────────────────────────────────────────────────────
const SCORING = (attempt) =>
  attempt === 1 ? 100 :
  attempt === 2 ? 80  :
  attempt === 3 ? 60  :
  attempt === 4 ? 40  :
  attempt === 5 ? 20  : 0;

const isJSFamily     = (lang) => ["js", "dsa-js", "oop-js"].includes(lang);
const serverLanguages = ["c","cpp","python","java","node","dbms","mongo"];

const normalizeHTML = (s = "") =>
  String(s).replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();

// ─── Error badge colours ──────────────────────────────────────────────────────
const ERROR_BADGE_COLOR = {
  CompilationError : "#ef4444",
  RuntimeError     : "#f97316",
  TimeoutError     : "#a855f7",
  OutputMismatch   : "#eab308",
  ExecutionError   : "#ef4444",
};

// ─── CodeMirror language picker ───────────────────────────────────────────────
const getLangExtension = (lang) => {
  if (lang === "html" || lang === "react") return html();
  if (lang === "css")                       return css();
  if (isJSFamily(lang) || lang === "node") return javascript({ jsx: lang === "react" });
  if (lang === "python")                    return python();
  if (lang === "java")                      return java();
  if (lang === "c" || lang === "cpp")       return cpp();
  if (lang === "dbms")                      return sql();
  return javascript();
};

// ─── Error-line highlight effect & StateField ─────────────────────────────────
const setErrorLineEffect = StateEffect.define();

const errorLineField = StateField.define({
  create: () => Decoration.none,
  update(deco, tr) {
    deco = deco.map(tr.changes);
    for (const e of tr.effects) {
      if (e.is(setErrorLineEffect)) {
        if (e.value === null) {
          deco = Decoration.none;
        } else {
          const lineNo = e.value;
          try {
            const line = tr.state.doc.line(lineNo);
            deco = Decoration.set([
              Decoration.line({ class: "cm-error-line" }).range(line.from),
            ]);
          } catch {
            deco = Decoration.none;
          }
        }
      }
    }
    return deco;
  },
  provide: (f) => EditorView.decorations.from(f),
});

// CSS injected once for error-line highlight
const errorLineCSS = EditorView.baseTheme({
  ".cm-error-line": {
    backgroundColor : "rgba(239,68,68,0.18) !important",
    borderLeft      : "3px solid #ef4444",
  },
});

// ─── CodeMirror React wrapper ─────────────────────────────────────────────────
const CodeEditor = ({ value, onChange, language, errorLine }) => {
  const containerRef = useRef(null);
  const viewRef      = useRef(null);
  const ignoreRef    = useRef(false); // prevent echo-back loop

  // Build or rebuild editor when language changes
  useEffect(() => {
    const extensions = [
      basicSetup,
      oneDark,
      getLangExtension(language),
      errorLineField,
      errorLineCSS,
      EditorView.updateListener.of((update) => {
        if (update.docChanged && !ignoreRef.current) {
          onChange(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        "&"             : { height: "100%", fontSize: "14px", fontFamily: "'Fira Code', 'Cascadia Code', monospace" },
        ".cm-scroller"  : { overflow: "auto" },
        ".cm-content"   : { padding: "12px 0" },
      }),
    ];

    const state = EditorState.create({ doc: value, extensions });
    const view  = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => { view.destroy(); viewRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]); // rebuild only when language changes

  // Sync external value changes into the editor (e.g. Reset)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current === value) return;
    ignoreRef.current = true;
    view.dispatch({
      changes: { from: 0, to: current.length, insert: value },
    });
    ignoreRef.current = false;
  }, [value]);

  // Highlight error line whenever it changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: setErrorLineEffect.of(errorLine ?? null) });
  }, [errorLine]);

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", width: "100%", overflow: "hidden", borderRadius: "6px" }}
    />
  );
};

// ─── Feedback Panel ───────────────────────────────────────────────────────────
const FeedbackPanel = ({ isSuccess, score, tries, executionTime, errorType, hint, expected, status, errorLine }) => {
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
        <span
          className="feedback-badge"
          style={{ background: ERROR_BADGE_COLOR[errorType] || "#ef4444" }}
        >
          ❌ {errorType || "Wrong Answer"}
        </span>
        {/* ── NEW: show errorLine when available ── */}
        {errorLine && (
          <span
            style={{
              marginLeft   : "10px",
              fontSize     : "0.82rem",
              color        : "#fca5a5",
              background   : "rgba(239,68,68,0.15)",
              border       : "1px solid rgba(239,68,68,0.4)",
              borderRadius : "4px",
              padding      : "2px 8px",
            }}
          >
            📍 Error on line {errorLine}
          </span>
        )}
      </div>
      {expected !== undefined && (
        <div className="feedback-section">
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "6px" }}>
            Expected Output:
          </div>
          <pre className="feedback-raw" style={{ color: "#86efac" }}>
            {String(expected ?? "")}
          </pre>
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

// ─── Main Compiler ────────────────────────────────────────────────────────────
const Compiler = ({
  LessonId,
  language: fixedLanguage,
  initialCode = "",
  expectedOutput,
  onSuccess,
  hint: lessonHint,
}) => {
  const [language, setLanguage]           = useState(fixedLanguage || "html");
  const [code, setCode]                   = useState(initialCode);
  const [tries, setTries]                 = useState(0);
  const [score, setScore]                 = useState(null);

  const [isSuccess, setIsSuccess]         = useState(false);
  const [errorType, setErrorType]         = useState(null);
  const [errorLine, setErrorLine]         = useState(null);
  const [errorMessage, setErrorMessage]   = useState("");
  const [activeHint, setActiveHint]       = useState("");
  const [executionTime, setExecutionTime] = useState(0);
  const [expected, setExpected]           = useState(undefined);
  const [got, setGot]                     = useState(undefined);
  const [status, setStatus]               = useState("");

  const iframeRef    = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => { startTimeRef.current = Date.now(); }, [LessonId]);

  // ── copy / download ──────────────────────────────────────────────────────
  const copyCode = async () => {
    try   { await navigator.clipboard.writeText(code); setStatus("📋 Code copied!"); }
    catch { setStatus("Failed to copy code"); }
  };

  const downloadCode = () => {
    const extensions = {
      html: "html", css: "css", js: "js", react: "jsx",
      python: "py", java: "java", c: "c", cpp: "cpp",
    };
    const ext  = extensions[language] || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href     = URL.createObjectURL(blob);
    link.download = `codevibe-code.${ext}`;
    link.click();
    URL.revokeObjectURL(link.href);
    setStatus("⬇️ Code downloaded!");
  };

  // ── progress ─────────────────────────────────────────────────────────────
  const saveProgress = (lessonId, sc, attempt) => {
    const email = localStorage.getItem("userEmail");
    window.dispatchEvent(
      new CustomEvent("codevibe-progress-updated", { detail: { lessonId, score: sc } })
    );
    const learningTime = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    axios
      .post(`${API_BASE_URL}/api/lesson/${lessonId}/complete`, { email, score: sc, learningTime })
      .catch((err) => console.error("Save progress error:", err));
    onSuccess?.({ LessonId: lessonId, score: sc, tries: attempt });
  };

  // ── decide pass/fail ─────────────────────────────────────────────────────
  const decide = (got, ctx = {}) => {
    if (typeof expectedOutput === "function") return !!expectedOutput(got, ctx);
    if (expectedOutput instanceof RegExp)     return expectedOutput.test(String(got ?? ""));
    if (typeof expectedOutput === "string" || typeof expectedOutput === "number")
      return String(got ?? "").trim() === String(expectedOutput).trim();
    return false;
  };

  // ── pass / fail ──────────────────────────────────────────────────────────
  const pass = (attempt, ms = 0) => {
    const sc = SCORING(attempt);
    setScore(sc); setIsSuccess(true); setErrorType(null);
    setErrorMessage(""); setActiveHint(""); setExecutionTime(ms);
    setExpected(undefined); setGot(undefined); setStatus("");
    setErrorLine(null);
    saveProgress(LessonId, sc, attempt);
  };

  const fail = ({ type = "OutputMismatch", message = "", hint = "", line = null, ms = 0, exp, got: gotVal } = {}) => {
    setIsSuccess(false); setErrorType(type); setErrorLine(line);
    setErrorMessage(message);
    setActiveHint(lessonHint || hint || "💡 Review your code carefully and compare it with the example in the lesson.");
    setExecutionTime(ms); setExpected(exp); setGot(gotVal); setStatus("");
  };

  // ── keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "Enter") { e.preventDefault(); runCode(); }
      if (e.ctrlKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setCode(initialCode); setStatus(""); setIsSuccess(false);
        setErrorType(null); setErrorMessage(""); setActiveHint("");
        setScore(null); setErrorLine(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, initialCode, language, tries]);

  // ── client-side runners ──────────────────────────────────────────────────
  const runHTML = (attempt, iframeDoc) => {
    iframeDoc.open(); iframeDoc.write(code); iframeDoc.close();
    setTimeout(() => {
      let expVal = "";
      if (typeof expectedOutput !== "function") {
        const tempIframe = document.createElement("iframe");
        tempIframe.style.display = "none";
        document.body.appendChild(tempIframe);
        try {
          const tempDoc = tempIframe.contentDocument || tempIframe.contentWindow.document;
          tempDoc.open(); tempDoc.write(expectedOutput || ""); tempDoc.close();
          expVal = normalizeHTML(tempDoc.body?.innerHTML);
        } catch (e) { console.error("Error rendering expectedOutput:", e); }
        finally { document.body.removeChild(tempIframe); }
      }
      const gotVal   = normalizeHTML(iframeDoc.body?.innerHTML);
      const isCorrect = typeof expectedOutput === "function"
        ? expectedOutput(iframeDoc.body?.innerHTML)
        : gotVal === expVal;
      if (isCorrect) pass(attempt);
      else fail({ type: "OutputMismatch", message: "", exp: expVal, got: gotVal });
    }, 250);
  };

  const runCSS = (attempt, iframeDoc, iframeWin) => {
    if (typeof expectedOutput !== "object" || Array.isArray(expectedOutput) || expectedOutput === null) {
      fail({ type: "ExecutionError", message: "expectedOutput for CSS must be an object." });
      return;
    }
    const selectorHTML = Object.keys(expectedOutput).map((sel) => {
      if (sel.startsWith(".")) return `<div class="${sel.slice(1)}">Test</div>`;
      if (sel.startsWith("#")) return `<div id="${sel.slice(1)}">Test</div>`;
      if (sel.includes(" ")) {
        const [outer, inner] = sel.split(" ");
        return `<div class="${outer.replace(".","")}"><div class="${inner.replace(".","")}">Test</div></div>`;
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
          if (comp[prop] !== expProp)
            mismatches.push(`${selector} → ${prop}: expected "${expProp}", got "${comp[prop]}"`);
        }
      }
      if (!mismatches.length) pass(attempt);
      else fail({ type: "OutputMismatch", message: mismatches.join("\n"), exp: "Matching CSS properties", got: mismatches.join("\n") });
    }, 300);
  };

  const runJSFamily = (attempt, iframeDoc) => {
    iframeDoc.open();
    iframeDoc.write(`
      <html><body>
        <pre id="out"></pre>
        <script>(function(){
          try {
            const out=document.getElementById('out');const logs=[];
            const oldLog=console.log;
            console.log=(...args)=>{logs.push(args.join(" "));try{oldLog(...args)}catch(e){};out.textContent=logs.join("\\n");};
            const killer=setTimeout(()=>{throw new Error("Timeout");},1500);
            ${code}
            clearTimeout(killer);
          } catch(e){document.body.textContent="Error: "+(e?.message||e);}
        })();<\/script>
      </body></html>`);
    iframeDoc.close();
    setTimeout(() => {
      const gotVal = (iframeDoc.body?.innerText || "").trim();
      const expStr = typeof expectedOutput === "string" ? expectedOutput : "[use function/regex]";
      if (gotVal.startsWith("Error:")) {
        const errMsg = gotVal.replace(/^Error:\s*/,"");
        fail({ type: errMsg.toLowerCase().includes("timeout") ? "TimeoutError" : "RuntimeError", message: gotVal, exp: expStr, got: gotVal });
      } else if (decide(gotVal)) { pass(attempt); }
      else { fail({ type: "OutputMismatch", message: "", exp: expStr, got: gotVal }); }
    }, 300);
  };

  const runReact = (attempt, iframeDoc) => {
    const html = `<html>
      <head>
        <meta charset="utf-8"/>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      </head>
      <body>
        <div id="root"></div><pre id="out"></pre>
        <script type="text/babel">
          try {
            const out=document.getElementById('out');const logs=[];
            const oldLog=console.log;
            console.log=(...args)=>{logs.push(args.join(' '));try{oldLog(...args)}catch(_){};out.textContent=logs.join("\\n");};
            const killer=setTimeout(()=>{throw new Error('Timeout');},2000);
            ${code}
            const rootEl=document.getElementById('root');
            const root=ReactDOM.createRoot(rootEl);
            if(typeof App==='function') root.render(React.createElement(App));
            clearTimeout(killer);
          } catch(e){document.body.textContent='Error: '+(e?.message||e);}
        </script>
      </body></html>`;
    iframeDoc.open(); iframeDoc.write(html); iframeDoc.close();
    setTimeout(() => {
      const gotVal = (iframeDoc.body?.innerText || "").trim();
      if (gotVal.startsWith("Error:")) fail({ type: "RuntimeError", message: gotVal, got: gotVal });
      else if (decide(gotVal))         pass(attempt);
      else                             fail({ type: "OutputMismatch", message: "", got: gotVal });
    }, 700);
  };

  // ── server runner ─────────────────────────────────────────────────────────
  const runServer = async (attempt) => {
    setStatus("⏳ Running on server..."); setIsSuccess(false);
    setErrorType(null); setErrorMessage("");
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/execute/${language}`,
        { email: localStorage.getItem("userEmail") || "guest@example.com", code },
        { timeout: 12000 }
      );
      const out = String(res.data.output ?? "").trim();
      const ms  = res.data.executionTime || 0;
      setStatus("");
      if (decide(out)) pass(attempt, ms);
      else {
        const expStr = typeof expectedOutput === "string" ? expectedOutput : "[use function/regex]";
        fail({ type: "OutputMismatch", message: "", exp: expStr, got: out, ms });
      }
    } catch (e) {
      const data = e?.response?.data || {};
      fail({
        type    : data.errorType     || "ExecutionError",
        message : data.stderr        || data.error || e?.message || String(e),
        hint    : data.hint          || "",
        line    : data.errorLine     || null,   // ← now wired to editor highlight
        ms      : data.executionTime || 0,
      });
      setStatus("");
    }
  };

  // ── orchestrator ──────────────────────────────────────────────────────────
  const runCode = async () => {
    const isFirstPass = score === null;
    const attempt     = isFirstPass ? tries + 1 : tries;
    if (isFirstPass) { setTries(attempt); setScore(null); }
    setIsSuccess(false); setErrorType(null);
    setErrorMessage(""); setActiveHint(""); setStatus("⏳ Running...");

    const iframe    = iframeRef.current;
    const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
    const iframeWin = iframe?.contentWindow;

    if (!iframeDoc && !serverLanguages.includes(language)) {
      fail({ type: "ExecutionError", message: "Iframe not ready" }); return;
    }
    if (serverLanguages.includes(language)) return runServer(attempt);
    if (language === "html")                return runHTML(attempt, iframeDoc);
    if (language === "css")                 return runCSS(attempt, iframeDoc, iframeWin);
    if (isJSFamily(language))              return runJSFamily(attempt, iframeDoc);
    if (language === "react")              return runReact(attempt, iframeDoc);
    fail({ type: "ExecutionError", message: "Unsupported language." });
  };

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="compiler">
      {!fixedLanguage && (
        <select
          value={language}
          onChange={(e) => { setLanguage(e.target.value); setErrorLine(null); }}
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

        {/* ── CodeMirror 6 editor (replaces <textarea>) ── */}
        <div className="compiler-codemirror-wrap">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
          />
        </div>
      </div>

      {/* action row */}
      <div className="compiler-actions">
        <button title="Run (Ctrl + Enter)" onClick={runCode} className="compiler-btn compiler-btn--run">
          ▶ Run
        </button>
        <button
          title="Reset (Ctrl + R)"
          onClick={() => {
            setCode(initialCode); setStatus(""); setIsSuccess(false);
            setErrorType(null); setErrorMessage(""); setActiveHint("");
            setScore(null); setErrorLine(null);
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
        sandbox="allow-scripts"
      />

      {/* feedback panel */}
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