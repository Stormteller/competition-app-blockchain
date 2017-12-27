'use strict';

const web3API = require('../api/web3API');
const EthConnectionManager = require('./ethConnectionManager');
const { listAddresses } = require('./contractsAddressesManager');
const contractModels = require('../contractModels');
const config = require('../config');

function setup(app) {
    app.context = {};
    EthConnectionManager.connect({httpUrl: config.ethereum_network.url});

    return listAddresses(config.contractAddressesFilename)
        .then((data) => {
            app.context.contractAddresses = data;
            return contractModels.initModels();
        })
        .then((models) => web3API.getAccounts())
        .then((accounts) => {
            app.context.ethereumContracts = EthConnectionManager.models;
            app.context.tokenCoinbase = accounts[0];
        })
}

module.exports = setup;

