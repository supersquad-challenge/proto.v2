// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Struct {
  struct User {
    address addr;
    uint256 deposit;
  }

  struct Challenge {
    address payable Success;
    address payable Fail;
  }
}