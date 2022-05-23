const { User, Sale } = require('../database/models');

function getAllSellers() {
  return User.findAll({
    where: {
      role: 'seller',
    },
    attributes: { exclude: ['password'] },
  });
}

async function getOrdersBySeller(email) {
  const seller = await User.findOne({ where: { email } });
  const response = await Sale.findAll({
    where: {
      sellerId: seller.id,
    },
  });
  return response;
}

async function updateStatus(id, newStatus) {
  const response = await Sale.update(
    { status: newStatus },
    { where: { id } },
  );
  return response;
}

module.exports = { getAllSellers, getOrdersBySeller, updateStatus };
