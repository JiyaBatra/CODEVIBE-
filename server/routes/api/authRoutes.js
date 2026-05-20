// routes/api/authRoutes.js
const express = require("express");
const Router = express.Router();

const register = require("../../controller/Auth/register");
const login = require("../../controller/Auth/login");
const forgotPassword = require("../../controller/Auth/forgotPassword");
const resetPassword = require("../../controller/Auth/resetPassword");
const verifyToken = require("../../middleware/authMiddleware");

Router.post("/register", register);
Router.post("/login", login);
Router.post("/forgot-password", forgotPassword);
Router.post("/ForgotPassword", forgotPassword);
Router.post("/reset-password", resetPassword);

// Verify JWT and return current user info
Router.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

module.exports = Router;
