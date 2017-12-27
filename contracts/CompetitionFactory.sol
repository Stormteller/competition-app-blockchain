pragma solidity ^0.4.15;

import "./Competition.sol";
import "./Mortal.sol";

/**
 * Contract to create Competition instances
 */
contract CompetitionFactory is Mortal {
    address public tokenAddress;
    address[] public competitionsCreated;

    function CompetitionFactory (address paymentTokenAddress) public {
        tokenAddress = paymentTokenAddress;
    }

    event CompetitionCreated(address competitionAddress);

    function createCompetition( string _topic,
                                address[] _competitors,
                                uint8 _maxCompetitors,
                                uint256 _bet,
                                uint64 _finishDate) public returns (address) {
        Competition newCompetition = new Competition(tokenAddress, _topic, _competitors, _maxCompetitors, _bet, _finishDate);
        competitionsCreated.push(newCompetition);
        CompetitionCreated(newCompetition);
        return newCompetition;
    }

    function competitionsCreatedCount() public constant returns (uint) {
        return competitionsCreated.length;
    }
}
