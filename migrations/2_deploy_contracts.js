'use strict';

const SmoothieToken = artifacts.require("./SmoothieToken.sol");
const CompetitionFactory = artifacts.require("./CompetitionFactory.sol");
const DateTime = artifacts.require("./datetime/DateTime.sol");

const { saveAddress } = require('../initialize/contractsAddressesManager');
const contractNames = require('../contractModels/names');

const config = require('../config');

module.exports = function(deployer) {
    deployer.deploy(DateTime)
        .then(() =>
            saveAddress(contractNames.DATETIME, DateTime.address, config.contractAddressesFilename))
        .then(() => deployer.deploy(SmoothieToken))
        .then(() =>
            saveAddress(contractNames.SMOOTHIE_TOKEN, SmoothieToken.address, config.contractAddressesFilename))
        .then(() => deployer.deploy(CompetitionFactory, SmoothieToken.address))
        .then(() =>
            saveAddress(contractNames.COMPETITION_FACTORY, CompetitionFactory.address, config.contractAddressesFilename));
};
