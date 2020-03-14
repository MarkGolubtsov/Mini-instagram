const router = require('express').Router();
const newsController = require('./controller/newsController');
const authController = require('./controller/authController');

router.route('/news')
    .get(newsController.getAllNews)
    .post(newsController.new);

router.route('/news/:news_id')
    .get(newsController.getById)
    .put(newsController.update)
    .delete(newsController.delete);

router.route('/registration').post(authController.registration);
router.route('/login').post(authController.login);

module.exports = router;
