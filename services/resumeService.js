const resumeDao = require('../daos/resumeDao');
const ResumeDto = require('../dtos/resumeDto');

const createResume = async (resumeData) => {
  const resume = await resumeDao.createResume(resumeData);
  return new ResumeDto(resume);
};

const getResumeById = async (id) => {
  const resume = await resumeDao.getResumeById(id);
  return new ResumeDto(resume);
};

const listResumes = async () => {
  const resumes = await resumeDao.listResumes();
  return resumes.map(resume => new ResumeDto(resume));
};

const updateResume = async (id, updateData) => {
  const resume = await resumeDao.updateResume(id, updateData);
  return new ResumeDto(resume);
};

const deleteResume = async (id) => {
  const resume = await resumeDao.deleteResume(id);
  return new ResumeDto(resume);
};

module.exports = { createResume, getResumeById, listResumes, updateResume, deleteResume };
