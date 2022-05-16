require('dotenv').config();

module.exports = {
  development: {
    database: 'app_delivery',
    host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
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
    database: 'app_delivery',
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
    database: 'app_delivery',
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