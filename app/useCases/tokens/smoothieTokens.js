'use strict';

const app = require('../../../app.js');

const SmoothieToken = app.context.ethereumContracts.SmoothieToken;
const smoothieTokenAddress = app.context.contractAddresses.SmoothieToken;


function takeFeeFrom(address, sum) {
    return SmoothieToken.at(smoothieTokenAddress)
        .then(smoothieToken => {
            return smoothieToken.approve(address, app.context.tokenCoinbase, sum, {from: app.context.tokenCoinbase})
                .then(result => smoothieToken.transferFrom(address, app.context.tokenCoinbase, sum, {from: app.context.tokenCoinbase}))
        });
}

function giveRewardTo(address, sum) {
    return SmoothieToken.at(smoothieTokenAddress)
        .then(smoothieToken => {
            console.log(app.context.tokenCoinbase, address);
            return smoothieToken.approve(app.context.tokenCoinbase, address, sum, {from: app.context.tokenCoinbase})
                .then(result => {
                    return smoothieToken.transferFrom(app.context.tokenCoinbase, address, sum, {from: app.context.tokenCoinbase})
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    takeFeeFrom,
    giveRewardTo
};