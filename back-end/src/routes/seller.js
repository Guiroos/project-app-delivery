const router = require('express').Router();
const { sellerController } = require('../controllers');

router.get('/', sellerController.getAllSellers);

module.exports = router;
