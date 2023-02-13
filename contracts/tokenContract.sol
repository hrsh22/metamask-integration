pragma solidity ^0.8.0;

contract SampleToken {
    string public name = "Sample Token";
    string public symbol = "STK";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000000000000000000000;

    mapping (address => uint256) public balanceOf;
    
    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        require(balanceOf[_to] + _value >= balanceOf[_to], "Overflow");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        return true;
    }
}
