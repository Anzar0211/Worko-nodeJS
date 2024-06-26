const express = require('express');
const resumeService = require('../services/resumeService');
const resumeValidator = require('../validators/resumeValidator');

const getResumeList = async (req, res) => {
  try {
    const resumes = await resumeService.listResumes();
    res.json(resumes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getResumeDetails = async (req, res) => {
  try {
    const resume = await resumeService.getResumeById(req.params.resumeId);
    res.json(resume);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createResume = async (req, res) => {

  try {
    req.body.userId=req.user.id
    const { error } = resumeValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const resume = await resumeService.createResume(req.body);
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateResume = async (req, res) => {
  if(req.user.id!==req.params.userId){
    return res.status(403).send('You are not authorized to update this resume')
  }
  req.body.userId=req.user.id;
  try {
    const { error } = resumeValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const resume = await resumeService.updateResume(req.params.resumeId, req.body);
    res.status(200).json({message:"Resume Updated Successfully!!",resume})
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await resumeService.deleteResume(req.params.resumeId);
    res.status(200).json({message:"Resume Deleted Successfully!!"})
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getResumeList, getResumeDetails, createResume, updateResume, deleteResume };
