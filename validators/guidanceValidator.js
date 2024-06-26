const Joi = require('joi');

const guidanceSchema = Joi.object({
  userId: Joi.string().required(),
  guidanceType: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = { validate: guidanceSchema.validate.bind(guidanceSchema) };
