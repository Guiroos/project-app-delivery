const router = require('express').Router();
const { saleController } = require('../controllers');

router.get('/orders', saleController.getSales);
router.get('/orders/:id', saleController.getSalesProductById);

module.exports = router;
