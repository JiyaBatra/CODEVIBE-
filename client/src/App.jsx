import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config/api";

const App = () => {
  const [data, setData] = useState("");

  // SIGNUP
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          username: "Jiya",
          email: "jia@gmail.com",
          college: "JMIT",
          year: "3rd",
          password: "yourpassword",
        }
      );

      setData(response.data.message);
      console.log("✅ Signup Success:", response.data);
    } catch (error) {
      setData(error?.response?.data?.message || "Signup failed");
      console.log("❌ Signup Error:", error?.response?.data);
    }
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email: "jia@gmail.com",
          password: "yourpassword",
        }
      );

      setData(response.data.message);
      console.log("✅ Login Success:", response.data);
    } catch (error) {
      setData(error?.response?.data?.message || "Login failed");
      console.log("❌ Login Error:", error?.response?.data);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Auth API Test</h2>

      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
        Login
      </button>

      <p>Response: {data}</p>
    </div>
  );
};

export default App;