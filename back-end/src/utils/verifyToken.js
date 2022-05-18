const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (_error) {
    return null;
  }
};

module.exports = verifyToken;
