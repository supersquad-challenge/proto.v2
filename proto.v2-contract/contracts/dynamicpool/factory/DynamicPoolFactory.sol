// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IDynamicPoolFactory } from "./IDynamicPoolFactory.sol";
import { DynamicPool } from "./../DynamicPool.sol";
import { Context } from './../../utils/Context.sol';

contract DynamicPoolFactory is IDynamicPoolFactory, Context {

  address private owner;
  uint256 private idx;

  mapping(uint256 => Challenge) private challenges;

  constructor(address _owner) {
    owner = _owner;
    idx = 0;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function getIndex() public view returns (uint256) {
    return idx;
  }

  function getChallenge(uint256 _idx) public view returns (Challenge memory) {
    return challenges[_idx];
  }

  modifier onlyOwner() {
    bool isOwner = authorization();
    require(isOwner, "DynamicPoolFactory Error: Only Owner Can change Owner");
    _;
  }

  function authorization() internal view virtual returns (bool) {
    bool _isOwner = _msgSender() == owner;
    return _isOwner;
  }

  function _isExist(uint256 _idx) internal view virtual returns (bool) {
    Challenge memory challenge = challenges[_idx];

    return challenge.Success != address(0) ? true : false;
  }

  function checkData(address _user, uint256 _idx) internal view virtual {
    require(_user == address(0) || _idx < 1, "DynamicPoolFactory Error: Invalid msg data");
  }

  function createChallenge(string memory _name) onlyOwner() public returns (Challenge memory) {
    idx += 1;
    DynamicPool Success = new DynamicPool(
      _name, 
      owner, 
      payable(address(this)), 
      true, 
      idx
    );
    DynamicPool Fail = new DynamicPool(
      _name, 
      owner, 
      payable(address(this)), 
      false, 
      idx
    );

    Challenge memory newChallenge = storeChallenge(address(Success), address(Fail), idx);

    emit ChallengeCreated(address(Success), address (Fail), owner);
    
    return newChallenge;
  }

  function storeChallenge(address _Success, address _Fail, uint256 _idx) onlyOwner() public returns (Challenge memory) {
    challenges[_idx] = Challenge(
      payable(_Success), 
      payable(_Fail)
    );

    return challenges[_idx];
  }
    
  function changeOwner(address _owner) onlyOwner() public {
    owner = _owner;
    emit OwnerChanged(_owner);
  }

  function getOffsetPool(address _pool, uint256 _idx) public view returns (address payable) {
    require(_isExist(_idx), "DynamicPoolFactory Error: Challenge Index is not Exist");

    Challenge memory challenge = challenges[_idx];

    address payable offensePool = challenge.Success == _pool ? challenge.Fail : challenge.Success;

    return payable(offensePool);
  }

  fallback() external {}
}