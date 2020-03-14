let router = require('express').Router();


let newsController = require('./controller/newsController');
router.route('/news')
    .get(newsController.getAllNews)
    .post(newsController.new);

router.route('/news/:news_id')
    .get(newsController.getById)
    .put(newsController.update)
    .delete(newsController.delete);
module.exports = router;
