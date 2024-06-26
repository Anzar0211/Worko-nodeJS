const userService = require('../services/userService');
const userValidator = require('../validators/userValidator');
const bcryptjs=require('bcryptjs')


const getUserList = async (req, res) => {
  try {
    const users = await userService.listUsers();
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user; 
      return userWithoutPassword
    });
    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    const{password,...rest}=user
    res.json(rest);
  } catch (error) {
    res.status(500).send(error.message);
  }
};





const updateUser = async (req, res) => {
  try {
    if(req.user.id!==req.params.userId){
      return res.status(403).send('You are not authorized to update this user')
    }
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await userService.updateUser(req.params.userId,{
      $set: {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            age:req.body.age,
            city:req.body.city,
            zipCode:req.body.zipCode
          }
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  if(req.user.id!==req.params.userId){
    return res.status(403).send('You are not authorized to delete this user')
  }
  try {
    const user = await userService.deleteUser(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getUserList, getUserDetails, updateUser, deleteUser };
