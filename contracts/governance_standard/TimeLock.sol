// We want to wait for a new vote to be "executed"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    constructor(
        uint256 minDelay, // how long you have to wait before executing
        address[] memory proposers, // list of addresses that can propose
        address[] memory executors, // who can execute when a proposal passes
        address admin // optional admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
