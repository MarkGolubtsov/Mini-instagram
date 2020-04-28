const News = require('../model/newsModel');
const ObjectId = require('mongoose').Types.ObjectId;
const resolver = {
    news: () => {
        return News.find().populate('likes').then(news => news).catch(err => err);
    },
    createNews: (args) => {
        return News.create(args).then(news => news).catch(err => err);
    },
    updateNews: (args) => {
        return News.findOneAndUpdate({_id: new ObjectId(args.newsId)}, args, {new: true}).populate('likes').catch(err => err)
    },
    deleteNews: (args) => {
        return News.findOneAndDelete({_id: new ObjectId(args.newsId)}).populate('likes')
    },
    addNewsLike: (args, context) => {
        return News.findById(new ObjectId(args.newsId)).populate('likes').then(news => {
            if (news) {
                let currentUserId = context.user._id;
                let likeIndex = news.likes.findIndex(user => user['_id'].equals(currentUserId))
                if (likeIndex === -1) {
                    news.likes.push(context.user._id);
                }
                return news.save();
            }
        })
    },
    deleteNewsLike: (args, context) => {
        return News.findById(new ObjectId(args.newsId)).populate('likes')
            .then(news => {
                let currentUserId = context.user._id;
                if (news) {
                    let likeIndex = news.likes.findIndex(user => user['_id'].equals(currentUserId))
                    if (likeIndex !== -1) {
                        news.likes.splice(likeIndex, 1);
                    }
                    return news.save();
                }
            })
            .catch(err => err);

    }
}
module.exports = resolver;
