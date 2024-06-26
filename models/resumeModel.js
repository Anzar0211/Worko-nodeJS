const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Resume', resumeSchema);
