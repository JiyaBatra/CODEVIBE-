import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE from "../config";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/reset-password`, {
        Email: email,
        otp,
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

        <label>EMAIL:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <label>NEW PASSWORD:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>

        {responseMsg && <p style={{ color: "white" }}>{responseMsg}</p>}

        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
