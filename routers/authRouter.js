const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const {check} = require('express-validator');

router.post('/register', [
    check('email', `Field email can't be empty!`).notEmpty().isEmail(),
    check('password', `Password must be minimum 8 and maximum 255 characters!`).notEmpty().isLength({min:8, max:255})
], controller.register);
router.post('/login', [
    check('email', `Field email can't be empty!`).notEmpty().isEmail(),
    check('password', `Password must be minimum 8 and maximum 255 characters!`).isLength({min:8, max:255})
],controller.login);
router.get('/user', controller.getUsers);

module.exports = router;