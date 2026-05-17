import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";
import loginImage from "../assets/loginImage.png";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading spinner and button disabled state
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const response = await axios.post("https://codevibe-3.onrender.com/api/auth/login",
        {
          Email: email,
          password,
        }
      );

      console.log("✅ Login successful", response.data);
      setResponseMsg(response.data.message);

      if (response.data.success) {
        login(response.data.user);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("❌ Login error", error.response?.data || error.message);
      setResponseMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-image">
          <img src={loginImage} alt="login image" />
        </div>
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Hello, Welcome !</h1>
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

            <button type="submit">SUBMIT</button>

            {responseMsg && <p style={{ color: "white" }}>{responseMsg}</p>}

            <p>
              Don't have an account? <Link to="/Signup">Signup</Link>
            </p>
            <p>
              Forgot Password? <Link to="/ForgetPassword">Click Here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;