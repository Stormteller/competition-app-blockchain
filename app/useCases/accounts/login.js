'use strict';

const web3API = require('../../../api/web3API');

const jwt = require('../../utils/jwt');

const errors = require('../../errors');

const logger = require('../../../logger');

function login(address, password) {
    return web3API.verifyAccount(address, password)
        .then(result => {
            if (!result) throw new Error(errors.PASSWORD_INVALID);
            return jwt.generateToken({ address });
        });
}

module.exports = login;
