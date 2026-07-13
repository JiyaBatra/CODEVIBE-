const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserModel = require("../../models/user.models");
const RefreshTokenModel = require("../../models/RefreshToken");
const { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = require("../../config/jwt");

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const login = async (req, res, next) => {
  try {
    const email = (req.body.email || req.body.Email || "").trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // This clean block handles case-insensitive lookups safely
    const user = await UserModel.findOne({
      $or: [
        { email },
        { Email: { $regex: `^${escapeRegex(email)}$`, $options: "i" } },
      ],
    });




    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    // Handle legacy plaintext passwords: if bcrypt fails, try direct comparison
    // then migrate the password to a hash on the spot
    if (!isMatch && password === user.password) {
      isMatch = true;
      user.password = await bcrypt.hash(password, 10);
      await user.save();
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email || user.Email, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const family = crypto.randomBytes(16).toString("hex");

    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email || user.Email, username: user.username, family },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    // Save refresh token to DB
    await RefreshTokenModel.create({
      token: refreshToken,
      user: user._id,
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

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email || user.Email,
        college: user.college,
        year: user.year,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

module.exports = login;