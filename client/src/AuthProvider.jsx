import React, { createContext, useContext, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

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
    setAuthState({ user: userData, token });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthState({ user: null, token: null });
  };

  const value = useMemo(
    () => ({ user: authState.user, token: authState.token, login, logout }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
