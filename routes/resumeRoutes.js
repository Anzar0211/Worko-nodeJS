const express = require('express');
const{getResumeList,getResumeDetails,createResume,updateResume,deleteResume}=require('../controllers/resumeController')
const verifyToken=require('../middleware/authMiddleware')
const router = express.Router();

router.get('/',verifyToken,getResumeList);
router.get('/:resumeId',verifyToken,getResumeDetails);
router.post('/',verifyToken,createResume);
router.put('/:userId/:resumeId',verifyToken,updateResume);
router.delete('/:userId/:resumeId',verifyToken,deleteResume);

module.exports = router;
