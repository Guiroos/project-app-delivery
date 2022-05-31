const { User } = require('../database/models');
const { status } = require('../utils');

async function register(name, email, password, role) {
  const userCheck = await User.findOne({ where: { name, email } });

  if (userCheck) {
    return { status: status.CONFLICT, message: 'User already exists' };
  }

  await User.create({
    name, email, password, role,
  });

  return { status: status.CREATED };
}

module.exports = { register };
