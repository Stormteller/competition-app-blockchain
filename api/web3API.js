const config = require('../config');

const Web3 = require('web3');
const web3 = new Web3(config.ethereum_network.url);


function createAccount(password) {
    return web3.eth.personal.newAccount(password);
}

function verifyAccount(address, password) {
    return web3.eth.personal.unlockAccount(address, password);
}

function getAccounts() {
    return web3.eth.getAccounts();
}

module.exports = {
    createAccount,
    verifyAccount,
    getAccounts
};
