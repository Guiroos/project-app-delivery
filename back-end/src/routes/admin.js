const router = require('express').Router();
const { adminController } = require('../controllers');
const { customerAuth } = require('../middlewares');

router.post('/', customerAuth, adminController.register);

module.exports = router;
