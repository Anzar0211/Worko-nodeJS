const express = require('express');
const { getGuidanceList, getGuidanceDetails, createGuidance, updateGuidance, deleteGuidance } = require('../controllers/guidanceController');
const router = express.Router();
const verifyToken=require('../middleware/authMiddleware')

router.get('/',verifyToken,getGuidanceList);
router.get('/:guidanceId',b=verifyToken,getGuidanceDetails);
router.post('/',verifyToken,createGuidance);
router.put('/:guidanceId',verifyToken,updateGuidance);
router.delete('/:guidanceId',verifyToken,deleteGuidance);

module.exports = router;
