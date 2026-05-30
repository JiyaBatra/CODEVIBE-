import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          fontSize: "5rem",
          lineHeight: 1,
          marginBottom: "16px",
        }}
        aria-hidden="true"
      >
        404
      </div>

      <h1
        style={{
          color: "white",
          fontSize: "2rem",
          margin: "0 0 12px",
          fontWeight: "700",
        }}
      >
        Page Not Found
      </h1>

      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          maxWidth: "520px",
          margin: "0 0 28px",
          lineHeight: 1.6,
        }}
      >
        The page you are looking for does not exist or may have been moved.
        Head back to the courses page to continue learning.
      </p>

      <Link
        to="/lessons"
        style={{
          display: "inline-block",
          padding: "12px 28px",
          borderRadius: "30px",
          background: "linear-gradient(135deg, rgba(255,77,109,0.35), rgba(255,255,255,0.12))",
          color: "white",
          textDecoration: "none",
          fontWeight: "600",
          border: "1px solid rgba(255,77,109,0.45)",
          boxShadow: "0 0 18px rgba(255,77,109,0.2)",
        }}
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
