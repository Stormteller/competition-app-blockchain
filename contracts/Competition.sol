pragma solidity ^0.4.15;

import "./Mortal.sol";
import "./SmoothieToken.sol";


/**
 * Competition in SmoothieSmashApp
 */
contract Competition is Mortal {
    string public topic;
    uint8 public maxCompetitors;
    address[] public competitors;
    uint256 public bet;
    uint64 public finishDate;
    bool public started;
    bool public finished;
    mapping (address => address) voteMapping; // tells who have voted for whom
    mapping (address => uint256) voteCountPerCompetitor;
    address[] public leaders;

    SmoothieToken smoothieToken;

    event Finished(address[] winners, uint256 prizePerWinner);

    function Competition(address tokenAddress,
                         string _topic,
                         address[] _competitors,
                         uint8 _maxCompetitors,
                         uint256 _bet,
                         uint64 _finishDate) public {

        smoothieToken = SmoothieToken(tokenAddress);
        require(_competitors.length <= _maxCompetitors);

        for (uint8 i = 0; i < _competitors.length; i++) {
            addCompetitor(_competitors[i]);
        }


        bet = _bet;
        topic = _topic;
        maxCompetitors = _maxCompetitors;
        finishDate = _finishDate;
        started = false;
        finished = false;

        recalculateLeaders();
    }

    function getTotalPrizePool() public constant returns (uint256) {
        return competitors.length * bet;
    }

    function addCompetitor(address newCompetitor) public returns (bool success) {
        require(!started);

        //  Check if a competitor can pay the bet
        require(smoothieToken.balanceOf(newCompetitor) > bet);

        // Every competitor should approve payment to the system base account
        // System base account will be used as temporary storage
        // Then fee will be taken from competitor
        smoothieToken.transferFrom(newCompetitor, owner, bet);

        competitors.push(newCompetitor);

        voteCountPerCompetitor[newCompetitor] = 0;
        if (competitors.length == maxCompetitors) {
            started = true;
        }
        return true;
    }

    function participate() public returns (bool success) {
        return addCompetitor(msg.sender);
    }

    function manuallyStart() public returns (bool success) {
        require(!started);
        require(msg.sender == owner);
        started = true;
        return true;
    }

    function voteFromFor(address voter, address competitor) public returns (bool success) {
        require(!finished);
        require(msg.sender == owner);

        require(voteMapping[voter] == address(0x0)); // This is the null-address
        voteMapping[voter] = competitor;
        voteCountPerCompetitor[competitor] += 1;
        recalculateLeaders();
        return true;
    }


    function totalVotesFor(address competitor) public constant returns (uint256 totalVotes) {
        require(validCandidate(competitor));
        return voteCountPerCompetitor[competitor];
    }

    function recalculateLeaders() private {
        require(!finished);
        uint256 currentMaxVotes = 0;
        for(uint32 i = 0; i < competitors.length; i++) {
            if(voteCountPerCompetitor[competitors[i]] > currentMaxVotes) {
                leaders = [competitors[i]];
                currentMaxVotes = voteCountPerCompetitor[competitors[i]];
            } else if (voteCountPerCompetitor[competitors[i]] == currentMaxVotes) {
                leaders.push(competitors[i]);
            }
        }
    }

    function finish() public returns (bool success) {
        require(msg.sender == owner);
        require(started);
        require(!finished);
     //   require(finishDate <= now);
        uint256 prizePerWinner = getTotalPrizePool() / leaders.length;
        for(uint8 i = 0; i < competitors.length; i++) {
            smoothieToken.transfer(competitors[i], prizePerWinner);
        }
        Finished(leaders, prizePerWinner);
        return true;
    }

    function totalLeaders() public constant returns (uint) {
        return leaders.length;
    }

    function totalCompetitors() public constant returns (uint) {
        return competitors.length;
    }

    function validCandidate(address candidate) public constant returns (bool) {
        for(uint8 i = 0; i < competitors.length; i++) {
            if (competitors[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}