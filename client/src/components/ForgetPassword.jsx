import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import forgotPic from "../assets/forgotPassword.png"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");
    try {
      const backendUrl = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "::1" || window.location.hostname.startsWith("192.168."))
        ? "http://localhost:5002" 
        : "https://codevibe-3.onrender.com";
      
      console.log("Selected Backend URL:", backendUrl);
      console.log("Current Hostname:", window.location.hostname);
        
      const res = await axios.post(`${backendUrl}/api/auth/forgot-password`, {
        Email: email,
      });
      setResponseMsg(res.data.message);
    } catch (err) {
      setResponseMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
              <strong style={{color: "var(--primary-red)"}}>Note:</strong> Reset emails are sent via Nodemailer. Ensure EMAIL_USER and EMAIL_PASS are configured.
            </div>

            <label>EMAIL:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

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
