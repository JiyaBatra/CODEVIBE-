import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiUrl } from "../config/api.js";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setResponseMsg("Invalid or missing reset token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResponseMsg("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(apiUrl("/api/auth/reset-password"), {
        token,
        newPassword,
      });
      setResponseMsg(res.data.message);

      if (res.data.success) {
        setTimeout(() => navigate("/login"), 1500); // auto redirect after success
      }
    } catch (err) {
      setResponseMsg(err.response?.data?.message || "Something went wrong");
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
            <label>NEW PASSWORD:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label>CONFIRM PASSWORD:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Reset Password</button>
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
