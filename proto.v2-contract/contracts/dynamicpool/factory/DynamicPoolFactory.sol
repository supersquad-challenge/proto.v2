// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IDynamicPoolFactory } from "./IDynamicPoolFactory.sol";
import { DynamicPool } from "./../DynamicPool.sol";
import { Context } from './../../utils/Context.sol';

contract DynamicPoolFactory is IDynamicPoolFactory, Context {
  /** DynamicPoolFactory의 owner */
  address private owner;

  /** 생성된 Challenge 개수 */
  uint256 private idx;

  /** 
    Challenge Index => Challenge
    
    struct Challenge {
      address payable Success;
      address payable Fail;
    }
  */
  mapping(uint256 => Challenge) private challenges;

  constructor(address _owner) {
    owner = _owner;
    idx = 0;
  }

  // owner getter
  function getOwner() public view returns (address) {
    return owner;
  }

  // idx getter
  function getIndex() public view returns (uint256) {
    return idx;
  }

  // single challenge getter
  function getChallenge(uint256 _idx) public view returns (Challenge memory) {
    return challenges[_idx];
  }

  /**
    msg.sender가 DynamicPoolFactory의 Owner인지 확인
    Owner가 아닐 경우 revert
  */
  modifier onlyOwner() {
    bool isOwner = authorization();
    require(isOwner, "DynamicPoolFactory Error: Only Owner Can change Owner");
    _;
  }

  /**
    msg.sender가 Contract의 owner인지 확인
    msg.sender가 owner일 경우 true 아닐 경우 false 반환

    @return bool
   */
  function authorization() internal view virtual returns (bool) {
    bool _isOwner = _msgSender() == owner;
    return _isOwner;
  }

  /**
    uint256 _idx를 파라미터로 받아 
    _idx에 해당하는 challenge가 존재하면 true 존재하지 않으면 false 반환

    @return bool
  */
  function _isExist(uint256 _idx) internal view virtual returns (bool) {
    Challenge memory challenge = challenges[_idx];

    return challenge.Success != address(0) ? true : false;
  }


  /** 
    challenge명을 파라미터로 받아 새로운 challenge 생성

    challenge가 정상적으로 생성되면 challenge 정보 저장 후 이벤트 발생 

    @return Challenge
   */
  function createChallenge(string memory _name) onlyOwner() public returns (Challenge memory) {
    idx += 1;
    DynamicPool Success = new DynamicPool(
      _name, 
      payable(owner), 
      address(this), 
      true, 
      idx
    );
    DynamicPool Fail = new DynamicPool(
      _name, 
      payable(owner), 
      address(this), 
      false, 
      idx
    );

    Challenge memory newChallenge = storeChallenge(address(Success), address(Fail), idx);

    emit ChallengeCreated(address(Success), address (Fail), owner);
    
    return newChallenge;
  }


  /**
    createChallenge 함수에서 호출.

    Challenge success, Challenge fail, index를 파라미터로 받아 저장
    생성된 Challenge 정보를 저장 후 Challenge 정보 반환
   
    @return Challenge
  */
  function storeChallenge(address _Success, address _Fail, uint256 _idx) onlyOwner() public returns (Challenge memory) {
    challenges[_idx] = Challenge(
      payable(_Success), 
      payable(_Fail)
    );

    return challenges[_idx];
  }
    
  /**
    address를 인자로 받아 DynamicPoolFactory의 Owner 변경

    만일 msgsender가 owner가 아닐 경우 revert
    owner가 변경되면 이벤트 발생
  */
  function changeOwner(address _owner) onlyOwner() public {
    owner = _owner;
    emit OwnerChanged(_owner);
  }


  /**
    DynamicPool Contract에서 반대 쌍 Contract의 주소를 요청할 때 호출

    idx 통해 challenge가 존재하는지 확인 후 존재한다면 해당 challenge 구조체에서 reverse Contract의 주소를 반환
   */
  function responseReversePool(address _pool, uint256 _idx) onlyOwner public view returns (address) {
    require(_isExist(_idx), "DynamicPoolFactory Error: Challenge Index is not Exist");

    Challenge memory challenge = challenges[_idx];

    address reversePool = challenge.Success == _pool ? challenge.Fail : challenge.Success;

    return reversePool;
  }

  fallback() external {}
}