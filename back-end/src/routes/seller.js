const router = require('express').Router();
const { sellerController } = require('../controllers');

router.get('/', sellerController.getAllSellers);
router.get('/orders/email/:email', sellerController.getOrdersBySeller);
router.put('/status/id/:id', sellerController.updateStatus);

module.exports = router;
