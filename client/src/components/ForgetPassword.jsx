import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import API_BASE from "../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/forgot-password`, {
        Email: email,
      });
      setResponseMsg(res.data.message);
    } catch (err) {
      setResponseMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>

        <label>EMAIL:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send OTP</button>

        {responseMsg && <p style={{ color: "white" }}>{responseMsg}</p>}

        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
