const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');
const  md5 = require('md5');

exports.registration = (request, response) => {
    let user = new User();
    user.name = request.body.name;
    user.surname = request.body.surname;
    user.email = request.body.email;
    user.password = getHashPassword(request.body.password);
    user.save((err) => {
        if (err) {
            if (err.code === 11000) {
                response.status(409).send({message: 'Account already exists.'});
                return;
            }
            response.status(400).send(err);
            return
        }
        response.status(200).send({
            token: generationToken(user)
        })

    })
};

exports.login = (request, response) => {
    User.findOne({email: request.body.email, password: getHashPassword(request.body.password)}, (err, user) => {
        if (!user) {
            response.status(404).send({
                message: 'User not found.'
            });
            return;
        }
        if (err) {
            response.send(err);
            return;
        }

        response.status(200).send({
            token: generationToken(user)
        })
    })
};
let generationToken = (user) => {
    return jwt.sign({
        name: user.name,
        email: user.email,
        surname: user.surname
    }, auth.secretKey, {expiresIn: auth.expires});
};

let getHashPassword = (password) => {
    return md5(password);
};
