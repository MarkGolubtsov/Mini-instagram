const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('../model/userModel')
const config = require('../config/auth')

exports.local = passport.use(new LocalStrategy({usernameField: 'email',passwordField:'password'}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.generateToken = (user) => {
    return jwt.sign(user, config.secretKey, {expiresIn: config.expires});
};

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
};

exports.jwtStrategy = passport.use(new JwtStrategy(opts, (jwt_payload, done,err) => {
    if (err)
        return done(err, false);
    else if (jwt_payload)
        return done(null, jwt_payload);
    else
        return done(null, false);
}));
exports.verifyUser = passport.authenticate('jwt', {session: false});
