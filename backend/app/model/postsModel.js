const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    imageUrl: {
        type: String,
        required: false,
        default: ''
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {versionKey: false});

module.exports = mongoose.model('Posts', postsSchema);
