// controller/Auth/forgotPassword.js
const UserModel = require("../../models/user.models");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res, next) => {
  try {
    const { Email } = req.body;

    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = Date.now() + 5 * 60 * 1000; // 5 min validity

    user.resetOTP = otp;
    user.otpExpiry = expiry;
    await user.save();

    // Mail config — credentials must come from environment variables
    const emailUser = process.env.SMTP_EMAIL;
    const emailPass = process.env.SMTP_PASSWORD;

    if (!emailUser || !emailPass) {
      console.error("SMTP credentials not configured in environment variables");
      return res.status(500).json({ message: "Email service not configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: emailUser,
      to: Email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    return res.status(200).json({ success: true, message: "OTP sent to email" });

  } catch (error) {
    console.error("Forgot password error:", error);
    next(error);
  }
};

module.exports = forgotPassword;
