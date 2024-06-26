const express = require('express');
const guidanceService = require('../services/guidanceService');
const guidanceValidator = require('../validators/guidanceValidator');

const getGuidanceList = async (req, res) => {
  try {
    const guidances = await guidanceService.listGuidances();
    res.json(guidances);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getGuidanceDetails = async (req, res) => {
  try {
    const guidance = await guidanceService.getGuidanceById(req.params.guidanceId);
    res.json(guidance);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createGuidance = async (req, res) => {
  req.body.userId=req.user.id;
  try {
    const { error } = guidanceValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const guidance = await guidanceService.createGuidance(req.body);
    res.status(201).json(guidance);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateGuidance = async (req, res) => {
  if(req.user.id!==req.params.userId){
    return res.status(403).send('You are not authorized to update this guidance')
  }
  req.body.userId=req.user.id;
  try {

    const guidance = await guidanceService.updateGuidance(req.params.guidanceId,{
      guidanceType:req.body.guidanceType,
      description:req.body.description
    });
    res.status(201).json({message:"Updated Successfully",guidance});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteGuidance = async (req, res) => {
  try {
    const guidance = await guidanceService.deleteGuidance(req.params.guidanceId);
    res.status(201).json({message:"Deleted Successfully"});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getGuidanceList, getGuidanceDetails, createGuidance, updateGuidance, deleteGuidance };
