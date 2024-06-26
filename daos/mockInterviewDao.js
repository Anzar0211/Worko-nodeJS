const MockInterview = require('../models/mockInterviewModel');

const createMockInterview = async (mockInterviewData) => {
  const mockInterview = new MockInterview(mockInterviewData);
  return await mockInterview.save();
};

const getMockInterviewById = async (id) => {
  return await MockInterview.findById(id);
};

const listMockInterviews = async () => {
  return await MockInterview.find();
};

const updateMockInterview = async (id, updateData) => {
  return await MockInterview.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMockInterview = async (id) => {
  return await MockInterview.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

module.exports = { createMockInterview, getMockInterviewById, listMockInterviews, updateMockInterview, deleteMockInterview };
