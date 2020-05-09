const User = require('../model/userModel');
const passport = require('passport');
const authenticate = require('../auth/authenticate');

exports.registration = (req, res) => {
    User.register(new User({name: req.body.name, email: req.body.email}), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        } else {
            passport.authenticate('local')(req, res, () => {
                const token = authenticate.generateToken({_id: req.user._id, name: req.user.name, email: req.user.email});
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({token: token, status: 'Successfully Logged In'});
            });
        }
    });
};

exports.login = (req, res) => {
    passport.authenticate('local')(req, res, () => {
        const token = authenticate.generateToken({_id: req.user._id, name: req.user.name, email: req.user.email});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({token: token, status: 'Successfully Logged In'});
    });
}


