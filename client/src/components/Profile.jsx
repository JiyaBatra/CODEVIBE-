import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        Please login or signup first!
      </p>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Profile</h1>
        <Link
          to="/Dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "var(--white)",
            fontWeight: 600,
          }}
        >
          <FaTachometerAlt />
          Back to Dashboard
        </Link>
      </div>

      <div className="dashboard-card" style={{ color: "black", width: "100%", maxWidth: "600px" }}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>College:</strong> {user.college}</p>
        <p><strong>Year:</strong> {user.year}</p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/Dashboard")}
        style={{
          marginTop: "1.5rem",
          minHeight: "44px",
          padding: "0.8rem 1.5rem",
          borderRadius: "8px",
          background: "linear-gradient(135deg, var(--primary-red), var(--secondary-pink))",
          color: "var(--white)",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        View course progress
      </button>
    </div>
  );
};

export default Profile;
