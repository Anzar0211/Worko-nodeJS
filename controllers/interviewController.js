const express = require('express');
const interviewService = require('../services/interviewService');
const interviewValidator = require('../validators/interviewValidator');

const getInterviewList = async (req, res) => {
  try {
    const interviews = await interviewService.listInterviews();
    res.json(interviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getInterviewDetails = async (req, res) => {
  try {
    const interview = await interviewService.getInterviewById(req.params.interviewId);
    res.json(interview);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createInterview = async (req, res) => {
  req.body.userId=req.user.id;
  try {
    const { error } = interviewValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const interview = await interviewService.createInterview(req.body);
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateInterview = async (req, res) => {
  if(req.user.id!==req.params.userId){
    return res.status(403).send('You are not authorized to update this interview')
  }
  req.body.userId=req.user.id;
  try {

    const interview = await interviewService.updateInterview(req.params.interviewId,{
      $set: {
        schedule:req.body.schedule,
        notes:req.body.notes
      }
    
    });
    res.status(201).json({message:"Updated Successfully",interview});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteInterview = async (req, res) => {
  try {
    const interview = await interviewService.deleteInterview(req.params.interviewId);
    res.json(interview);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getInterviewList, getInterviewDetails, createInterview, updateInterview, deleteInterview };
