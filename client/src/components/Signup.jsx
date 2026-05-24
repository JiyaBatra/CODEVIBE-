import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/lessons";

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // College validation
    if (!/^[A-Za-z\s]+$/.test(college)) {
      setResponseMsg("College name should contain only letters");
      return;
    }

    // Year validation
    if (!/^\d{4}$/.test(year)) {
      setResponseMsg("Year must be exactly 4 digits");
      return;
    }

    // Email validation
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]{2,}$/.test(email)) {
    setResponseMsg("Enter a valid email address");
    return;
    }

    // Password validation
    if (password.length < 6) {
      setResponseMsg("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setResponseMsg("");

    if (!passwordRegex.test(password)) {
      setResponseMsg(
        "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        Email: email,
        password,
        college,
        year,
      });

      setResponseMsg(response.data.message);

      if (response.data.success) {
        localStorage.setItem(
          "userEmail",
          response.data.user.email || response.data.user.Email || "",
        );

        login(response.data.user, response.data.token);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(
        "❌ Signup error",
        error.response?.data || error.message,
        error,
      );

      setResponseMsg(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

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
              onChange={(e) => {
                const value = e.target.value;

                // allow only numbers and max length 4
                if (/^\d{0,4}$/.test(value)) {
                  setYear(value);
                }
              }}
              maxLength={4}
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
              required
            />
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: "-10px",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.
            </p>

            {responseMsg && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {responseMsg}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "LOADING..." : "SUBMIT"}
            </button>
            {responseMsg && (
                <p style={{ color: "red", marginTop: "10px" }}>{responseMsg}</p>
              )}

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
