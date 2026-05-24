const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.models");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "codevibe_default_secret"
    );
    
    // Verify user still exists in DB
    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }
    req.user = {
      userId: user._id,
      email: user.Email,
      username: user.username,
      college: user.college,
      year: user.year
    };
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
