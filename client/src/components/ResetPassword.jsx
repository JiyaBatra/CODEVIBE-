import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API_BASE_URL from "../config/api";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import PasswordField from "./PasswordField";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setResponseMsg("Invalid or missing reset token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setPasswordErrors([]);
    setResponseMsg("");

    if (newPassword !== confirmPassword) {
      setResponseMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      console.log("Using Backend URL:", API_BASE_URL);
      console.log("Current Hostname:", window.location.hostname);

      const res = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        token,
        newPassword,
      });
      setResponseMsg(res.data.message);

      if (res.data.success) {
        setTimeout(() => navigate("/login"), 1500); // auto redirect after success
      }
    } catch (err) {
      // Handle password validation errors from backend
      if (err.response?.data?.passwordErrors) {
        setPasswordErrors(err.response.data.passwordErrors);
        setResponseMsg("Password does not meet security requirements");
      } else {
        setResponseMsg(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>

        {!token ? (
          <p style={{ color: "var(--primary-red)" }}>Missing reset token in URL.</p>
        ) : (
          <>
            <PasswordField
              id="new-password"
              label="NEW PASSWORD:"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {/* Password Strength Indicator */}
            {newPassword && (
              <PasswordStrengthIndicator password={newPassword} />
            )}

            {/* Backend Password Errors */}
            {passwordErrors.length > 0 && (
              <div style={{
                backgroundColor: "rgba(255, 77, 109, 0.1)",
                border: "1px solid #ff4d6d",
                padding: "0.75rem",
                borderRadius: "6px",
                marginTop: "0.75rem",
              }}>
                <p style={{ color: "#ff4d6d", margin: "0 0 0.5rem 0", fontSize: "0.9rem", fontWeight: "600" }}>
                  Password Requirements:
                </p>
                <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "rgba(255, 255, 255, 0.85)" }}>
                  {passwordErrors.map((error, idx) => (
                    <li key={idx} style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <PasswordField
              id="confirm-password"
              label="CONFIRM PASSWORD:"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {responseMsg && <p style={{ color: "white", marginTop: "1rem" }}>{responseMsg}</p>}

        <p style={{marginTop: "1.5rem"}}>
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
