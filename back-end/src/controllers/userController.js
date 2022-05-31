const { userService } = require('../services');
const { status } = require('../utils');

async function getAllUsers(_req, res) {
  const response = await userService.getAllUsers();
  return res.status(status.OK).json(response);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const response = await userService.deleteUser(id);
  return res.status(status.OK).json(response);
}

module.exports = { getAllUsers, deleteUser };
