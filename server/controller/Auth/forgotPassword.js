// controller/Auth/forgotPassword.js
const UserModel = require("../../models/user.models");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

// Rate limit: 20 requests per 10 minutes (Increased for local testing)
const forgotPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 20 : 1000, 
  message: { message: "Too many requests from this IP, please try again after 10 minutes" },
});

const forgotPasswordLogic = async (req, res, next) => {
  try {
    const { Email } = req.body;

    const user = await UserModel.findOne({ Email });
    
    // Always return a generic message to prevent email enumeration
    if (!user) {
      return res.status(200).json({ success: true, message: "If an account exists, you'll receive a reset link." });
    }

    // Generate 32-byte secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 15 * 60 * 1000; // 15 min validity

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();

    // Automatically detect if the request came from localhost or the live site
    const origin = req.get("origin");
    const clientUrl = (origin && (origin.includes("localhost") || origin.includes("127.0.0.1") || origin.includes("::1")))
      ? origin
      : (process.env.CLIENT_URL || "https://codevibeforyou.netlify.app");

    const resetLink = `${clientUrl}/ResetPassword?token=${token}`;

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("❌ CRITICAL: EMAIL_USER or EMAIL_PASS not set in environment variables.");
      return res.status(500).json({ 
        message: "Email service not configured. Maintainer: Please set EMAIL_USER and EMAIL_PASS in your environment settings.",
        setupRequired: true 
      });
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: Email,
      subject: "Reset your password",
      html: `<p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p><p>This link expires in 15 minutes.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("Nodemailer error:", mailError);
      return res.status(500).json({ 
        message: "Failed to send reset email via Nodemailer", 
        error: mailError.message 
      });
    }

    return res.status(200).json({ success: true, message: "If an account exists, you'll receive a reset link." });

  } catch (error) {
    console.error("Forgot password error:", error);
    next(error);
  }
};

// Export middleware array so router can use it
module.exports = [forgotPasswordLimiter, forgotPasswordLogic];
