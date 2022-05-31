const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/all', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);

module.exports = router;
