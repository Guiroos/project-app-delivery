const md5 = require('md5');
const { adminService } = require('../services');

async function register(req, res) {
  const {
    name, email, password, role,
  } = req.body;
  const hashPassword = md5(password);

  const userCreated = await adminService.register(name, email, hashPassword, role);

  return res.status(userCreated.status).json(userCreated.message);
}

module.exports = { register };
