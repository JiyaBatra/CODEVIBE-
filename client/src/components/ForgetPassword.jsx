import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import forgotPic from "../assets/forgotPassword.png"
import { apiUrl } from "../config/api.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(apiUrl("/api/auth/forgot-password"), {
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
        <img src={forgotPic} alt="Forgot image" />
      </div>
      <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Forgot Your Password</h1>
            
            <div style={{ backgroundColor: "rgba(255, 77, 109, 0.1)", border: "1px solid var(--primary-red)", padding: "10px", borderRadius: "8px", marginBottom: "15px", fontSize: "0.85rem", color: "white" }}>
              <strong style={{color: "var(--primary-red)"}}>Developer Note:</strong> Emails are sent using Resend Test Mode and will only be delivered to the verified developer email address.
            </div>

            <label>EMAIL:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Send Reset Link</button>

            {responseMsg && <p style={{ color: "white", marginTop: "1rem", fontSize: "0.9rem" }}>{responseMsg}</p>}

            <p style={{marginTop: "1.5rem"}}>
              Back to <Link to="/login">Login</Link>
            </p>
          </form>
      </div>
     </div>
    </section>
  );
};

export default ForgotPassword;
