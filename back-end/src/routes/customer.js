const router = require('express').Router();
const { customerController } = require('../controllers');
const { customerAuth } = require('../middlewares');

router.post('/checkout', customerAuth, customerController);

module.exports = router;
