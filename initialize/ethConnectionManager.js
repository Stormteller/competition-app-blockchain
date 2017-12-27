'use strict';

const Web3 = require('web3');

class EthereumNodeConnectionManager {
    constructor() {
        this.models = {};
    }

    initModel(modelPromise, modelName) {
        if (!this.provider) throw new Error('No connection provider specified');
        return modelPromise.then(model => {
            model.setProvider(this.provider);

            // dirty hack for web3@1.0.0 support for localhost testrpc,
            // see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
            if (typeof model.currentProvider.sendAsync !== "function") {
                model.currentProvider.sendAsync = function() {
                    return model.currentProvider.send.apply(
                        model.currentProvider, arguments
                    );
                };
            }

            this.models[modelName] = model;
            return model;
        })
    }

    connect(options) {
        if (!options.httpUrl) throw new Error('Connection url required');
        this._options = options;
        this.provider = new Web3.providers.HttpProvider(options.httpUrl);
    }
}

module.exports = new EthereumNodeConnectionManager();