// API Configuration
// Determines the backend URL based on the current environment

const getBackendURL = () => {
  const hostname = window.location.hostname;

  // Check if running locally
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.startsWith("192.168.")
  ) {
    return "http://localhost:5002";
  }

  // Production backend
  return "https://codevibe-3.onrender.com";
};

export const API_BASE_URL = getBackendURL();

// Export axios instance with pre-configured base URL
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
