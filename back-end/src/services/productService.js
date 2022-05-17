const { Product } = require('../database/models');

async function getAllProducts() {
  const response = await Product.findAll();
  return response;
}

async function getProductById(id) {
  const response = await Product.findByPk(id);
  return response;
}

module.exports = { getAllProducts, getProductById };
