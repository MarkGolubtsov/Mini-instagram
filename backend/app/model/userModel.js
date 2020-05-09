const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, {versionKey: false});
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    passwordField:'password'
});
module.exports = mongoose.model('User', userSchema);
