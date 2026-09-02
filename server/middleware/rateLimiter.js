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

module.exports = { authLimiter };