import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleViewReport = (course) => {
    // yaha course select karke report page pe bhejenge
    navigate(`/report/${user.email}?course=${course}`);
  };

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        ⚠️ Please login or signup first!
      </p>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.username} 🎉</h1>
        <button
          style={{
            minHeight: "44px",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            background: "linear-gradient(135deg, var(--primary-red), var(--secondary-pink))",
            color: "var(--white)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.95rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 0 15px rgba(255, 77, 109, 0.4)",
          }}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px) scale(1.05)";
            e.target.style.boxShadow = "0 0 25px rgba(255, 77, 109, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "none";
            e.target.style.boxShadow = "0 0 15px rgba(255, 77, 109, 0.4)";
          }}
        >
          <FaSignOutAlt style={{ color: "var(--white)" }} />
          Logout
        </button>
      </div>

      <div className="dashboard-card" style={{ color: "black", width: "100%", maxWidth: "600px" }}>
        <p><strong>👤 Username:</strong> {user.username}</p>
        <p><strong>📧 Email:</strong> {user.email}</p>
        <p><strong>🏫 College:</strong> {user.college}</p>
        <p><strong>🎓 Year:</strong> {user.year}</p>
      </div>

      {/* Courses to view progress */}
      <div className="courses" style={{ width: "100%", maxWidth: "600px" }}>
        {["HTML","CSS","JavaScript","OOP","DSA","DBMS","MongoDB","Node.js","Express.js","React.js"].map((c) => (
          <button
            key={c}
            onClick={() => handleViewReport(c)}
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #ff113d, #ff4d6d, #ff85a1)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "600",
              minHeight: "44px",
              transition: "all 0.3s ease",
              boxShadow: "0 0 15px rgba(255, 77, 109, 0.4)",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px) scale(1.05)";
              e.target.style.boxShadow = "0 0 25px rgba(255, 77, 109, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "0 0 15px rgba(255, 77, 109, 0.4)";
            }}
          >
            View {c} Progress
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
