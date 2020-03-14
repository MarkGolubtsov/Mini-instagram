let mongoose = require('mongoose');
let newsSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes:  {
        type:Number,
        default: 0
    }
},{versionKey:false});

let News = module.exports = mongoose.model('news', newsSchema);
