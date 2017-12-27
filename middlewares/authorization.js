const jwt = require('../app/utils/jwt');

const config = require('../config');

function privateApiAuthenticate(req, res, next) {
    if(!req.headers.apikey || req.headers.apikey !== config.apiKey) {
        return res.sendStatus(401);
    }

    return next();
};


function authorize(req, res, next) {
    const bearerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    let user;
    try {
        user = jwt.decodeToken(bearerToken);
    } catch(err) {
        return res.sendStatus(401);
    }
    req.user = user;
    return next();
}

module.exports = {
    authorize,
    privateApiAuthenticate
};