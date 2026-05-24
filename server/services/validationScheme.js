const joi = require('joi');

const registerSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    Email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
    college: joi.string().min(2).max(50).required(),
    year: joi.string().required()
});

const loginSchema = joi.object({
    Email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required()
});

const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        next();
    };
};

module.exports = {
    registerSchema,
    loginSchema,
    validateBody
};
