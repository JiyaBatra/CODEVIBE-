const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserModel = require("../../models/user.models");
const RefreshTokenModel = require("../../models/RefreshToken");
const momsvalidation = require("../../services/validationScheme");
const { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = require("../../config/jwt");
const { validatePassword } = require("../../utils/passwordValidator");

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const register = async (req, res, next) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const college = req.body.college?.trim();
    const year = req.body.year?.trim();
    const password = req.body.password;

    console.log("📝 Register attempt:");
    console.log({
      username,
      email,
      college,
      year,
    });

    // Password validation
    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password does not meet security requirements",
        passwordErrors: passwordValidation.errors,
      });
    }

    // Joi validation
    const { error } = momsvalidation.validate({
      username,
      email,
      password,
      college,
      year,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Check existing username
    console.log("🔍 Checking existing user for username:", username);
    const usernameExist = await UserModel.findOne({
      username: { $regex: `^${escapeRegex(username)}$`, $options: "i" },
    });

    if (usernameExist) {
      console.log("❌ Registration failed: Username already exists");
      return res.status(409).json({
        success: false,
        message: "Username already exists. Please choose a different username.",
        field: "username",
      });
    }

    // Check existing user by email
    console.log("🔍 Checking existing user for email:", email);
    const userExist = await UserModel.findOne({
      email: email,
    });
    console.log("🔍 Existing user query result:", userExist ? `Found user with ID: ${userExist._id}` : "No user found");

    if (userExist) {
      console.log("❌ Registration failed: User already exists");
      return res.status(409).json({
        success: false,
        message: "Account with this Email already exists",
        field: "email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      username,
      email,
      password: hashedPassword,
      college,
      year,
    };

    // Create user
    const userCreate = await UserModel.create(newUserData);

    console.log("✅ User created:", userCreate._id);

    // Generate JWT
    const token = jwt.sign(
      {
        userId: userCreate._id,
        email: userCreate.email,
        username: userCreate.username,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    const family = crypto.randomBytes(16).toString("hex");

    const refreshToken = jwt.sign(
      {
        userId: userCreate._id,
        email: userCreate.email,
        username: userCreate.username,
        family,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    // Save refresh token to DB
    await RefreshTokenModel.create({
      token: refreshToken,
      user: userCreate._id,
      family,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000 // 15 mins
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: userCreate._id,
        username: userCreate.username,
        email: userCreate.email,
        college: userCreate.college,
        year: userCreate.year,
      },
    });
  } catch (error) {
    console.error("\n❌ [REGISTER] Registration Error Catch Block");
    console.error("Full database error object:", error);

    if (error.code === 11000) {
      console.error("MongoDB E11000 Duplicate Key Error detected:");
      console.error("- error.code:", error.code);
      console.error("- error.keyPattern:", error.keyPattern);
      console.error("- error.keyValue:", error.keyValue);

      const duplicateField = error.keyValue ? Object.keys(error.keyValue)[0] : (error.keyPattern ? Object.keys(error.keyPattern)[0] : "unknown_field");

      if (duplicateField === "username" || (error.keyPattern && error.keyPattern.username)) {
        return res.status(409).json({
          success: false,
          message: "Username already exists. Please choose a different username.",
          field: "username",
        });
      }

      return res.status(409).json({
        success: false,
        message: duplicateField === "email" 
          ? "Account with this Email already exists" 
          : `Registration failed: A user with this ${duplicateField} already exists.`,
        field: duplicateField,
      });
    }

    return next(error);
  }
};

module.exports = register;