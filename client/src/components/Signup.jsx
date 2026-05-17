import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider.jsx';
import registerImage from "../assets/registerImage.png";

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

    try {
      const response = await axios.post("https://codevibe-3.onrender.com/api/auth/register", {
        username,
        Email: email,   // ✅ lowercase, same as Dashboard
        password,
        college,
        year,
      });

      console.log("✅ Signup successful", response.data);
      setResponseMsg(response.data.message);

      if (response.data.success) {
        // ✅ signup ke baad direct Dashboard me bhejna
        login(response.data.user);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("❌ Signup error", error.response?.data || error.message);
      setResponseMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='login-section'>
      <div className="login-container">
        <div className="login-image">
          <img src={registerImage} className='registerImage' alt="Register image" />
        </div>
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Join Us Today ! </h1>

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
              required
            />
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "-10px", marginBottom: "15px", textAlign: "left" }}>
              *Password must be at least 6 characters long
            </p>

            <button type="submit">SUBMIT</button>

            {responseMsg && <p style={{ color: "white" }}>{responseMsg}</p>}

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
