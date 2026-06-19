import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";
import PasswordField from "./PasswordField";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import Dropdown from "./common/Dropdown";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    college: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponseMsg("");
    setPasswordErrors([]);

    // 🔐 Frontend validations
    if (!formData.year) {
      setResponseMsg("Please select your year");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setResponseMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          college: formData.college.trim(),
          year: formData.year,
          password: formData.password,
        }
      );

      const data = res.data;

      if (data.success) {
        setResponseMsg(data.message || "Account created successfully 🎉");

        // Authenticate the user automatically after successful registration
        login(data.user, data.token);

        setTimeout(() => {
          navigate("/dashboard", { state: location.state });
        }, 1200);
      } else {
        // backend rejected but 200 OK case
        setResponseMsg(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("❌ Signup error:", error.response?.data || error.message);

      // Handle password validation errors from backend
      if (error.response?.data?.passwordErrors) {
        setPasswordErrors(error.response.data.passwordErrors);
        setResponseMsg("Password does not meet security requirements");
      } else {
        const msg =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        setResponseMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section" id="signup">
      <div className="login-container">

        {/* Left Image */}
        <div className="login-image">
          <img src={registerImage} alt="Signup" />
        </div>

        {/* Form */}
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>

            <h1>Create Account</h1>

            {/* Username */}
            <label>USERNAME:</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />

            {/* College */}
            <label>COLLEGE NAME:</label>
            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Enter college name"
              required
            />

            {/* Year */}
            <label>YEAR:</label>
            <Dropdown
              value={formData.year}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, year: val }))
              }
              options={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
              placeholder="Select Year"
              style={{ width: "100%" }}
            />

            {/* Email */}
            <label>EMAIL:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />

            {/* Password */}
            <PasswordField
              id="password"
              label="PASSWORD:"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <PasswordStrengthIndicator password={formData.password} />
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

            {/* Confirm Password */}
            <PasswordField
              id="confirmPassword"
              label="CONFIRM PASSWORD:"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />

            {/* Submit */}
            <button type="submit" disabled={loading}>
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>

            <div style={{ textAlign: "center", margin: "15px 0", color: "#ccc", fontSize: "0.9rem" }}>
              OR
            </div>

            <button
              type="button"
              onClick={() => window.location.href = `${API_BASE_URL}/api/auth/google`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "white",
                color: "#333",
                border: "none",
                width: "100%",
                padding: "12px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>

            {/* Message */}
            {responseMsg && (
              <p style={{ color: "#fff", marginTop: "10px" }}>
                {responseMsg}
              </p>
            )}

            {/* Login */}
            <p>
              Already have an account?{" "}
              <Link to="/login" state={location.state}>
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;