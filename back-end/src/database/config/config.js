require('dotenv').config();

module.exports = {
  development: {
    database: process.env.MYSQL_DB_NAME,
    host: process.env.HOST || process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false,
  },
  test: {
    database: process.env.MYSQL_DB_NAME,
    host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false
  },
  production: {
    database: process.env.MYSQL_DB_NAME,
    host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false
  },
};
