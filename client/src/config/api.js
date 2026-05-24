// API Configuration
// Dynamically resolves backend URL for local + production

/**
 * Returns backend base URL
 */
const getBackendURL = () => {
  // Use environment variable if available
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  const hostname = window.location.hostname;

  // Local development environments
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.startsWith("192.168.")
  ) {
    // IMPORTANT:
    // Your backend runs on PORT 5002
    return "http://127.0.0.1:5002";
  }

  // Production backend
  return "https://codevibe-3.onrender.com";
};

/**
 * Centralized API base URL
 */
export const API_BASE_URL = getBackendURL();

/**
 * Optional reusable Axios client
 */
export const createApiClient = (axios) => {
  return axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default API_BASE_URL;