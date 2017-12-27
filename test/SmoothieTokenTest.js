
var SmoothieToken = artifacts.require("./contacts/SmoothieToken.sol");
const addresses = require('../contracts_addresses.json'),
      tokenAdress = addresses.SmoothieToken;

contract('SmoothieToken', function(accounts) {
    var token = SmoothieToken.at(tokenAdress),
        account = accounts[0];

    it("It should be 0 SmoothieTokens in the account in the start", function() {
        return token.balanceOf.call(account).then(function(balance) {
            assert.equal(balance.valueOf(), 0, "the balance is not 0");
        });
    });

    it("It should be 100 SmoothieTokens in the account after godGift 100", function() {
        token.godGift(account, 100);
        return token.balanceOf.call(account).then(function(balance) {
            assert.equal(balance.valueOf(), 100, "the balance is not 100");
        });
    });

    it("And now it should be 50 in the account after withdrawal godGift(-50)", function() {
        token.godGift(account, -50);
        return token.balanceOf.call(account).then(function(balance) {
            assert.equal(balance.valueOf(), 50, "the balance is not 50");
        });
    });

});