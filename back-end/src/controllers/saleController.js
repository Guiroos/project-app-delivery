const { saleService } = require('../services');
const { status } = require('../utils');

async function getSales(_req, res) {
  const response = await saleService.getSales();
  return res.status(status.OK).json(response);
}

async function getSalesProductById(req, res) {
  const { id } = req.params;
  const response = await saleService.getSalesProductById(id);
  return res.status(status.OK).json(response);
}

module.exports = { getSales, getSalesProductById };
