const config = require('../../config');

const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign({ address: user.address },
                    config.jwt.serverSecret,
                    { expiresIn: config.jwt.expiresIn });
}

function decodeToken(bearerToken) {
    return jwt.verify(bearerToken, config.jwt.serverSecret);
}

module.exports = {
    generateToken,
    decodeToken
};