pragma solidity ^0.4.15;

import "./ERC20Token.sol";

contract SmoothieToken is ERC20Token {
	string public name = 'Smoothie coin';
	uint8 public decimals = 3;
	string public symbol = 'SMC';
	string public version = '0.1';

	function SmoothieToken(uint256 _initialAmount) public {
		balances[msg.sender] = _initialAmount;
		totalSupply = _initialAmount;
	}

	function godGift(address _to, uint256 amount) public returns (bool success) {
		require(msg.sender == owner);
		balances[_to] += amount;
		totalSupply += amount;
		return true;
	}
}