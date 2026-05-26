// controller/Auth/resetPassword.js
const bcrypt = require("bcryptjs");
const UserModel = require("../../models/user.models");

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    // Find user by token
    const user = await UserModel.findOne({ resetToken: token });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Check expiry
    if (user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    
    // Invalidate token
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    console.log(`Saving new password for user: ${user.email || user.Email}`);
    
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ success: false, message: "Server error during password reset", error: error.message });
  }
};

module.exports = resetPassword;
