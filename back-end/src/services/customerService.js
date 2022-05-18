const { Sale, SalesProduct, User } = require('../database/models');

const saleFunctionCreate = async ({
  userId,
  sellerId,
  orderPrice: totalPrice,
  userAddress: deliveryAddress,
  userAddressNumber: deliveryNumber,
}) => Sale.create({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
});

async function checkout(body) {
  const {
    cart, sellerName, email, orderPrice, userAddress, userAddressNumber,
  } = body;

  const user = await User.findOne({ where: { email } });
  const userId = user.id;

  const seller = await User.findOne({ where: { name: sellerName } });
  const sellerId = seller.id;

  if (!user) {
    return { message: 'User not found' };
  }

  const sale = await saleFunctionCreate({
    userId, sellerId, orderPrice, userAddress, userAddressNumber,
  });
  const saleId = sale.id;

  await Promise.all(
    cart.map(({ id: productId, quantity }) => SalesProduct.create({ saleId, productId, quantity })),
  );

  return { saleId };
}

module.exports = { checkout };
