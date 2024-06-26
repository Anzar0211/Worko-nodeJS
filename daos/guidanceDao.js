const Guidance = require('../models/guidanceModel');

const createGuidance = async (guidanceData) => {
  const guidance = new Guidance(guidanceData);
  return await guidance.save();
};

const getGuidanceById = async (id) => {
  return await Guidance.findById(id);
};

const listGuidances = async () => {
  return await Guidance.find();
};

const updateGuidance = async (id, updateData) => {
  return await Guidance.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteGuidance = async (id) => {
  return await Guidance.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

module.exports = { createGuidance, getGuidanceById, listGuidances, updateGuidance, deleteGuidance };
