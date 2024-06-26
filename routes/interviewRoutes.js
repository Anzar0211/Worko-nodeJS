const express = require('express');
const {getInterviewList,getInterviewDetails,createInterview,updateInterview,deleteInterview} = require('../controllers/interviewController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',verifyToken,getInterviewList);
router.get('/:interviewId',verifyToken,getInterviewDetails);
router.post('/',verifyToken,createInterview);
router.put('/:userId/:interviewId',verifyToken,updateInterview);
router.delete('/:userId/:interviewId',verifyToken,deleteInterview);

module.exports = router;
