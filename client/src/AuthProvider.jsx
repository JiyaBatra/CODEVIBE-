import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./config/api.js";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function loadAuthState() {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user && !isTokenExpired(token)) {
      return { user, token };
    }
  } catch {
    // ignore parse errors
  }
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  return { user: null, token: null };
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => loadAuthState());

  const login = (userData, token) => {
    if (!userData || !token) return;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userEmail", userData.email || userData.Email || "");
    setAuthState({ user: userData, token });
  };

  const updateUser = (updatedUser) => {
    if (!updatedUser) return;
    const currentToken = authState?.token || localStorage.getItem("authToken");
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setAuthState({ user: updatedUser, token: currentToken });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    setAuthState({ user: null, token: null });
  };

  const value = useMemo(
    () => ({ user: authState.user, token: authState.token, login, updateUser, logout }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const PrivateRoute = ({ children }) => {
  const { token, login, logout } = useAuth();
  const location = useLocation();
  const [verified, setVerified] = useState(null); // null=loading, true=ok, false=fail

  useEffect(() => {
    if (!token) { setVerified(false); return; }
    axios
      .get(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Update user data from server response
        if (res.data.success && res.data.user) {
          login(res.data.user, token);
        }
        setVerified(true);
      })
      .catch(() => { logout(); setVerified(false); });
  }, [token]);

  if (verified === null) return null; // or a spinner
  if (!verified) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
