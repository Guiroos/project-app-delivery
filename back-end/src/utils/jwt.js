const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

function generateToken(data) {
  return jwt.sign(data, SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };
