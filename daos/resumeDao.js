const Resume = require('../models/resumeModel');

const createResume = async (resumeData) => {
  const resume = new Resume(resumeData);
  return await resume.save();
};

const getResumeById = async (id) => {
  return await Resume.findById(id);
};

const listResumes = async () => {
  return await Resume.find();
};

const updateResume = async (id, updateData) => {
  return await Resume.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteResume = async (id) => {
  return await Resume.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

module.exports = { createResume, getResumeById, listResumes, updateResume, deleteResume };
