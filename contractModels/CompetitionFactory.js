'use strict';

const jsonfile = require('jsonfile');
const path = require('path');
const Contract = require("truffle-contract");

const EthConnectionManager = require('../initialize/ethConnectionManager');

const names = require('./names');

function parseCompetitionFactory() {
    return new Promise((resolve, reject) => {
        const jsonPath = path.join(__dirname, '..', 'build', 'contracts', 'CompetitionFactory.json');
        jsonfile.readFile(jsonPath, (err, data) => {
            if (err) return reject(err);
            return resolve(Contract(data));
        })
    });
}

module.exports = EthConnectionManager.initModel(parseCompetitionFactory(), names.COMPETITION_FACTORY);