// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IDynamicPool} from "./IDynamicPool.sol";
import {DynamicPoolFactory} from "./factory/DynamicPoolFactory.sol";
import {Context} from "./../utils/Context.sol";

contract DynamicPool is IDynamicPool, Context {
    /** Challenge 명 */
    string public name;

    /** DynamicPoolFactory Contract 배포한 주소 */
    address payable public owner;

    /** DynamicPoolFactory Contract 주소 */
    address public factory;

    /** 
    현재 Contract가 Success인지, Fail인지 구분
    true: Success,
    false: Fail
   */
    bool private form;

    /**
    현재 Contract의 index. 
    DynamicPool Contract에서 Challenge를 구분할 때 사용
   */
    uint256 private idx;

    /** 
    Challenge에 참여한 User 리스트
    struct User {
      address addr;
      uint256 deposit;
    }  
  */
    User[] private userList;

    constructor(
        string memory _name,
        address payable _owner,
        address _factory,
        bool _form,
        uint256 _idx
    ) {
        name = _name;
        owner = _owner;
        factory = _factory;
        form = _form;
        idx = _idx;
    }

    /**
    msg.sender가 DynamicPoolFactory의 Owner인지 확인
    Owner가 아닐 경우 revert
   */
    modifier onlyOwner() {
        bool isOwner = _msgSender() == owner ? true : false;
        require(isOwner, "DynamicPool Error: Only Owner Can change Owner");
        _;
    }

    // owner getter
    function getOwner() public view returns (address) {
        return owner;
    }

    // name getter
    function getName() public view returns (string memory) {
        return name;
    }

    // factory getter
    function getFactory() public view returns (address) {
        return factory;
    }

    // form getter
    function getForm() public view returns (bool) {
        return form;
    }

    // idx getter
    function getIndex() public view returns (uint256) {
        return idx;
    }

    // 현재 Contract의 balance 반환
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
    @param _user;

    address를 파라미터로 받아 해당 user의 address, deposit, userList의 Index를 반환
    만일, user가 userList에 존재하지 않을 경우 아래 값 반환.

    {
      address: address(0), 
      deposit: 0,
      index: 0
    }
   */
    function getUser(address _user) public view returns (User memory, uint) {
        for (uint i = 0; i < userList.length; i++) {
            if (userList[i].addr == _user) {
                return (userList[i], i);
            }
        }
        return (User(address(0), 0), 0);
    }

    /**
    현재 Challenge에 참여한 전체 userList 반환
  */
    function getAllUsers() public view returns (User[] memory) {
        return userList;
    }

    /**
    @param _user @param _deposit
    userList에 User(address, uint256) 추가,
    추가된 User 정보(address, uint256) 반환

    @return User
  */
    function addUser(
        address _user,
        uint256 _deposit
    ) public onlyOwner returns (User memory) {
        userList.push(User(_user, _deposit));

        emit UserAdded(address(this), _user, _deposit);

        return userList[userList.length - 1];
    }

    /**
    userList에 추가된 User(address, uint256) 제거,
    제거된 userList 반환

    파라미터로 받은 user address가 존재하지 않거나,
    파라미터로 받은 user address에 매핑된 deposit이 0이 아닐 경우 revert

    삭제 후 이벤트 발생
    @return userList
  */

    function deleteUser(
        address _user
    ) public onlyOwner returns (User[] memory) {
        (User memory user, uint _idx) = getUser(_user);

        require(
            user.addr == address(0),
            "DynamicPool Error: User Not Exist in this Challenge"
        );

        require(
            user.deposit > 0,
            "DynamicPool Error: Can Not Remove User if User deposit Exist"
        );

        delete userList[_idx];

        emit UserDeleted(address(this), _user);

        return userList;
    }

    /**
    @param _user @param _deposit

    파라미터로 받은 user address에 매핑된 deposit을 owner로 전송

    성공할 경우 userList에 잔여 deposit을 반영 후 성공 이벤트 발생
    실패할 경우 실패 이벤트 발생
   */
    function withdrawDeposit(
        address _user,
        uint256 _deposit
    ) public payable onlyOwner returns (bool) {
        bool result = payable(owner).send(_deposit);

        if (result) {
            (User memory user, uint _idx) = getUser(_user);

            userList[_idx] = User(_user, user.deposit - _deposit);

            emit DepositMoved(address(this), _user, _deposit, true);

            return true;
        } else {
            emit DepositMoved(address(this), _user, _deposit, false);

            return false;
        }
    }

    /**
    현재 Contract의 Opposite Contract를 반환

    DynamicPoolFactory Contract의 getReversePool 메소드에 대해 call() 호출

    call()이 성공 여부와 반환 값을 (bool, bytes) 형식으로 반환.

    성공 시 해당 bytes를 address type으로 decoding하여 반환
   */
    function requestReversePool() public onlyOwner returns (address) {
        (bool result, bytes memory addressBytes) = factory.call(
            abi.encodeWithSignature(
                "getReversePool(address,uint256)",
                address(this),
                idx
            )
        );

        require(result, "DynamicPool Error: Can Not get Reverse Pool Address");

        return abi.decode(addressBytes, (address));
    }

    /**
    @param _user @param _deposit

    getUser()를 통해 파라미터로 받은 _user의 deposit을 받아옴

    해당 user의 주소로 인자로 받은 _deposit만큼 전송

    성공 시 성공 이벤트 발생
    실패 시 실패 이벤트 발생

    사용 여부를 몰라 일단 deposit 검사 X
   */
    function paybackDeposit(
        address _user,
        uint256 _deposit
    ) public payable onlyOwner returns (bool) {
        (User memory user, uint _idx) = getUser(_user);

        require(
            user.addr == address(0),
            "DynamicPool Error: User Not Exist in this Challenge"
        );
        bool result = payable(user.addr).send(_deposit);

        if (result) {
            userList[_idx] = User(_user, user.deposit - _deposit);
            emit DepositReturned(address(this), _user, _deposit, true);
            return true;
        } else {
            emit DepositReturned(address(this), _user, _deposit, false);
            return false;
        }
    }

    function transferTo(
        address _to,
        uint256 _amount
    ) external payable onlyOwner returns (bool) {
        require(address(this).balance >= _amount, "Not enough balance.");

        (bool success, ) = payable(_to).call{value: _amount}("");
        require(success, "Transfer failed.");

        emit Transfered(address(this), _to, _amount, true);

        return true;
    }

    receive() external payable {}
}
