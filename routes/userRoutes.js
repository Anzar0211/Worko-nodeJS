const express = require('express');
const { getUserList, getUserDetails, updateUser, deleteUser,} = require('../controllers/userController');
const verifyToken=require('../middleware/authMiddleware')
const router = express.Router();

// Routes
router.get('/',verifyToken,getUserList);
router.get('/:userId',verifyToken,getUserDetails);
router.put('/:userId',verifyToken,updateUser);
router.delete('/:userId',verifyToken,deleteUser);

module.exports = router;
