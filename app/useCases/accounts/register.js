'use strict';

const jwt = require('../../utils/jwt');

const web3API = require('../../../api/web3API');

function register(password) {
    return web3API.createAccount(password)
        .then(address =>  ({ address, token: jwt.generateToken({ address }) }));
}


module.exports = register;