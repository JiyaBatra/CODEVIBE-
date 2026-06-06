import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";
import API_BASE_URL from "../config/api";
import loginImage from "../assets/loginImage.png";
import PasswordField from "./PasswordField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/lessons";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {
      email: email.trim() ? "" : "Email is required",
      password: password.trim() ? "" : "Password is required",
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setLoading(true);
    setResponseMsg("");

    try {
      console.log(
        "Login API:",
        `${API_BASE_URL}/api/auth/login`
      );

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      console.log("✅ Login successful:", response.data);

      if (response.data.success) {
        setResponseMsg(
          response.data.message || "Login successful"
        );

        localStorage.setItem(
          "userEmail",
          response.data.user?.email || ""
        );

        login(response.data.user, response.data.token);

        navigate(from, { replace: true });
      } else {
        setResponseMsg(
          response.data.message || "Login failed"
        );
      }
    } catch (error) {
      console.error(
        "❌ Login error:",
        error.response?.data || error.message
      );

      setResponseMsg(
        error.response?.data?.message ||
          "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section" id="login">
      <div className="login-container">
        
        <div className="login-image">
        <img
  src={loginImage}
  alt="Login"
  loading="lazy"
  style={{
    width: "100%",
    maxWidth: "500px",
    height: "auto",
  }}
/>
        </div>

        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <h1>Hello, Welcome!</h1>

            <label htmlFor="email">EMAIL:</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                const nextEmail = e.target.value;
                setEmail(nextEmail);
                setErrors((prev) => ({
                  ...prev,
                  email: nextEmail.trim() ? "" : "Email is required",
                }));
              }}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              style={{
                border: errors.email
                  ? "1px solid #ff4d6d"
                  : "",
              }}
            />

            {errors.email && (
              <p
                id="email-error"
                style={{
                  color: "#ff4d6d",
                  fontSize: "0.85rem",
                  marginTop: "5px",
                }}
              >
                {errors.email}
              </p>
            )}

            <PasswordField
              id="login-password"
              label="PASSWORD:"
              value={password}
              onChange={(e) => {
                const nextPassword = e.target.value;
                setPassword(nextPassword);
                setErrors((prev) => ({
                  ...prev,
                  password: nextPassword.trim() ? "" : "Password is required",
                }));
              }}
            />

            {errors.password && (
              <p
                style={{
                  color: "#ff4d6d",
                  fontSize: "0.85rem",
                  marginTop: "5px",
                }}
              >
                {errors.password}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "SUBMITTING..." : "SUBMIT"}
            </button>

            {responseMsg && (
              <p
                style={{
                  color: "white",
                  marginTop: "10px",
                }}
              >
                {responseMsg}
              </p>
            )}

            <p>
              Don't have an account?{" "}
              <Link to="/signup" state={location.state}>Signup</Link>
            </p>

            <p>
              Forgot Password?{" "}
              <Link to="/ForgetPassword">
                Click Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;
