const PORT = process.env.PORT || 3001;
const sequelizeConnection = require('./connection');
const app = require('./app');

app.listen(PORT, () => {
  sequelizeConnection
    .authenticate()
    .then(() => {
      console.log(`Connection has been established successfully and running on port ${PORT}`);
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
});
