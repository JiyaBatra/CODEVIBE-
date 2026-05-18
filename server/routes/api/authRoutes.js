// routes/api/authRoutes.js
const express = require("express");
const Router = express.Router();

const register = require("../../controller/Auth/register");
const login = require("../../controller/Auth/login");
const forgotPassword = require("../../controller/Auth/forgotPassword");
const resetPassword = require("../../controller/Auth/resetPassword");

Router.post("/register", register);
Router.post("/login", login);
Router.post("/forgot-password", forgotPassword);
Router.post("/ForgotPassword", forgotPassword);
Router.post("/reset-password", resetPassword);

module.exports = Router;
