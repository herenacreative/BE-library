const jwt = require('jsonwebtoken');
const config = require('../configs/server');
const helper = require('../helpers/index');

module.exports = {
    verifyJwtToken: function(req, res, next) {
        const splitToken = req.headers.authorization.split(' ')
        let token = '';
        if (splitToken.length > 1) {
            token = splitToken.pop();
        } else {
            token = req.headers.authorization;
        }
        try {
            const decoded = jwt.verify(token, config.jwtSecretKey);
            req.decodedToken = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return helper.response(res, 'fail', 'Token expired!', 401);
            }
            return helper.response(res, 'fail', 'Invalid token!', 401);
        }
    }
};