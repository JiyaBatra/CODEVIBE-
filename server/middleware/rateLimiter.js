const rateLimit = require('express-rate-limit');

// General API Limiter
const generalWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 minutes
const generalMaxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;
const generalLimiter = rateLimit({
    windowMs: generalWindowMs,
    max: generalMaxRequests,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Auth Limiter (Stricter)
const authWindowMs = parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 minutes
const authMaxRequests = parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS) || 10;
const authLimiter = rateLimit({
    windowMs: authWindowMs,
    max: authMaxRequests,
    message: {
        success: false,
        message: "Too many authentication attempts from this IP, please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Compiler Limiter
const compilerWindowMs = parseInt(process.env.COMPILER_RATE_LIMIT_WINDOW_MS) || 60 * 1000; // 1 minute
const compilerMaxRequests = parseInt(process.env.COMPILER_RATE_LIMIT_MAX_REQUESTS) || 10;
const compilerLimiter = rateLimit({
    windowMs: compilerWindowMs,
    max: compilerMaxRequests,
    message: {
        success: false,
        message: "Too many code executions. Please wait a minute."
    },
    keyGenerator: (req) => req.user?.id || req.ip,
    standardHeaders: true,
    legacyHeaders: false,
});

// Feedback Limiter
const feedbackWindowMs = parseInt(process.env.FEEDBACK_RATE_LIMIT_WINDOW_MS) || 60 * 1000; // 1 minute
const feedbackMaxRequests = parseInt(process.env.FEEDBACK_RATE_LIMIT_MAX_REQUESTS) || 5;
const feedbackLimiter = rateLimit({
    windowMs: feedbackWindowMs,
    max: feedbackMaxRequests,
    message: {
        success: false,
        message: "Too many feedback submissions. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { generalLimiter, authLimiter, compilerLimiter, feedbackLimiter };