const router = require('express').Router();
const authController = require('../controller/authController');
const passport = require('passport');

router.route('/registration').post(authController.registration);
router.route('/login').post(authController.login);

module.exports = router;
