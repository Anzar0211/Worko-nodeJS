const User = require('../models/userModel');





const getUserById = async (id) => {
  return await User.findById(id);
};

const listUsers = async () => {
  return await User.find();
};

const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

module.exports = { getUserById, listUsers, updateUser, deleteUser };
