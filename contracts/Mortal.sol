pragma solidity ^0.4.15;

contract Mortal {
    address public owner;

    function Mortal() public {
    	owner = msg.sender;
    }

    function mortal() public { owner = msg.sender; }

    function kill() public { 
        if (msg.sender == owner) selfdestruct(owner);
    }

}