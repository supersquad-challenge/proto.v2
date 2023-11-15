// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IDynamicPool } from "./IDynamicPool.sol";
import { DynamicPoolFactory } from "./factory/DynamicPoolFactory.sol";
import { Context } from './../utils/Context.sol';

contract DynamicPool is IDynamicPool, Context {
  string  public  name;

  address private owner;
  address payable public factory;
  bool    private form;
  uint256 private idx;

  User[] private userList;

  constructor(
    string memory _name, 
    address _owner,
    address payable _factory,
    bool _form, 
    uint256 _idx) 
  {
    name = _name;
    owner = _owner;
    factory = _factory;
    form = _form;
    idx = _idx;
  }

  modifier onlyOwner() {
    bool isOwner = _msgSender() == owner ? true : false;
    require(isOwner, "DynamicPool Error: Only Owner Can change Owner");
    _;
  }


  function getOwner() public view returns (address) {
    return owner;
  }

  function getName() public view returns (string memory) {
    return name;
  }

  function getFactory() public view returns (address) {
    return factory;
  }

  function getForm() public view returns (bool) {
    return form;
  }

  function getIndex() public view returns (uint256) {
    return idx;
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getUser(address _user) public view returns (User memory, uint) {
    for (uint i = 0; i < userList.length; i++) {
      if (userList[i].addr == _user) {
        return (userList[i], i);
      }
    }
    return (User(address(0), 0), 0);
  }

  function getAllUsers() public view returns (User[] memory) {
    return userList;
  }

  function changePool(address _user) public payable returns (bool) {
    (User memory user, uint index) = getUser(_user);

    require(user.addr == address(0), "DynamicPool Error: Invalid address User did not deposited.");


    (bool success, bytes memory offensePool) = factory.call(abi.encodeWithSignature("getOffsetPool(address,uint256)", address(this), idx));
    require(success, "DynamicPool Error: Failed to get Offense Pool address.");
    
    address payable _offensePool = abi.decode(offensePool, (address));

    moveDeposit(_offensePool, user);

    bool result = storeUser(_offensePool, user);

    delete userList[index];
    emit PoolTransfered(user.addr, idx, form);

    return result;
  }

  function moveDeposit(address _offensePool, User memory _user) internal virtual returns (bool) {
    bool success = payable(_offensePool).send(_user.deposit);
    require(success, "DynamicPool Error: Failed to move User Deposit.");

    return true;
  }

  function storeUser(address _offensePool, User memory _user) internal virtual returns (bool) {
    (bool success, ) = _offensePool.call(abi.encodeWithSignature("addUser(address,uint256)", _user.addr, _user.deposit));
    require(success, "DynamicPool Error: Failed to store User to offensePoo;.");

    return true;
  }

  function addUser(address _user, uint256 _deposit) private {
    userList.push(User(_user, _deposit));

    emit UserAdded(address(this), _user, _deposit);
  }

  function getMsgData() public view returns (bytes memory) {
    return _msgData();
  }

  receive() external payable {}
}