const { loginService } = require('../services');
const { status } = require('../utils');

async function login(req, res) {
  const { email, password } = req.body;

  const result = await loginService.login(email, password);

  if (!result) {
    return res.status(status.NOT_FOUND).json({
      message: 'Not found',
    });
  }

  return res.status(status.OK).json(result);
}

module.exports = { login };
