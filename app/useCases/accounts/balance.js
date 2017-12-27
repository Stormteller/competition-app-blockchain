const app = require('../../../app.js');

const SmoothieToken = app.context.ethereumContracts.SmoothieToken;
const smoothieTokenAddress = app.context.contractAddresses.SmoothieToken;


function balanceOf(userAddress) {
    return SmoothieToken.at(smoothieTokenAddress)
        .then(smoothieToken => smoothieToken.balanceOf.call(userAddress));
}

module.exports = { balanceOf };