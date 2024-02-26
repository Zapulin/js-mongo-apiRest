const Joi = require('joi');

module.exports = {
    registerSchema: Joi.object({
        username: Joi.string().alphanum().min(4).max(20).required(),
        password: Joi.string().regex(/^[a-zA-Z]\w{5,15}$/).min(6).max(16).required()
    }),

    loginSchema: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
};