// Main logic
// Step 1: Validate incoming data (login form)
// Step 2: Check if user exists in DB
// Step 3: Compare password
// Step 4: Send response to frontend

const UserModel = require("../../models/user.models");

const login = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        email: user.Email,
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
