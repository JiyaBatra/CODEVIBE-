import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import forgotPic from "../assets/forgotPassword.png";
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
    <section className="login-section">
      <div className="login-container">
        <div className="login-image">
          <img src={forgotPic} alt="Forgot password" />
        </div>
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Forgot Your Password</h1>

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
      </div>
    </section>
  );
};

export default ForgotPassword;
