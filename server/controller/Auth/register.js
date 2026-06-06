const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.models");
const momsvalidation = require("../../services/validationScheme");

const register = async (req, res, next) => {
  try {
    // 📌 Extract + normalize input
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const college = req.body.college?.trim();
    const year = req.body.year?.trim();
    const password = req.body.password;

    console.log("📝 Register attempt:", { username, email, college, year });

    // 📌 Validation check
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

    // 📌 Check if user already exists (SIMPLE + RELIABLE)
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 📌 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📌 Create user
    const userCreate = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      college,
      year,
    });

    // 📌 Generate token
    const token = jwt.sign(
      {
        userId: userCreate._id,
        email: userCreate.email,
        username: userCreate.username,
      },
      process.env.JWT_SECRET || "codevibe_default_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // 📌 Success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: userCreate._id,
        username: userCreate.username,
        email: userCreate.email,
        college: userCreate.college,
        year: userCreate.year,
        joinedAt: userCreate.createdAt,
      },
    });

  } catch (error) {
    console.error("❌ Registration error:", error);

    // duplicate key error fallback
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    return next(error);
  }
};

module.exports = register;