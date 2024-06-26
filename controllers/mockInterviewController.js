const express = require('express');
const mockInterviewService = require('../services/mockInterviewService');
const mockInterviewValidator = require('../validators/mockInterviewValidator');

const getMockInterviewList = async (req, res) => {
  try {
    const mockInterviews = await mockInterviewService.listMockInterviews();
    res.json(mockInterviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getMockInterviewDetails = async (req, res) => {
  try {
    const mockInterview = await mockInterviewService.getMockInterviewById(req.params.mockInterviewId);
    res.json(mockInterview);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createMockInterview = async (req, res) => {
  req.body.userId=req.user.id
  try {
    const { error } = mockInterviewValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const mockInterview = await mockInterviewService.createMockInterview(req.body);
    res.status(201).json(mockInterview);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateMockInterview = async (req, res) => {
  if(req.user.id!==req.params.userId){
    return res.status(403).send('You are not authorized to update this mock interview')
  }
  req.body.userId=req.user.id;
  try {
    const mockInterview = await mockInterviewService.updateMockInterview(req.params.mockInterviewId, {
      $set: {
        schedule:req.body.schedule,
        feedback:req.body.feedback
      }
    });
    res.status(201).json({message:"Updated Successfully",mockInterview});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteMockInterview = async (req, res) => {
  try {
    const mockInterview = await mockInterviewService.deleteMockInterview(req.params.mockInterviewId);
    res.status(201).json({message:"Deleted Successfully"});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getMockInterviewList, getMockInterviewDetails, createMockInterview, updateMockInterview, deleteMockInterview };
