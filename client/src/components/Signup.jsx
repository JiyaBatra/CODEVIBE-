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
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  
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

    if (!passwordRegex.test(formData.password)) {
      setResponseMsg(
        "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          username: formData.username,
          collegeName: formData.collegeName,
          year: formData.year,
          email: formData.email,
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
