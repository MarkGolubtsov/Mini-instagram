const jwt = require('jsonwebtoken');
const auth = require('./config/auth');
module.exports.isAuthorized = (request, response, next) => {
    let token = request.headers.authorization;
    if (!token) {
        response.sendStatus(403);
        return;
    }
    try {
        jwt.verify(token, auth.secretKey);
    } catch (e) {
        response.status(403).send({
            message: 'Bad token.'
        });
        return;
    }
    return next();
};
