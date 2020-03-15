const router = require('express').Router();
const authController = require('../controller/authController');
const newsController = require('../controller/newsController');

router.route('/news')
    .get(newsController.getAllNews);

router.route('/news/:news_id')
    .get(newsController.getById);

router.route('/registration').post(authController.registration);
router.route('/login').post(authController.login);

module.exports = router;
