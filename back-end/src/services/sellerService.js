const { User } = require('../database/models');

function getAllSellers() {
  return User.findAll({
    where: {
      role: 'seller',
    },
    attributes: { exclude: ['password'] },
  });
}

module.exports = { getAllSellers };
