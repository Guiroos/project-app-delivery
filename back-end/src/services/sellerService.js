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
  return Sale.findAll({
    where: {
      sellerId: seller.id,
    },
  });
}

async function updateStatus(id, newStatus) {
  return Sale.update(
    { status: newStatus },
    { where: { id } },
  );
}

module.exports = { getAllSellers, getOrdersBySeller, updateStatus };
