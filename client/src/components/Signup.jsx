import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";
import PasswordField from "./PasswordField";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    collegeName: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Username Validation
  const handleUsernameChange = (e) => {
    const value = e.target.value;

    setUsername(value);

    setErrors((prev) => ({
      ...prev,
      username: validateUsername(value),
    }));
  };

  // College Validation
  const handleCollegeChange = (e) => {
    const value = e.target.value;

    setCollege(value);

    setErrors((prev) => ({
      ...prev,
      college: validateCollege(value),
    }));
  };

  // Year Validation
  const handleYearChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,4}$/.test(value)) {
      setYear(value);

      setErrors((prev) => ({
        ...prev,
        year: validateYear(value),
      }));
    }
  };

  // Email Validation
  const handleEmailChange = (e) => {
    const value = e.target.value;

    setEmail(value);

    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value),
    }));
  };

  // Password Validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;

    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponseMsg("");

    // Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      setResponseMsg("Passwords do not match");
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

      console.log("✅ Signup successful:", response.data);

      if (response.data.success) {
        setResponseMsg(
          response.data.message || "Account created successfully"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setResponseMsg(
          response.data.message || "Signup failed"
        );
      }
    } catch (error) {
      console.error(
        "❌ Signup error:",
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

        {/* Left Side Image */}
        <div className="login-image">
          <img src={registerImage} alt="Signup" />
        </div>

        {/* Signup Form */}
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>

            <h1>Create Account</h1>

            {/* Username */}
            <label htmlFor="username">
              USERNAME:
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            {/* College Name */}
            <label htmlFor="collegeName">
              COLLEGE NAME:
            </label>

            <input
              type="text"
              id="collegeName"
              name="collegeName"
              placeholder="Enter college name"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />

            {/* Year */}
            <label htmlFor="year">
              YEAR:
            </label>

            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Year
              </option>

              <option value="1st Year">
                1st Year
              </option>

              <option value="2nd Year">
                2nd Year
              </option>

              <option value="3rd Year">
                3rd Year
              </option>

              <option value="4th Year">
                4th Year
              </option>

            </select>

            {/* Email */}
            <label htmlFor="email">
              EMAIL ID:
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <PasswordField
              id="password"
              label="PASSWORD:"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            {/* Confirm Password */}
            <PasswordField
              id="confirmPassword"
              label="CONFIRM PASSWORD:"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />

            {/* Submit Button */}
            <button type="submit" disabled={loading}>
              {loading
                ? "CREATING ACCOUNT..."
                : "CREATE ACCOUNT"}
            </button>

            {/* Response Message */}
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

            {/* Login Link */}
            <p>
              Already have an account?{" "}
              <Link to="/login">
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