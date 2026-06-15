const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.models");
const momsvalidation = require("../../services/validationScheme");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/jwt");
const { validatePassword } = require("../../utils/passwordValidator");

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

    // Check existing user
    const userExist = await UserModel.findOne({
      email: email,
    });

    console.log("🔍 Existing user:", userExist);

    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userCreate = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      college,
      year,
    });

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
      },
    });
  } catch (error) {
    console.error("❌ Registration Error");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Key Pattern:", error.keyPattern);
    console.error("Key Value:", error.keyValue);

    if (error.code === 11000) {
      const duplicateField = error.keyValue ? Object.keys(error.keyValue)[0] : "email";
      return res.status(409).json({
        success: false,
        fix/user-already-exists-1150
        message: duplicateField === "email" 
          ? "User already exists" 
          : `Registration failed: A user with this ${duplicateField} already exists.`,
          
        message: "Duplicate entry detected",
        field: Object.keys(error.keyPattern || {})[0],
        main
      });
    }

    return next(error);
  }
};

module.exports = register;