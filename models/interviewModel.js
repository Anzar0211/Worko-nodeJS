const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  schedule: { type: Date, required: true },
  notes: { type: String, required: true },
});

module.exports = mongoose.model('Interview', interviewSchema);
