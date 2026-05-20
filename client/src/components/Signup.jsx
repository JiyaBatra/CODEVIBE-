import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider.jsx';
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        Email: email,   // ✅ lowercase, same as Dashboard
        password,
        college,
        year,
      });

      setResponseMsg(response.data.message);

      if (response.data.success) {
        // Optional auto login
        login(response.data.user, response.data.token);

        // Redirect after success
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Signup Error:", error);

      setResponseMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.username &&
    formData.college &&
    formData.year &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    Object.keys(errors).filter((key) => errors[key]).length === 0;

  return (
    <section className="login-section">
      <div className="login-container">
        {/* Left Image */}
        <div className="login-image">
          <img
            src={registerImage}
            className="registerImage"
            alt="Student Registration"
          />
        </div>

        {/* Signup Form */}
        <div className="login-card">
          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Sign Up Form"
          >
            <h1>Create Your Account</h1>

            <label>USERNAME:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>COLLEGE:</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
            />

            <label>YEAR:</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />

            <label>EMAIL:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>PASSWORD:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint={(
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "-10px", marginBottom: "15px", textAlign: "left" }}>
                  *Password must be at least 6 characters long
                </p>
              )}
            />
            

            <button type="submit" disabled={loading}>
              {loading ? "LOADING..." : "SUBMIT"}
            </button>

            {/* Login Link */}
            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;