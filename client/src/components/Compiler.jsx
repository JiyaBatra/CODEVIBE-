// src/components/Compiler.jsx
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const SCORING = (attempt) =>
  attempt === 1 ? 100 :
  attempt === 2 ? 80  :
  attempt === 3 ? 60  :
  attempt === 4 ? 40  :
  attempt === 5 ? 20  : 0;

const isJSFamily = (lang) => ["js", "dsa-js", "oop-js"].includes(lang);
const serverLanguages = ["c","cpp","python","java","node","dbms","mongo"];

const normalizeHTML = (s = "") => String(s).trim().replace(/\s+/g, " ");

const Compiler = ({ LessonId, language: fixedLanguage, initialCode = "", expectedOutput, onSuccess }) => {
  const [language, setLanguage] = useState(fixedLanguage || "html");
  const [code, setCode] = useState(initialCode);
  const [tries, setTries] = useState(0);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const iframeRef = useRef(null);
  const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code);
    setStatus("📋 Code copied!");
  } catch {
    setError("Failed to copy code");
  }
};

const downloadCode = () => {
  const extensions = {
    html: "html",
    css: "css",
    js: "js",
    react: "jsx",
    python: "py",
    java: "java",
    c: "c",
    cpp: "cpp"
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

  const saveProgress = (lessonId, sc, attempt) => {
    const email = localStorage.getItem("userEmail");
    window.dispatchEvent(
      new CustomEvent("codevibe-progress-updated", {
        detail: { lessonId, score: sc },
      })
    );
    axios.post(`${API_BASE_URL}/api/lesson/${lessonId}/complete`, { email, score: sc })
      .catch(err => console.error("Save progress error:", err));
    onSuccess?.({ LessonId: lessonId, score: sc, tries: attempt });
  };

  const decide = (got, ctx = {}) => {
    if (typeof expectedOutput === "function") return !!expectedOutput(got, ctx);
    if (expectedOutput instanceof RegExp) return expectedOutput.test(String(got ?? ""));
    if (typeof expectedOutput === "string" || typeof expectedOutput === "number")
      return String(got ?? "").trim() === String(expectedOutput).trim();
    return false;
  };

  const pass = (attempt) => {
    const sc = SCORING(attempt);
    setScore(sc);
    saveProgress(LessonId, sc, attempt);
    setStatus("✅ Correct!");
    setError("");
  };

  const fail = (msg) => {
    setError(msg);
    setStatus("❌ Try again!");
  };

  // ------------------- client-side runners -------------------

  const runHTML = (attempt, iframeDoc) => {
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
    setTimeout(() => {
      const got = normalizeHTML(iframeDoc.body?.innerHTML);
      if (decide(got)) pass(attempt);
      else fail(`Output mismatch\nExpected:\n${normalizeHTML(expectedOutput || "")}\nGot:\n${got}`);
    }, 250);
  };

  const runCSS = (attempt, iframeDoc, iframeWin) => {
    if (typeof expectedOutput !== "object" || Array.isArray(expectedOutput) || expectedOutput === null) {
      fail("expectedOutput for CSS must be an object like { 'h1': { color: 'rgb(...)' } }");
      return;
    }
    const selectorHTML = Object.keys(expectedOutput).map(sel => {
      if (sel.startsWith(".")) return `<div class="${sel.slice(1)}">Test</div>`;
      if (sel.startsWith("#")) return `<div id="${sel.slice(1)}">Test</div>`;
      if (sel.includes(" ")) {
        const parts = sel.split(" ");
        const outer = parts[0].replace(".", "");
        const inner = parts[1].replace(".", "");
        return `<div class="${outer}"><div class="${inner}">Test</div></div>`;
      }
      return `<${sel}>Test</${sel}>`;
    }).join("\n");

    iframeDoc.open();
    iframeDoc.write(`<html><head><style>${code}</style></head><body>${selectorHTML}</body></html>`);
    iframeDoc.close();

    setTimeout(() => {
      let allOk = true;
      const mismatches = [];
      for (const selector of Object.keys(expectedOutput)) {
        const el = iframeDoc.querySelector(selector);
        if (!el) { mismatches.push(`Element "${selector}" not found`); allOk = false; continue; }
        const comp = iframeWin.getComputedStyle(el);
        const exp = expectedOutput[selector];
        for (const prop of Object.keys(exp)) {
          if (comp[prop] !== exp[prop]) { mismatches.push(`${selector} → ${prop}: expected "${exp[prop]}", got "${comp[prop]}"`); allOk = false; }
        }
      }
      if (allOk || decide(true, { language: "css", code, document: iframeDoc, window: iframeWin })) pass(attempt);
      else fail("CSS check failed:\n" + mismatches.join("\n"));
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
      const got = (iframeDoc.body?.innerText || "").trim();
      if (decide(got)) pass(attempt);
      else fail(`Output mismatch\nExpected:\n${typeof expectedOutput === "string" ? expectedOutput : "[use function/regex]"}\nGot:\n${got}`);
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
      const got = (iframeDoc.body?.innerText || "").trim();
      if (decide(got)) pass(attempt);
      else fail(`React check failed.\nGot:\n${got}`);
    }, 700);
  };

  // ------------------- server-side runner -------------------

  const runServer = async (attempt) => {
    try {
      setStatus("⏳ Running on server...");
      setError("");
      const res = await axios.post(`${API_BASE_URL}/api/execute/${language}`, {
        email: localStorage.getItem("userEmail") || "guest@example.com",
        code
      }, { timeout: 12000 });
      const out = String(res.data.output ?? "").trim();
      if (decide(out)) pass(attempt);
      else fail(`Server output mismatch\nGot:\n${out}`);
    } catch (e) {
      const errMsg = e?.response?.data?.error || e?.response?.data?.message || e?.message || String(e);
      fail("Server execution error: " + errMsg);
    }
  };

  // ------------------- orchestrator -------------------
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }

    if (e.ctrlKey && e.key.toLowerCase() === "r") {
      e.preventDefault();

      setCode(initialCode);
      setStatus("");
      setError("");
      setScore(null);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [code, initialCode, language, tries]);
  const runCode = async () => {
    const isFirstPass = score === null;
    const attempt = isFirstPass ? tries + 1 : tries;

    if (isFirstPass) {
      setTries(attempt);
      setScore(null);
    }

    setError("");
    setStatus("⏳ Running...");
    const iframe = iframeRef.current;
    const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
    const iframeWin = iframe?.contentWindow;

    if (!iframeDoc && !serverLanguages.includes(language)) { fail("Iframe not ready"); return; }

    if (serverLanguages.includes(language)) return runServer(attempt);
    if (language === "html") return runHTML(attempt, iframeDoc);
    if (language === "css") return runCSS(attempt, iframeDoc, iframeWin);
    if (isJSFamily(language)) return runJSFamily(attempt, iframeDoc);
    if (language === "react") return runReact(attempt, iframeDoc);
    fail("Unsupported language in this setup.");
  };

  return (
    <div className="compiler" style={{ color: "#fff", background: "#111", padding: 16, borderRadius: 12 }}>
      {!fixedLanguage && (
       <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          backgroundColor: "#1f1f1f",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #4f46e5",
    outline: "none",
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
    cursor: "pointer",
    minWidth: "140px",
        }}
      >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
          <option value="react">React (JSX)</option>
        </select>
      )}

      <div style={{ position: "relative", marginTop: 12 }}>

  <div
    style={{
      position: "absolute",
      top: 10,
      right: 10,
      display: "flex",
      gap: 8,
      zIndex: 10
    }}
  >
    <button
      title="Copy Code"
      onClick={copyCode}
      style={{
        background: "#059669",
        color: "white",
        border: "none",
        borderRadius: 15,
        padding: "6px 10px",
        cursor: "pointer",
        fontSize: 12
      }}
    >
      📋 Copy
    </button>

    <button
      title="Download Code"
      onClick={downloadCode}
      style={{
        background: "#7c3aed",
        color: "white",
        border: "none",
        borderRadius: 15,
        padding: "6px 10px",
        cursor: "pointer",
        fontSize: 12
      }}
    >
      Download
    </button>
  </div>

  <textarea
    value={code}
    onChange={e => setCode(e.target.value)}
    style={{
      width: "100%",
      height: 180,
      background: "#1b1b1b",
      color: "#9efc9e",
      padding: 12,
      borderRadius: 8
    }}
    placeholder={`// Type your code here. Use console.log for JS outputs.\n// For React define function App(){ return <h1>Hello</h1> }\n// Server languages will be executed by backend: POST /api/execute/:language`}
  />
</div>

<div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>

  <button
    title="Run (Ctrl + Enter)"
    onClick={runCode}
    style={{
      padding: "8px 14px",
      background: "#2563eb",
      color: "#fff",
      borderRadius: 10
    }}
  >
    Run
  </button>

  <button
    title="Reset (Ctrl + R)"
    onClick={() => {
      setCode(initialCode);
      setStatus("");
      setError("");
      setScore(null);
    }}
    style={{
      padding: "8px 14px",
      background: "#374151",
      color: "#fff",
      borderRadius: 10
    }}
  >
    Reset
  </button>

</div>

      <iframe ref={iframeRef} style={{ width: "100%", height: 220, background: "#fff", marginTop: 12, borderRadius: 8 }}
        title="code-output" sandbox="allow-scripts allow-same-origin"
      />

      {status && <p style={{ marginTop: 8, opacity: 0.95 }}>{status}</p>}
      {error && <pre style={{ color: "tomato", whiteSpace: "pre-wrap" }}>{error}</pre>}
      {score !== null && <p style={{ color: "#22c55e" }}>✅ Correct! Score: {score}</p>}
    </div>
  );
};

export default Compiler;
