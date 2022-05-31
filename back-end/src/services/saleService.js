const {
  Sale, SalesProduct, User, Product,
} = require('../database/models');

async function getSales() {
  return Sale.findAll();
}

async function getSalesByUserEmail(email) {
  const user = await User.findOne({ where: { email } });
  return Sale.findAll({ where: { userId: user.id } });
}

async function getSalesProductById(id) {
  const sale = await Sale.findByPk(id);
  const seller = await User.findByPk(sale.sellerId);
  const response = await SalesProduct.findAll({ where: { saleId: id } });
  const products = await Promise.all(response.map(async (product) => {
    const productRes = await Product.findByPk(product.productId);
    const subTotal = +productRes.price * product.quantity;
    return {
      id: productRes.id,
      name: productRes.name,
      price: productRes.price,
      quantity: product.quantity,
      subTotal,
    };
  }));

  return {
    sellerName: seller.name,
    saleDate: sale.saleDate,
    status: sale.status,
    totalPrice: sale.totalPrice,
    orderProducts: products,
  };
}

module.exports = { getSales, getSalesByUserEmail, getSalesProductById };
