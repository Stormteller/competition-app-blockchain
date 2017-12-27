pragma solidity ^0.4.15;

import "./ERC20TokenInterface.sol";

contract ERC20Token is ERC20TokenInterface {
	mapping(address => uint256) public balances;
	mapping(address => mapping(address => uint256)) public allowed;

	function balanceOf(address _owner) public constant returns (uint256 balance) {
		return balances[_owner];
	}

	function transfer(address _to, uint256 _value) public returns (bool success) {
		require(balances[msg.sender] >= _value && _value > 0);
		balances[_to] += _value;
		balances[msg.sender] -= _value;
		Transfer(msg.sender, _to, _value);
		return true;
	}

	function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
		return allowed[_owner][_spender];
	}

	function approve(address _giver, address _spender, uint256 _value) public returns (bool success) {
	    require(msg.sender == owner || msg.sender == _giver);
		allowed[_giver][_spender] = _value;
		Approval(_giver, _spender, _value);
		return true;
	}

    function approveForOwner(address _giver,  uint256 _value) public returns (bool success) {
        return approve(_giver, owner, _value);
    }

	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		require(balances[_from] >= _value && allowance(_from, _to) >= _value && _value > 0);
		balances[_to] += _value;
		balances[_from] -= _value;
		allowed[_from][msg.sender] -= _value;
		Transfer(_from, _to, _value);
		return true;		
	}
}