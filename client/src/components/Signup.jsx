import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";
import PasswordField from "./PasswordField";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateCollege,
  validateYear,
} from "../utils/validation";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    collegeName: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, username: value }));
    setErrors((prev) => ({
      ...prev,
      username: validateUsername(value),
    }));
  };

  const handleCollegeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, collegeName: value }));
    setErrors((prev) => ({
      ...prev,
      college: validateCollege(value),
    }));
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, year: value }));
    setErrors((prev) => ({
      ...prev,
      year: validateYear(value),
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, confirmPassword: value }));
    setErrors((prev) => ({
      ...prev,
      confirmPassword:
        value !== formData.password ? "Passwords do not match" : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("");

    const newErrors = {
      username: validateUsername(formData.username),
      college: validateCollege(formData.collegeName),
      year: validateYear(formData.year),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords do not match"
          : "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          username: formData.username,
          Email: formData.email,
          college: formData.collegeName,
          year: formData.year,
          password: formData.password,
        }
      );

      console.log("Signup successful:", response.data);

      if (response.data.success) {
        setResponseMsg(
          response.data.message || "Account created successfully"
        );

        setTimeout(() => {
          navigate("/login", { state: location.state });
        }, 1500);
      } else {
        setResponseMsg(
          response.data.message || "Signup failed"
        );
      }
    } catch (error) {
      console.error(
        "Signup error:",
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
    <section className="login-section">
      <div className="login-container">
        <div className="login-image">
          <img src={registerImage} alt="Signup" />
        </div>

        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <label htmlFor="username">USERNAME:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleUsernameChange}
              required
            />
            {errors.username && (
              <span style={{ color: "#ff6b6b", fontSize: "12px" }}>
                {errors.username}
              </span>
            )}

            <label htmlFor="collegeName">COLLEGE NAME:</label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              placeholder="Enter college name"
              value={formData.collegeName}
              onChange={handleCollegeChange}
              required
            />
            {errors.college && (
              <span style={{ color: "#ff6b6b", fontSize: "12px" }}>
                {errors.college}
              </span>
            )}

            <label htmlFor="year">YEAR:</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleYearChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            {errors.year && (
              <span style={{ color: "#ff6b6b", fontSize: "12px" }}>
                {errors.year}
              </span>
            )}

            <label htmlFor="email">EMAIL ID:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && (
              <span style={{ color: "#ff6b6b", fontSize: "12px" }}>
                {errors.email}
              </span>
            )}

            <PasswordField
              id="password"
              label="PASSWORD:"
              value={formData.password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <span style={{ color: "#ff6b6b", fontSize: "12px" }}>
                {errors.password}
              </span>
            )}

            <PasswordField
              id="confirmPassword"
              label="CONFIRM PASSWORD:"
              value={formData.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errors.confirmPassword && (
              <span style={{ color: "#ff6b6b", fontSize: "12px" }}>
                {errors.confirmPassword}
              </span>
            )}

            <button type="submit" disabled={loading}>
              {loading
                ? "CREATING ACCOUNT..."
                : "CREATE ACCOUNT"}
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
