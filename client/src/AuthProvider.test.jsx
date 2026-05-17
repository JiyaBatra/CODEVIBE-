import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, PrivateRoute, PublicRoute } from "./AuthProvider.jsx";

const LoginPage = () => <div>Login Page</div>;
const DashboardPage = () => <div>Dashboard Page</div>;

describe("Auth route guards", () => {
  beforeEach(() => {
    localStorage.removeItem("user");
  });

  it("redirects unauthenticated users from /dashboard to /login", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/Dashboard"]}>
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route
              path="/Dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText("Login Page")).toBeDefined();
  });

  it("redirects authenticated users from /login to /dashboard", () => {
    localStorage.setItem("user", JSON.stringify({ username: "test@example.com" }));

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/Login"]}>
          <Routes>
            <Route
              path="/Login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route path="/Dashboard" element={<DashboardPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText("Dashboard Page")).toBeDefined();
  });
});
