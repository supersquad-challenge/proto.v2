// SPDX-License-Identifier: MIT

import { Struct } from "./../utils/Struct.sol";

pragma solidity ^0.8.0;

interface IDynamicPool is Struct {

  event DepositReceived(address From, uint256 Deposit);

  event UserAdded(address Pool, address User, uint256 Deposit);

  event PoolTransfered(address User, uint256 Idx, bool Form);

  function getOwner() external returns (address);

  function getName() external returns (string memory);

  function getFactory() external returns (address);

  function getForm() external returns (bool);

  function getIndex() external returns (uint256);

  function getBalance() external returns (uint256);

  function getUser(address _user) external returns (User memory, uint);

  function getAllUsers() external returns (User[] memory);

  function getMsgData() external returns (bytes memory);

  function changePool(address _user) external payable returns (bool);
}