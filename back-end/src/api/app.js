const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { loginRoute, registerRoute, productRoute } = require('../routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products', productRoute);

module.exports = app;
