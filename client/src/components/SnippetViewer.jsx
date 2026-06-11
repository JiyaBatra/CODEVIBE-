import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

const LANGUAGE_LABELS = {
  html: "HTML", css: "CSS", js: "JavaScript",
  python: "Python", java: "Java", c: "C", cpp: "C++",
  react: "React (JSX)", node: "Node.js",
  dbms: "DBMS/SQL", mongo: "MongoDB",
  "dsa-js": "DSA (JS)", "oop-js": "OOP (JS)",
};

export default function SnippetViewer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");
    axios
      .get(`${API_BASE_URL}/api/snippets/${slug}`)
      .then((res) => setSnippet(res.data))
      .catch((err) => {
        setError(err.response?.status === 404
          ? "Snippet not found or has expired."
          : "Failed to load snippet.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const copyCode = async () => {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (loading) {
    return (
      <section className="dashboard-shell">
        <div className="dashboard-loading">Loading snippet...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-shell">
        <div className="dashboard-empty">
          <h2>{error}</h2>
          <button className="ghost-button" onClick={() => navigate("/lessons")} style={{ marginTop: "1rem" }}>
            Back to Lessons
          </button>
        </div>
      </section>
    );
  }

  const langLabel = LANGUAGE_LABELS[snippet.language] || snippet.language;
  const dateStr = snippet.createdAt
    ? new Date(snippet.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    : "";

  return (
    <section className="dashboard-shell">
      <div className="snippet-viewer">
        <div className="snippet-header">
          <div className="snippet-title-row">
            <h1 className="snippet-title">{snippet.title}</h1>
            <button className="compiler-btn compiler-btn--copy" onClick={copyCode}>
              {copied ? "✅ Copied!" : "📋 Copy Code"}
            </button>
          </div>
          <div className="snippet-meta">
            {snippet.username && <span className="snippet-meta-item">👤 {snippet.username}</span>}
            <span className="snippet-meta-item">🔤 {langLabel}</span>
            {snippet.lessonId && <span className="snippet-meta-item">📚 {snippet.lessonId}</span>}
            {snippet.score !== null && snippet.score !== undefined && (
              <span className="snippet-meta-item">🏆 Score: {snippet.score}</span>
            )}
            {dateStr && <span className="snippet-meta-item">📅 {dateStr}</span>}
          </div>
        </div>

        <div className="snippet-code-block">
          <pre className={`snippet-code language-${snippet.language}`}>
            <code>{snippet.code}</code>
          </pre>
        </div>

        <div className="snippet-footer">
          <button className="ghost-button" onClick={() => navigate("/lessons")}>
            ← Back to Lessons
          </button>
        </div>
      </div>
    </section>
  );
}
