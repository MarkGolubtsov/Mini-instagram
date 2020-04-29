const News = require('../model/newsModel');
const ObjectId = require('mongoose').Types.ObjectId;


const resolver = {
    news: () => {
        return News.find().populate('likes owner').then(news => news).catch(err => err);
    },
    oneNews: (args) => {
        return News.findById({_id: new ObjectId(args.newsId)}).then(news => news).catch(err => err)
    },
    createNews: (args, context) => {
        args.owner = context.user._id;
        return News.create(args).then(news => {
            let bufNews = news;
            bufNews.owner.id = context.user._id;
            return bufNews
        }).catch(err => err);
    },
    updateNews: (args, context) => {
        return News.findById({_id: new ObjectId(args.newsId)}).then(news => {
            if (news.owner.equals(context.user._id)) {
                args.likes = []
                return News.findOneAndUpdate({_id: new ObjectId(args.newsId)}, args, {new: true})
            }
            return news;
        }).catch(err => err);
    },
    deleteNews: (args) => {
        return News.findOneAndDelete({_id: new ObjectId(args.newsId)}).populate('likes owner')
    },
    addNewsLike: (args, context) => {
        return News.findById(new ObjectId(args.newsId)).populate('likes owner').then(news => {
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
