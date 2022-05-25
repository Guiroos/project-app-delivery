const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

module.exports = sequelize;
