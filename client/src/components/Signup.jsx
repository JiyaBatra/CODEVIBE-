import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";
import PasswordField from "./PasswordField";
import Dropdown from "./common/Dropdown";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    college: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    college: "",
    email: "",
    password: "",
    confirmPassword: "",
    year: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));

    if (e.target.name === "password") {
      calculatePasswordStrength(e.target.value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (formData.username.length > 30) {
      newErrors.username = "Username must be less than 30 characters";
    }
    
    if (!formData.college.trim()) {
      newErrors.college = "College name is required";
    } else if (formData.college.length < 2) {
      newErrors.college = "College name must be at least 2 characters";
    }
    
    if (!formData.year) {
      newErrors.year = "Please select your year";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 20) {
      newErrors.password = "Password must be less than 20 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponseMsg("");

    if (!validateForm()) {
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

        setTimeout(() => {
          navigate("/login", { state: location.state });
        }, 1200);
      } else {
        // backend rejected but 200 OK case
        setResponseMsg(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("❌ Signup error:", error.response?.data || error.message);

      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setResponseMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
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
              style={{
                border: errors.username ? "1px solid #ff4d6d" : "",
              }}
            />
            {errors.username && (
              <p style={{ color: "#ff4d6d", fontSize: "0.85rem", marginTop: "5px" }}>
                {errors.username}
              </p>
            )}

            {/* College */}
            <label>COLLEGE NAME:</label>
            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Enter college name"
              required
              style={{
                border: errors.college ? "1px solid #ff4d6d" : "",
              }}
            />
            {errors.college && (
              <p style={{ color: "#ff4d6d", fontSize: "0.85rem", marginTop: "5px" }}>
                {errors.college}
              </p>
            )}

            {/* Year */}
            <label>YEAR:</label>
            <Dropdown
              value={formData.year}
              onChange={(val) => {
                setFormData((prev) => ({ ...prev, year: val }));
                setErrors((prev) => ({ ...prev, year: "" }));
              }}
              options={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
              placeholder="Select Year"
              style={{ width: "100%" }}
            />
            {errors.year && (
              <p style={{ color: "#ff4d6d", fontSize: "0.85rem", marginTop: "5px" }}>
                {errors.year}
              </p>
            )}

            {/* Email */}
            <label>EMAIL:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              style={{
                border: errors.email ? "1px solid #ff4d6d" : "",
              }}
            />
            {errors.email && (
              <p style={{ color: "#ff4d6d", fontSize: "0.85rem", marginTop: "5px" }}>
                {errors.email}
              </p>
            )}

            {/* Password */}
            <PasswordField
              id="password"
              label="PASSWORD:"
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              style={{
                border: errors.password ? "1px solid #ff4d6d" : "",
              }}
            />
            {errors.password && (
              <p style={{ color: "#ff4d6d", fontSize: "0.85rem", marginTop: "5px" }}>
                {errors.password}
              </p>
            )}

            {/* Confirm Password */}
            <PasswordField
              id="confirmPassword"
              label="CONFIRM PASSWORD:"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              style={{
                border: errors.confirmPassword ? "1px solid #ff4d6d" : "",
              }}
            />
            {errors.confirmPassword && (
              <p style={{ color: "#ff4d6d", fontSize: "0.85rem", marginTop: "5px" }}>
                {errors.confirmPassword}
              </p>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}>
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
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