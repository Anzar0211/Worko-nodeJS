const mongoose = require('mongoose');

const guidanceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  guidanceType: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Guidance', guidanceSchema);
