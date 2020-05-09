const Posts = require('../model/postsModel');
const {saveFile} = require("../file/fileWorker");
const ObjectId = require('mongoose').Types.ObjectId;
const {GraphQLUpload} = require('graphql-upload');

const resolver = {
    FileUpload: GraphQLUpload,
    posts: () => {
        return Posts.find().populate('likes owner').then(post => post).catch(err => err);
    },
    onePost: (args) => {
        return Posts.findById({_id: new ObjectId(args.postId)}).then(post => post).catch(err => err)
    },
    createPost: async (args, context) => {
        args.owner = context.user._id;
        let file = args.image;
        delete args.image;
        const image = await file.promise.then(file => file);
        const {createReadStream} = image
        args.imageUrl = await saveFile(createReadStream());
        return Posts.create(args).then((post) => {
            post.owner.id = context.user._id;
            return post;
        }).catch(err => err);
    },
    updatePost: (args, context) => {
        return Posts.findById({_id: new ObjectId(args.postId)}).then(post => {
            if (post.owner.equals(context.user._id)) {
                args.likes = []
                return Posts.findOneAndUpdate({_id: new ObjectId(args.postId)}, args, {new: true})
            }
            return post;
        }).catch(err => err);
    },
    deletePost: (args) => {
        return Posts.findOneAndDelete({_id: new ObjectId(args.postId)}).populate('likes owner')
    },
    addPostLike: (args, context) => {
        return Posts.findById(new ObjectId(args.postId)).populate('likes owner').then(post => {
            if (post) {
                let currentUserId = context.user._id;
                let likeIndex = post.likes.findIndex(user => user['_id'].equals(currentUserId))
                if (likeIndex === -1) {
                    post.likes.push(context.user._id);
                }
                return post.save();
            }
        })
    },
    deletePostLike: (args, context) => {
        return Posts.findById(new ObjectId(args.postId)).populate('likes')
            .then(post => {
                let currentUserId = context.user._id;
                if (post) {
                    let likeIndex = post.likes.findIndex(user => user['_id'].equals(currentUserId))
                    if (likeIndex !== -1) {
                        post.likes.splice(likeIndex, 1);
                    }
                    return post.save();
                }
            })
            .catch(err => err);

    }
}
module.exports = resolver;
