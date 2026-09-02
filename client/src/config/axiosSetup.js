import axios from "axios";

/**
 * Axios request interceptor – automatically attaches the stored JWT
 * to every outgoing request so individual components don't have to
 * manage auth headers manually.
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
