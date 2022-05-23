const router = require('express').Router();
const { saleController } = require('../controllers');

router.get('/orders', saleController.getSales);
router.get('/orders/email/:email', saleController.getSalesByUserEmail);
router.get('/orders/id/:id', saleController.getSalesProductById);

module.exports = router;
