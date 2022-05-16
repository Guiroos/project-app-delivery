module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define(
    'SalesProduct',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false, tableName: 'salesProducts', underscored: true }
  );

  salesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'saleId',
      as: 'sale',
      otherKey: 'productId',
      through: salesProduct,
    });
    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'productId',
      as: 'product',
      otherKey: 'saleId',
      through: salesProduct,
    });
  };
  return salesProduct;
};
