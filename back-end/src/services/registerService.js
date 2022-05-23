const { User } = require('../database/models');
const { status, jwt } = require('../utils');

async function register(name, email, password, role) {
  const userCheck = await User.findOne({ where: { name, email } });

  if (userCheck) {
    return { status: status.CONFLICT, message: 'User already exists' };
  }

  const userCreated = await User.create({
    name, email, password, role,
  });

  const token = jwt.generateToken({
    email: userCreated.email, name: userCreated.name, role: userCreated.role,
  });

  const user = {
    name: userCreated.name, email: userCreated.email, role: userCreated.role, token,
  };

  return { status: status.CREATED, user };
}

module.exports = { register };
