import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";

/**
 * OAuthCallback
 *
 * Landing page for the Google OAuth redirect. The backend redirects the browser
 * to /#/auth/success?token=<JWT>&user=<encoded-JSON> after a successful login.
 * This component reads those params, stores them via useAuth().login(), then
 * sends the user on to /dashboard.
 */
const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const userRaw = searchParams.get("user");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(errorParam);
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    if (!token || !userRaw) {
      setError("Missing authentication data. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userRaw));
      login(user, token);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Failed to parse authentication data. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [location.search, login, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary, #0f0f1a)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {error ? (
        <>
          <p style={{ color: "#ff4d6d", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            ❌ {error}
          </p>
          <p style={{ color: "#aaa", fontSize: "0.9rem" }}>Redirecting to login…</p>
        </>
      ) : (
        <>
          {/* Simple CSS spinner */}
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid rgba(255,255,255,0.15)",
              borderTop: "4px solid #7c3aed",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              marginBottom: "1.25rem",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: "1rem", color: "#ccc" }}>Signing you in with Google…</p>
        </>
      )}
    </div>
  );
};

export default OAuthCallback;
