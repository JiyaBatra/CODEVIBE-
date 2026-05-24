const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.models");

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const register = async (req, res, next) => {
  try {
    const username = req.body.username?.trim();
    const email = (req.body.email || req.body.Email || "").trim().toLowerCase();
    const college = (req.body.college || req.body.collegeName || "").trim();
    const year = req.body.year?.trim();
    const password = req.body.password;

    if (!username || !email || !college || !year || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const userExist = await UserModel.findOne({
      $or: [
        { email },
        { Email: { $regex: `^${escapeRegex(email)}$`, $options: "i" } },
      ],
    });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreate = new UserModel({
      username,
      email,
      password: hashedPassword,
      college,
      year,
    });

    await userCreate.save();

    const token = jwt.sign(
      { userId: userCreate._id, email, username },
      process.env.JWT_SECRET || "codevibe_default_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { username, email, college, year },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({
        success: false,
        message: firstError?.message || "Invalid signup data",
      });
    }

    return next(error);
  }
};

module.exports = register;
