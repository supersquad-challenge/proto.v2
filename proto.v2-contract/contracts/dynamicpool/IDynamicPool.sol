// SPDX-License-Identifier: MIT

import {Struct} from "./../utils/Struct.sol";

pragma solidity ^0.8.0;

interface IDynamicPool is Struct {
    event UserAdded(address Pool, address User, uint256 Deposit);

    event UserDeleted(address Pool, address User);

    event DepositMoved(
        address From,
        address User,
        uint256 Deposit,
        bool Result
    );

    event DepositReturned(
        address Pool,
        address User,
        uint256 Deposit,
        bool Result
    );

    event Transfered(address From, address To, uint256 Amount, bool Result);

    function getOwner() external returns (address);

    function getName() external returns (string memory);

    function getFactory() external returns (address);

    function getForm() external returns (bool);

    function getIndex() external returns (uint256);

    function getBalance() external returns (uint256);

    function getUser(address _user) external returns (User memory, uint);

    function getAllUsers() external returns (User[] memory);

    function addUser(
        address _user,
        uint256 _deposit
    ) external returns (User memory);

    function deleteUser(address _user) external returns (User[] memory);

    function withdrawDeposit(
        address _user,
        uint256 _deposit
    ) external payable returns (bool);

    function requestReversePool() external returns (address);

    function paybackDeposit(
        address _user,
        uint256 _deposit
    ) external payable returns (bool);

    function transferTo(
        address _to,
        uint256 _amount
    ) external payable returns (bool);
}
