const { status, verifyToken } = require('../utils');

// eslint-disable-next-line consistent-return
const customerAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  const verified = verifyToken(authorization);
  if (verified === null) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Invalid Token' });
  }
  req.user = verifyToken(authorization);

  next();
};

module.exports = customerAuth;
