var CompetitionFactory = artifacts.require("./contacts/CompetitionFactory.sol");
var SmoothieToken = artifacts.require("./contacts/SmoothieToken.sol");
const addresses = require('../contracts_addresses.json');
const CompetitionFactoryAdress = addresses.CompetitionFactory;
const tokenAdress = addresses.SmoothieToken;

contract('CompetitionFactory', function(accounts) {
    var competitionFactory = CompetitionFactory.at(CompetitionFactoryAdress);

    it("It should be no competitions created in the start", function() {

        return competitionFactory.competitionsCreatedCount().then(function(count) {
            assert.equal(count.valueOf(), 0, "the count is not 0");
        });
    });

    it("It should be one competition created", function() {
        var account1 = accounts[0],
            account2 = accounts[1];
        var token = SmoothieToken.at(tokenAdress);
        //
        token.godGift(account1, 100);
        token.godGift(account2, 100);
         token.approveForOwner(account1, 100);
         token.approveForOwner(account2, 100);

        competitionFactory.createCompetition("comp topic 1", [account1, account2], 3, 100, 54882455);

        return competitionFactory.competitionsCreatedCount().then(function(count) {
            assert.equal(count.valueOf(), 1, "the competition is not created");
        });
    });

});