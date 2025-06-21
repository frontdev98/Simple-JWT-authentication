const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/role');

router.post('/register', [
    check('email', `Field email can't be empty!`).notEmpty().isEmail(),
    check('password', `Password must be minimum 8 and maximum 255 characters!`).notEmpty().isLength({min:8, max:255})
], controller.register);

router.post('/login', [
    check('email', `Field email can't be empty!`).notEmpty().isEmail(),
    check('password', `Password must be minimum 8 and maximum 255 characters!`).isLength({min:8, max:255})
],controller.login);

// POST only for "/register", "/login"
router.all(/register|login/, (req, res) => {
    if (req.method != 'POST') {
        return res.status(405).end();
    }
});

router.get('/is_auth', authMiddleware, controller.isAuthorized);
router.get('/users', roleMiddleware(['admin', 'master']), controller.getUsers);

module.exports = router;