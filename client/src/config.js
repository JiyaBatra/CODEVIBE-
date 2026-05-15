// Centralized API configuration
// All components should import API_BASE from here instead of hardcoding URLs.
// In production, set VITE_API_URL in your .env file.
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://codevibe-3.onrender.com";

export default API_BASE;
