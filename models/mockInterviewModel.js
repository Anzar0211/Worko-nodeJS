const mongoose = require('mongoose');

const mockInterviewSchema = new mongoose.Schema({
  userId: { type: String,  required: true },
  schedule: { type: Date, required: true },
  feedback: { type: String, required: true },
});

module.exports = mongoose.model('MockInterview', mockInterviewSchema);
