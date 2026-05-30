const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.models");

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isBcryptHash = (value = "") => /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(value);

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
      email: { $regex: `^${escapeRegex(email)}$`, $options: "i" },
    });




    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    // Handle legacy plaintext passwords only when the stored password is not already a bcrypt hash.
    if (!isMatch && !isBcryptHash(user.password) && password === user.password) {
      isMatch = true;
      user.password = await bcrypt.hash(password, 10);
      await user.save();
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email || user.Email, username: user.username },
      process.env.JWT_SECRET || "codevibe_default_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email || user.Email,
        college: user.college,
        year: user.year,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return next(error);
    next(error);
  }
};

module.exports = login;