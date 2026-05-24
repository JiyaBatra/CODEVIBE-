// routes/api/authRoutes.js
const express = require("express");
const Router = express.Router();

const register = require("../../controller/Auth/register");
const login = require("../../controller/Auth/login");
const forgotPassword = require("../../controller/Auth/forgotPassword");
const resetPassword = require("../../controller/Auth/resetPassword");

const { registerSchema, loginSchema, validateBody } = require("../../services/validationScheme");

Router.post("/register", validateBody(registerSchema), register);
Router.post("/login", validateBody(loginSchema), login);
Router.post("/forgot-password", forgotPassword);
Router.post("/reset-password", resetPassword);

module.exports = Router;
