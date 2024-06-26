const Joi = require('joi');

const mockInterviewSchema = Joi.object({
  userId: Joi.string().required(),
  schedule: Joi.date().required(),
  feedback: Joi.string().required(),
});

module.exports = { validate: mockInterviewSchema.validate.bind(mockInterviewSchema) };
