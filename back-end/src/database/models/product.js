module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
  name: DataTypes.STRING(100),
  price: DataTypes.DECIMAL(4,2),
  urlImage: DataTypes.STRING(200),
}, { timestamps: false, tableName: 'products', underscored: true });
  product.associate = (models) => {
    product.hasMany(models.SalesProduct, { foreignKey: 'product_id', as: 'productId' });
  };
  return product;
};
