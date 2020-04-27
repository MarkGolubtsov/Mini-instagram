const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newsSchema = mongoose.Schema({
    title : {
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
},{versionKey:false});

 module.exports = mongoose.model('News', newsSchema);
