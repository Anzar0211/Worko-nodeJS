const express = require('express');
const{getMockInterviewDetails,getMockInterviewList,createMockInterview,updateMockInterview,deleteMockInterview}=require('../controllers/mockInterviewController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',verifyToken,getMockInterviewList);
router.get('/:mockInterviewId',verifyToken,getMockInterviewDetails);
router.post('/',verifyToken,createMockInterview);
router.put('/:userId/:mockInterviewId',verifyToken,updateMockInterview);
router.delete('/:userId/:mockInterviewId',verifyToken,deleteMockInterview);

module.exports = router;
