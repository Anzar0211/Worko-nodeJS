const interviewDao = require('../daos/interviewDao');
const InterviewDto = require('../dtos/interviewDto');

const createInterview = async (interviewData) => {
  const interview = await interviewDao.createInterview(interviewData);
  return new InterviewDto(interview);
};

const getInterviewById = async (id) => {
  const interview = await interviewDao.getInterviewById(id);
  return new InterviewDto(interview);
};

const listInterviews = async () => {
  const interviews = await interviewDao.listInterviews();
  return interviews.map(interview => new InterviewDto(interview));
};

const updateInterview = async (id, updateData) => {
  const interview = await interviewDao.updateInterview(id, updateData);
  return new InterviewDto(interview);
};

const deleteInterview = async (id) => {
  const interview = await interviewDao.deleteInterview(id);
  return new InterviewDto(interview);
};

module.exports = { createInterview, getInterviewById, listInterviews, updateInterview, deleteInterview };
