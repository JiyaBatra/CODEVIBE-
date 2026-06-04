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
  console.log("=================== FORGOT PASSWORD FLOW STARTED ===================");
  try {
    const email = (req.body.email || req.body.Email || "").trim().toLowerCase();
    console.log(`[Step 1] Request received for email: "${email}"`);

    console.log(`[Step 2] Querying database for user: "${email}"`);
    const user = await UserModel.findOne({
      $or: [{ email }, { Email: email }],
    });
    console.log(`[Step 2.1] User found in database: ${Boolean(user)}`);

    // Always return a generic message to prevent email enumeration
    if (!user) {
      console.log(`[Step 2.2] User not found. Returning generic success response.`);
      return res.status(200).json({ success: true, message: "If an account exists, you'll receive a reset link." });
    }

    console.log(`[Step 3] Generating 32-byte secure reset token...`);
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 15 * 60 * 1000; // 15 min validity

    console.log(`[Step 4] Saving reset token and expiry to user document...`);
    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();
    console.log(`[Step 4.1] Reset token saved successfully.`);

    console.log(`[Step 5] Detecting request origin and constructing reset link...`);
    const origin = req.get("origin");
    const clientUrl = (origin && (origin.includes("localhost") || origin.includes("127.0.0.1") || origin.includes("::1")))
      ? origin
      : (process.env.CLIENT_URL || "https://codevibeforyou.netlify.app");

    const resetLink = `${clientUrl}/#/ResetPassword?token=${token}`;
    console.log(`[Step 5.1] Constructed reset link: "${resetLink}"`);

    const emailUser = process.env.EMAIL_USER;
    const rawEmailPass = process.env.EMAIL_PASS;
    // Strip leading/trailing single/double quotes, and remove all spaces (common in Gmail App Passwords copy-paste)
    const emailPass = rawEmailPass?.replace(/^["'](.*)["']$/, "$1").replace(/\s+/g, "");
    const emailService = process.env.EMAIL_SERVICE || "gmail";
    const emailHost = process.env.EMAIL_HOST || (emailService === "gmail" ? "smtp.gmail.com" : undefined);
    const emailPort = Number(process.env.EMAIL_PORT || (emailService === "gmail" ? 465 : 587));
    const emailSecure = process.env.EMAIL_SECURE === "true" || emailPort === 465;

    console.log(`[Step 6] Nodemailer configuration:`);
    console.log(`- EMAIL_USER configured: ${Boolean(emailUser)}`);
    console.log(`- EMAIL_PASS configured: ${Boolean(rawEmailPass)}`);
    console.log(`- EMAIL_SERVICE: "${emailService}"`);
    console.log(`- Host: "${emailHost}", Port: ${emailPort}, Secure: ${emailSecure}`);

    const emailFrom = process.env.EMAIL_FROM || emailUser || `no-reply@${(process.env.CLIENT_URL || "codevibeforyou.netlify.app").replace(/^https?:\/\//, "")}`;
    const mailOptions = {
      from: emailFrom,
      to: email,
      subject: "Reset your CodeVibe password",
      html: `<p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p><p>This link expires in 15 minutes.</p>`,
    };

    if (!emailUser || !emailPass) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[DEV ONLY] Reset link:", resetLink);
      }
      console.error("❌ EMAIL_USER or EMAIL_PASS is missing.");

      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please set EMAIL_USER and EMAIL_PASS in environment variables.",
      });
    }

    const transporterConfig = {
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    };

    if (emailService === "gmail") {
      transporterConfig.service = "gmail";
      console.log(`- Using pre-configured Gmail service`);
    } else {
      transporterConfig.host = emailHost;
      transporterConfig.port = emailPort;
      transporterConfig.secure = emailSecure;
      console.log(`- Using custom SMTP host configuration`);
    }

    console.log(`[Step 7] Creating Nodemailer transporter...`);
    const transporter = nodemailer.createTransport(transporterConfig);

    try {
      console.log(`[Step 8] Verifying SMTP connection...`);
      await transporter.verify();
      console.log(`[Step 8.1] SMTP connection verified successfully.`);

      console.log(`[Step 9] Sending reset email...`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`[Step 9.1] Email sent successfully. Message ID: ${info.messageId}`);
    } catch (mailError) {
      console.error("❌ SMTP/Nodemailer operation failed:");
      console.error(mailError.stack || mailError);

      if (process.env.NODE_ENV !== "production") {
        console.warn("[DEV ONLY] Reset link:", resetLink);
      }

      return res.status(500).json({
        success: false,
        message: "Failed to send reset email. Please verify your Gmail SMTP credentials and settings.",
        error: mailError.message,
        response: mailError.response || null,
      });
    }

    console.log("[Step 10] Forgot password flow completed successfully.");
    return res.status(200).json({ success: true, message: "If an account exists, you'll receive a reset link." });

  } catch (error) {
    console.error("❌ Unexpected error in forgotPassword flow:");
    console.error(error.stack || error);
    next(error);
  }
};

// Export middleware array so router can use it
module.exports = [forgotPasswordLimiter, forgotPasswordLogic];