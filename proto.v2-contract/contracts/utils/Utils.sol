// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Utils {
  function toBytes(address _address) internal pure returns (bytes memory) {
    return abi.encode(_address);
  }
}