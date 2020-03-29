const router = require('express').Router();

const authController = require("../controller/authController");

router.route('/login')
    .post(authController.login);
router.route('/registration')
    .post(authController.registration);
module.exports = router;
