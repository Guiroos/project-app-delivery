const { User } = require('../database/models');

async function getAllUsers() {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return allUsers.filter((user) => user.role !== 'administrator');
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    return false;
  }
  await User.destroy({ where: { id } });
  return true;
}

module.exports = { getAllUsers, deleteUser };
