const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { loginRoute } = require('../routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/login', loginRoute);

module.exports = app;
