const guidanceDao = require('../daos/guidanceDao');
const GuidanceDto = require('../dtos/guidanceDto');

const createGuidance = async (guidanceData) => {
  const guidance = await guidanceDao.createGuidance(guidanceData);
  return new GuidanceDto(guidance);
};

const getGuidanceById = async (id) => {
  const guidance = await guidanceDao.getGuidanceById(id);
  return new GuidanceDto(guidance);
};

const listGuidances = async () => {
  const guidances = await guidanceDao.listGuidances();
  return guidances.map(guidance => new GuidanceDto(guidance));
};

const updateGuidance = async (id, updateData) => {
  const guidance = await guidanceDao.updateGuidance(id, updateData);
  return new GuidanceDto(guidance);
};

const deleteGuidance = async (id) => {
  const guidance = await guidanceDao.deleteGuidance(id);
  return new GuidanceDto(guidance);
};

module.exports = { createGuidance, getGuidanceById, listGuidances, updateGuidance, deleteGuidance };
