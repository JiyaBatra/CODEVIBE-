const joi = require('joi');

const momsvalidation = joi.object({
    username: joi.string().min(3).max(30).required(),
    Email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
    college: joi.string().min(2).max(50).required(),
    year: joi.string().required()
});

module.exports = momsvalidation;
