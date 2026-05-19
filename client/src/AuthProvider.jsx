import React, { createContext, useContext, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      return null;
    }
  });

  const login = (userData) => {
    if (!userData) return;
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/Dashboard" replace />;
  }

  return children;
};

export const PublicHome = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/Dashboard" replace />;
  }

  return children;
};
