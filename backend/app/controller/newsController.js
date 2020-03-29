const News = require('../model/newsModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllNews = (params,returnFunction) => {
    News.find().sort({[params.sort]: params.order}).exec((err, news) => {
        if (err) {
            returnFunction( {
                status: 400,
                message: err,
            });
        }
        returnFunction({
            status: 200,
            message: "News retrieved successfully",
            payload: news
        });
    });

};

exports.new = (newsData,returnFunction) => {
    {
        let news = new News();
        news.title = newsData.title;
        news.content = newsData.content;
        news.save((err) => {
            returnFunction({
                message: 'New news created!',
                payload: news
            });
        });
    }
};

exports.getById = (id,returnFunction) => {
    if (!ObjectId.isValid(id)) {
        returnFunction({status:400});
    }
    News.findById(id, (err, news) => {
        if (err) {
            returnFunction({
                status:400,
                payload:{err}
            })
        }
        returnFunction({
            status: 200,
            payload: news
        });
    });
};

exports.update = (newsForUpdate,returnFunction) => {
    let id = newsForUpdate._id;
    if (!ObjectId.isValid(id)) {
        return {
            message: 'Bad id.'
        };
    }
    News.findById(id, (err, news) => {
        news.name = newsForUpdate.title ? newsForUpdate.name : news.name;
        news.content = newsForUpdate.content ? newsForUpdate.content : news.content;
        news.likes = newsForUpdate.likes ? newsForUpdate.likes : news.likes;
        news.save((err) => {
            returnFunction( {
                status:200,
                message: 'News Info updated',
                payload: news
            });
        });
    });
};


exports.delete = (news_id,returnFunction) => {
    let id = news_id;
    if (!ObjectId.isValid(id)) {
        returnFunction ({
            message: 'Bad id.'
        });
    }
    News.deleteOne({
        _id: id
    }, (err, news) => {
        if (err)
            return (err);
        returnFunction( {
            status: 204,
            message: 'Contact deleted',
            payload:{}
        });
    });
};
