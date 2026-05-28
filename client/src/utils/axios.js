import axios from "axios";
import API_BASE_URL from "../config/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to attach JWT token if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired JWTs (401 status) cleanly
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("🔒 Session expired or unauthorized. Logging out cleanly...");
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      
      // Redirect to login page if window is available
      if (typeof window !== "undefined") {
        window.location.href = "/login?expired=true";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
