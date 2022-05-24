const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelizeConnection = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
});

module.exports = sequelizeConnection;
