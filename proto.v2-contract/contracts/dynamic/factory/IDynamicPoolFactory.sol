// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDynamicPoolFactory {
  function deploy(bytes memory initData) external returns (address);
}