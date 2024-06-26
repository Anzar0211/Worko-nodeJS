const userDao = require('../daos/userDao');
const UserDto = require('../dtos/userDto');





const getUserById = async (id) => {
  const user = await userDao.getUserById(id);
  return new UserDto(user);
};

const listUsers = async () => {
  const users = await userDao.listUsers();
  return users.map(user => new UserDto(user));
};

const updateUser = async (id, updateData) => {
  const user = await userDao.updateUser(id, updateData);
  return new UserDto(user);
};

const deleteUser = async (id) => {
  const user = await userDao.deleteUser(id);
  return new UserDto(user);
};

module.exports = { getUserById, listUsers, updateUser, deleteUser, };
