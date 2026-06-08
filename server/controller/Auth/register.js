const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.models");
const momsvalidation = require("../../services/validationScheme");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/jwt");
const { validatePassword } = require("../../utils/passwordValidator");

const register = async (req, res, next) => {
  try {
    // 📌 Extract + normalize input
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const college = req.body.college?.trim();
    const year = req.body.year?.trim();
    const password = req.body.password;

    console.log("📝 Register attempt:", { username, email, college, year });

    // 📌 Password strength validation (before Joi validation for clearer error messages)
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Password should contain uppercase letter, number, special Character",
        passwordErrors: passwordValidation.errors,
      });
    }

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
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
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