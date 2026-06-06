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
    const email = (req.body.email || req.body.Email || "").trim().toLowerCase();

    const user = await UserModel.findOne({
      $or: [{ email }, { Email: email }],
    });
    
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
    const rawEmailPass = process.env.EMAIL_PASS;
    const emailPass = rawEmailPass?.replace(/^"(.*)"$/, "$1");
    const emailService = process.env.EMAIL_SERVICE || "gmail";
    const emailHost = process.env.EMAIL_HOST || (emailService === "gmail" ? "smtp.gmail.com" : undefined);
    const emailPort = Number(process.env.EMAIL_PORT || (emailService === "gmail" ? 465 : 587));
    const emailSecure = process.env.EMAIL_SECURE === "true" || emailPort === 465;

    const emailFrom = process.env.EMAIL_FROM || emailUser || `no-reply@${(process.env.CLIENT_URL || "codevibeforyou.netlify.app").replace(/^https?:\/\//, "")}`;
    const mailOptions = {
      from: emailFrom,
      to: email,
      subject: "Reset your CodeVibe password",
      html: `<p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p><p>This link expires in 15 minutes.</p>`,
    };

    if (!emailUser || !emailPass) {
      // Log reset link only in development for debugging
      if (process.env.NODE_ENV !== "production") {
        console.error("[DEV ONLY] Reset link:", resetLink);
      }
      console.error("❌ EMAIL_USER or EMAIL_PASS is missing.");

      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please set EMAIL_USER and EMAIL_PASS in environment variables.",
        // resetLink removed — exposing token in response bypasses email verification
      });
    }

    const transporterConfig = {
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    };

    const transporter = nodemailer.createTransport(transporterConfig);
    console.log("Nodemailer config:", {
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure,
      user: emailUser,
    });

    try {
      await transporter.verify();
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("Nodemailer error:", mailError);
      // Log reset link only in development for debugging
      if (process.env.NODE_ENV !== "production") {
        console.warn("[DEV ONLY] Reset link:", resetLink);
      }

      return res.status(500).json({
        success: false,
        message: "Failed to send reset email. Please verify your Gmail SMTP credentials and settings.",
        error: mailError.message,
        response: mailError.response || null,
        // resetLink removed — exposing token in response bypasses email verification
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