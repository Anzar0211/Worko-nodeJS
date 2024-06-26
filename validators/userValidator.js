const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required(),
});

module.exports = userSchema;
