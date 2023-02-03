// SPDX-License-Identifier: MIT
// sample contract to govern, this part not very important

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 internal value;

    event ValueChanged(uint256 newValue);

    // only the owner can store, which in this case will be the DAO
    function store(uint256 newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // anyone can read the value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
