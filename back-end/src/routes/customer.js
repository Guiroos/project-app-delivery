const router = require('express').Router();
const { checkoutController } = require('../controllers');
const { customerAuth } = require('../middlewares');

router.post('/checkout', customerAuth, checkoutController);

module.exports = router;
