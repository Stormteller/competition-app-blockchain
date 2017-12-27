'use strict';

const path = require('path');

module.exports = {
    // keythereumParams: {
    //     KDF: 'pbkdf2',
    //     ROUNDS: 65536,
    // },
    jwt: {
        serverSecret: process.env.SERVER_SECRET,
        expiresIn: 24 * 3600 * 1000
    },
    contractAddressesFilename: path.join(__dirname, 'contracts_addresses.json'),
    ethereum_network: {
        host: process.env.ETHEREUM_HOST,
        port: process.env.ETHEREUM_PORT,
        url: `http://${process.env.ETHEREUM_HOST}:${process.env.ETHEREUM_PORT}`
    },
    settings: {
        maxCompetitors: 2
    },
    apiKey: process.env.API_KEY
};