// API Configuration
// Dynamically resolves backend URL for local + production

/**
 * Returns backend base URL
 */
const getBackendURL = () => {
  const hostname = window.location.hostname;

  // Local development environments
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.startsWith("192.168.")
  ) {
    // Local development must not inherit a production URL from .env. Doing so
    // mixes local UI state/JWTs with a different deployment and makes the app
    // appear broken when that deployment is unavailable.
    return "http://localhost:5002";
  }

  // Use an explicitly configured deployment URL outside local development.
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
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
