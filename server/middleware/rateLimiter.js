const rateLimit = require('express-rate-limit');

// 5 minutes window, max 6 requests per IP
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 6,
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const compilerLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 10,              // 10 executions per minute per user
  message: { error: 'Too many code executions. Please wait a minute.' },
  keyGenerator: (req) => req.user?.id || req.ip,
});



// 1 minute window, max 5 feedback submissions per IP
const feedbackLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many feedback submissions. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { authLimiter, feedbackLimiter };