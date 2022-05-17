const md5 = require('md5');
const { jwt } = require('../utils');
const { User } = require('../database/models');

async function login(email, password) {
  if (email === undefined || password === undefined) return null;

  const user = await User.findOne({ where: { email } });
  if (user === null) return user;

  const hash = md5(password);
  if (hash !== user.password) return null;

  const token = jwt.generateToken({
    email: user.email, name: user.name, role: user.role,
  });

  return { ...user, token };
}

module.exports = { login };
