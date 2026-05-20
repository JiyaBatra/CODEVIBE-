const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.models");

const login = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
      { userId: user._id, email: user.Email, username: user.username },
      process.env.JWT_SECRET || "codevibe_default_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.Email,
        college: user.college,
        year: user.year,
      },
    });
  } catch (error) {
    next(error);
    console.error("Login error:", error);
  }
};

module.exports = login;
