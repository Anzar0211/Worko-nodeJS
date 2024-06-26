const mockInterviewDao = require('../daos/mockInterviewDao');
const MockInterviewDto = require('../dtos/mockInterviewDto');

const createMockInterview = async (mockInterviewData) => {
  const mockInterview = await mockInterviewDao.createMockInterview(mockInterviewData);
  return new MockInterviewDto(mockInterview);
};

const getMockInterviewById = async (id) => {
  const mockInterview = await mockInterviewDao.getMockInterviewById(id);
  return new MockInterviewDto(mockInterview);
};

const listMockInterviews = async () => {
  const mockInterviews = await mockInterviewDao.listMockInterviews();
  return mockInterviews.map(mockInterview => new MockInterviewDto(mockInterview));
};

const updateMockInterview = async (id, updateData) => {
  const mockInterview = await mockInterviewDao.updateMockInterview(id, updateData);
  return new MockInterviewDto(mockInterview);
};

const deleteMockInterview = async (id) => {
  const mockInterview = await mockInterviewDao.deleteMockInterview(id);
  return new MockInterviewDto(mockInterview);
};

module.exports = { createMockInterview, getMockInterviewById, listMockInterviews, updateMockInterview, deleteMockInterview };
