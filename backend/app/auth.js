const jwt = require('jsonwebtoken');
const auth = require('./config/auth');
module.exports.isAuthorized  = (request, response, next) =>{
    let token =request.headers.authorization;
    if (token || jwt.verify(token,auth.secretKey)) {
        response.sendStatus(401);
        return;
    }
    return next();
};
