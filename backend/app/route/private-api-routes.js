const router = require('express').Router();
const newsController = require('../controller/newsController');

router.route('/news')
    .post(newsController.new);

router.route('/news/:news_id')
    .put(newsController.update)
    .delete(newsController.delete);

module.exports = router;
