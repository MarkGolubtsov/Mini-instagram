const router = require('express').Router();
const authController = require('../controller/authController');
const passport = require('passport');

router.route('/registration',passport.authenticate('local')).post(authController.registration);
router.route('/login',passport.authenticate('local')).post(authController.login);

module.exports = router;
