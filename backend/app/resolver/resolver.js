const Posts = require('../model/postsModel');
const {deleteFile} = require("../file/fileWorker");
const {saveFile} = require("../file/fileWorker");
const ObjectId = require('mongoose').Types.ObjectId;
const {GraphQLUpload} = require('graphql-upload');

const resolver = {
    FileUpload: GraphQLUpload,
    posts: async (args, context) => {
        let user = new ObjectId(context.user._id);
        return Posts.find({owner: {$ne: user}}).populate('likes owner').then(post => post).catch(err => err);
    },
    onePost: async (args) => {
        return Posts.findById({_id: new ObjectId(args.postId)}).then(post => post).catch(err => err)
    },
    myPosts: async (args, context) => {
        let user = context.user._id
        return Posts.find({owner: user}).populate('likes owner').then(post => post).catch(err => err);
    },
    likedPosts:async (args,context) =>{
        let user = context.user._id;
        return Posts.find({likes: new ObjectId(user)}).populate('likes owner').then(post => post).catch(err => err);
    },
    userPosts: async (args) => {
        let id = args.userId;
        return Posts.find({owner: {id}}).populate('likes owner').then(post => post).catch(err => err);
    },
    createPost: async (args, context) => {
        args.owner = context.user._id;
        let file = args.image;
        delete args.image;
        const image = await file.promise.then(file => file);
        const {createReadStream} = image
        let metaImage = await saveFile(createReadStream());
        args.imageUrl = metaImage.url;
        args.imageName = metaImage.name;
        return Posts.create(args).then((post) => {
            post.owner.id = context.user._id;
            return post;
        }).catch(err => err);
    },
    updatePost: async (args, context) => {
        return Posts.findById({_id: new ObjectId(args.postId)}).then(post => {
            if (post.owner.equals(context.user._id)) {
                args.likes = []
                return Posts.findOneAndUpdate({_id: new ObjectId(args.postId)}, args, {new: true})
            }
            return post;
        }).catch(err => err);
    },
    deletePost: async (args) => {
        return Posts.findOneAndDelete({_id:args.postId}).populate('likes owner').then(post=>{
            deleteFile(post.imageName);
            return post;
        })
    },
    addPostLike: async (args, context) => {
        return Posts.findById(args.postId).populate('likes owner').then(post => {
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
    deletePostLike: async (args, context) => {
        return Posts.findById(args.postId).populate('likes owner')
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
