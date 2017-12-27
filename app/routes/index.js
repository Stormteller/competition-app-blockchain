'use strict';

const competitions = require('./competitions');
const users = require('./users');
const smoothieTokens = require('./smoothieTokens');


module.exports = (app) => {
    competitions(app);
    smoothieTokens(app);
    users(app);
};


