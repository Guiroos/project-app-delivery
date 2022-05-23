const { sellerService } = require('../services');
const { status } = require('../utils');

async function getAllSellers(_req, res) {
  const response = await sellerService.getAllSellers();
  return res.status(status.OK).json(response);
}

async function getOrdersBySeller(req, res) {
  const { email } = req.params;
  const response = await sellerService.getOrdersBySeller(email);
  return res.status(status.OK).json(response);
}

async function updateStatus(req, res) {
  const { id } = req.params;
  const { newStatus } = req.body;
  const response = await sellerService.updateStatus(id, newStatus);
  return res.status(status.OK).json(response);
}

module.exports = { getAllSellers, getOrdersBySeller, updateStatus };
