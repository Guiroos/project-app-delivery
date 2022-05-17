const router = require('express').Router();
const { registerController } = require('../controllers');

router.post('/', registerController.register);

module.exports = router;
