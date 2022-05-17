const { User } = require('../database/models');

async function getAllSellers() {
  const response = await User.findAll({
    where: {
      role: 'seller',
    },
    attributes: { exclude: ['password'] },
  });
  return response;
}

module.exports = { getAllSellers };
