const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/user', controller.getUsers);

module.exports = router;