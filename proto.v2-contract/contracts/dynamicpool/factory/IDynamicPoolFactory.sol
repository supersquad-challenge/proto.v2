// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { DynamicPool } from "./../DynamicPool.sol";
import { Struct } from "./../../utils/Struct.sol";

interface IDynamicPoolFactory is Struct {

  event ChallengeCreated(address indexed Success, address indexed Fail, address indexed Creator);
  
  event OwnerChanged(address indexed OwnerAddress);

  event DepositMoved(address Pool, address User, uint256 Deposit, bool Form);

  function getOwner() external returns (address);

  function getIndex() external returns (uint256);

  function getChallenge(uint256 _idx) external returns (Challenge memory);

  function createChallenge(string memory _name) external returns (Challenge memory);

  function storeChallenge(address _Success, address _Fail, uint256 idx) external returns (Challenge memory);

  function changeOwner(address _owner) external;

  function responseReversePool(address _pool, uint256 _idx) external returns (address);
}