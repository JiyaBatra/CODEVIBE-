// controller/Auth/resetPassword.js
const UserModel = require("../../models/user.models");

const resetPassword = async (req, res, next) => {
  try {
    const { Email, otp, newPassword } = req.body;

    if (!Email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }

    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.resetOTP || !user.otpExpiry) {
      return res.status(400).json({ message: "No OTP request found. Please request a new OTP." });
    }

    if (user.resetOTP !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    user.password = newPassword;
    user.resetOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset password error:", error);
    next(error);
  }
};

module.exports = resetPassword;
