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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponseMsg("");

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