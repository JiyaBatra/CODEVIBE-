// routes/api/authRoutes.js
const express = require("express");
const Router = express.Router();

const { authLimiter } = require("../../middleware/rateLimiter")

const register = require("../../controller/Auth/register");
const login = require("../../controller/Auth/login");
const forgotPassword = require("../../controller/Auth/forgotPassword");
const resetPassword = require("../../controller/Auth/resetPassword");
const updateProfile = require("../../controller/Auth/updateProfile");
const verifyToken = require("../../middleware/authMiddleware");

Router.post("/register", authLimiter, register);
Router.post("/login", authLimiter, login);
Router.post("/forgot-password", authLimiter, forgotPassword);
Router.post("/reset-password", authLimiter, resetPassword);
Router.put("/profile", verifyToken, updateProfile);

// Verify JWT and return current user info
Router.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

module.exports = Router;
