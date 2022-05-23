const { customerService } = require('../services');
const { status } = require('../utils');

async function checkout(req, res) {
  const { order } = req.body;
  const response = await customerService.checkout({
    ...order,
    orderPrice: Number(order.orderPrice),
  });

  if (response.message) {
    return res.status(status.NOT_FOUND).json({ message: response.message });
  }
  return res.status(status.CREATED).json(response);
}

module.exports = checkout;
