const { productService } = require('../services');
const { status } = require('../utils');

async function getAllProducts(_req, res) {
  const products = await productService.getAllProducts();
  return res.status(status.OK).json(products);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  return res.status(status.OK).json(product);
}

module.exports = { getAllProducts, getProductById };
