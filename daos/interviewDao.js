const Interview = require('../models/interviewModel');

const createInterview = async (interviewData) => {
  const interview = new Interview(interviewData);
  return await interview.save();
};

const getInterviewById = async (id) => {
  return await Interview.findById(id);
};

const listInterviews = async () => {
  return await Interview.find();
};

const updateInterview = async (id, updateData) => {
  return await Interview.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteInterview = async (id) => {
  return await Interview.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

module.exports = { createInterview, getInterviewById, listInterviews, updateInterview, deleteInterview };
