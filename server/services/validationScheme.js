const joi = require('joi');

const momsvalidation = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required()
        .messages({
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password must not exceed 20 characters',
            'any.required': 'Password is required',
        }),
    college: joi.string().min(2).max(50).required(),
    year: joi.string().required()   // chahe "1st year", "2nd year" likho ya numeric
});

module.exports = momsvalidation;
