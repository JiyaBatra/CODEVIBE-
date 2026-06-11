const joi = require('joi');

const momsvalidation = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string()
        .min(8)
        .max(128)
        .pattern(/[A-Z]/, 'uppercase')
        .pattern(/[a-z]/, 'lowercase')
        .pattern(/[0-9]/, 'digit')
        .pattern(/[!@#$%^&*()_+\-=[\]{}|;:'",.<>?/]/, 'special')
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must not exceed 128 characters',
            'string.pattern.base': 'Password must contain all required character types',
            'string.pattern.uppercase': 'Password must contain at least one uppercase letter (A-Z)',
            'string.pattern.lowercase': 'Password must contain at least one lowercase letter (a-z)',
            'string.pattern.digit': 'Password must contain at least one numeric digit (0-9)',
            'string.pattern.special': 'Password must contain at least one special character',
            'any.required': 'Password is required'
        }),
    college: joi.string().min(2).max(50).required(),
    year: joi.string().required()   // chahe "1st year", "2nd year" likho ya numeric
});

module.exports = momsvalidation;
