const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.models");

const register = async (req, res, next) => {
  try {
    const { username, Email, password, college, year } = req.body;

    const userExist = await UserModel.findOne({ Email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreate = new UserModel({
      username,
      Email,
      password: hashedPassword,
      college,
      year,
    });

    await userCreate.save();

    const token = jwt.sign(
      { userId: userCreate._id, email: Email, username },
      process.env.JWT_SECRET || "codevibe_default_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { username, email: Email, college, year },
    });
  } catch (error) {
    next(error);
    console.error("Registration error:", error);
  }
};

module.exports = register;
