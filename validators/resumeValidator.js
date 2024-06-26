const Joi = require('joi');

const resumeSchema = Joi.object({
  userId: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = resumeSchema;
