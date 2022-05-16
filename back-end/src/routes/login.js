const router = require('express').Router();
const { loginController } = require('../controllers');

router.post('/', loginController.login);

module.exports = router;
