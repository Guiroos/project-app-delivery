module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING(50), defaultValue: 'Pendente' },
  }, { timestamps: false, tableName: 'sales', underscored: true });
  sale.associate = (models) => {
    sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'sellerSalesProduct' });
    // sale.hasMany(models.SalesProduct, { foreignKey: 'sale_id', as: 'saleId' });
  };
  return sale;
};
