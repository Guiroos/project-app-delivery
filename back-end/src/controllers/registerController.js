const md5 = require('md5');
const { registerService } = require('../services');

async function register(req, res) {
  const { name, email, password } = req.body;
  const role = 'customer';
  const hashPassword = md5(password);

  const userCreated = await registerService.register(name, email, hashPassword, role);

  return res.status(userCreated.status).json(userCreated.message);
}

module.exports = { register };
