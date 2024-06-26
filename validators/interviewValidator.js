const Joi = require('joi');

const interviewSchema = Joi.object({
  userId: Joi.string().required(),
  schedule: Joi.date().required(),
  notes: Joi.string().required(),
});

module.exports = { validate: interviewSchema.validate.bind(interviewSchema) };
