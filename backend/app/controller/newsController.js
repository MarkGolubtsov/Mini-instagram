const News = require('../model/newsModel');
const  ObjectId = require('mongoose').Types.ObjectId;

exports.getAllNews = (request, response) => {
    News.find().sort({[request.query.sort]:request.query.order}).exec((err, news) => {
        if (err) {
            response.json({
                status: "error",
                message: err,
            });
        }
        response.json({
            status: "success",
            message: "News retrieved successfully",
            payload: news
        });
    })
};

exports.new = (request, response) => {
    {
        let news = new News();
        news.title = request.body.title;
        news.content = request.body.content;
        news.save((err) => {
            response.status(200).json({
                message: 'New news created!',
                payload: news
            });
        });
    }
};

exports.getById = (request, response) => {
    let id = request.params.news_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id.'
        });
        return;
    }
    News.findById(id, (err, news) => {
        if (err)
            response.send(err);
        response.status(200).send({
            message: 'News details.',
            payload: news
        });
    });
};

exports.update = (request, response) => {
    let id = request.params.news_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id.'
        });
        return;
    }
    News.findById(id,(err, news) => {
        if (err) {
            response.send(err);
        }
        news.name = request.body.title ? request.body.name : news.name;
        news.content = request.body.content ? request.body.content : news.content;
        news.likes = request.body.likes ? request.body.likes : news.likes;
        news.save((err) => {
            if (err) {
                response.status(400).send(err);
            }
            response.status(200).send({
                message: 'News Info updated',
                payload: news
            });
        });
    });
};


exports.delete = function (request, response) {
    let id = request.params.news_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id.'
        });
        return;
    }
    News.deleteOne({
        _id: id
    }, (err, news) => {
        if (err)
            response.send(err);
        response.status(204).send({
            status: "success",
            message: 'Contact deleted'
        });
    });
};
