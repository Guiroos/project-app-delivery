const { sellerService } = require('../services');
const { status } = require('../utils');

async function getAllSellers(_req, res) {
  const response = await sellerService.getAllSellers();
  return res.status(status.OK).json(response);
}

module.exports = { getAllSellers };
