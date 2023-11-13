// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC721 } from './IERC721.sol';
import { IERC721Metadata, ERC721Metadata } from './ERC721Metadata.sol';
import { Context } from './../../utils/Context.sol';

import { ERC721SlotBase } from './ERC721SlotBase.sol';
import './../../utils/StorageSlot.sol';
import './../../utils/Address.sol';
import './../../ERC165/ERC165.sol';
import './IERC721Receiver.sol';

import { Initializable } from './../../proxy/Initializable.sol';


abstract contract ERC721Base is
  IERC721,
  ERC721Metadata,
  Context,
  ERC165,
  Initializable {
  
  using Address for address;

  function getSlotOwners(uint256 tokenId) private pure returns (AddressSlot storage) {
    // TODO: slot offset conventions
    return StorageSlot.getAddressSlot(keccak256(abi.encode(ERC721SlotBase-1, tokenId)));
  }

  function getSlotBalances(address account) private pure returns (Uint256Slot storage) {
    // TODO: slot offset conventions
    return StorageSlot.getUint256Slot(keccak256(abi.encode(ERC721SlotBase-2, account)));
  }

  function getSlotTokenApprovals(uint256 tokenId) private pure returns (AddressSlot storage) {
    // TODO: slot offset conventions
    return StorageSlot.getAddressSlot(keccak256(abi.encode(ERC721SlotBase-3, tokenId)));
  }

  function getSlotOperatorApprovals(address owner, address operator) private pure returns (BooleanSlot storage) {
    // TODO: slot offset conventions
    return StorageSlot.getBooleanSlot(keccak256(abi.encode(ERC721SlotBase-4, owner, operator)));
  }

  function setOwners(uint256 tokenId, address _owner) internal virtual {
    getSlotOwners(tokenId).value = _owner;
  }

  function setBalances(address account, uint256 _balance) internal virtual {
    getSlotBalances(account).value = _balance;
  }

  function setTokenApproval(uint256 tokenId, address _operator) internal virtual {
    getSlotTokenApprovals(tokenId).value = _operator;
  }

  function setOperatorApproval(address owner, address operator, bool _approved) internal virtual {
    getSlotOperatorApprovals(owner, operator).value = _approved;
  }

  function setValidTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
    require(_isExists(tokenId), "ERC721: Invalid tokenId");
    setTokenURI(tokenId, _tokenURI);
  }

  function initERC721Base(string memory _name, string memory _symbol) public initializer {
    setName(_name);
    setSymbol(_symbol);
  }

  function owners(uint256 tokenId) public view override returns (address) {
    return getSlotOwners(tokenId).value;
  }

  function balances(address account) public view override returns (uint256) {
    return getSlotBalances(account).value;
  }

  function tokenApprovals(uint256 tokenId) public view override returns (address) {
    return getSlotTokenApprovals(tokenId).value;
  }

  function operatorApprovals(address owner, address operator) public view override returns (bool) {
    return getSlotOperatorApprovals(owner, operator).value;
  }

  /**
    * @dev See {IERC165-supportsInterface}.
  */  
  function supportInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
    return (interfaceId == type(IERC721).interfaceId 
    || interfaceId == type(IERC721Metadata).interfaceId
    || super.supportInterface(interfaceId));
  }

  /**
    * @dev Returns whether `tokenId` exists.
    *
    * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
    *
    * Tokens start existing when they are minted (`_mint`),
    * and stop existing when they are burned (`_burn`).
  */
  function _isExists(uint256 tokenId) internal view virtual returns (bool) {
    return _ownerOf(tokenId) != address(0);
  } 

  function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
    return owners(tokenId);
  }

  modifier checkTokenId(uint256 tokenId) {
    require(_isExists(tokenId), "ERC721: Invalid Token ID");
    _;
  }

  modifier checkAddress(address account) {
    require(account != address(0), "ERC721: Zero Addres is not Allowed");
    _;
  }

  /**
    * @dev See {IERC721-ownerOf}.
  */
  function ownerOf(uint256 tokenId) checkTokenId(tokenId) public view virtual override returns (address) {
    return _ownerOf(tokenId);
  }

  /**
    * @dev See {IERC721-balanceOf}.
  */
  function balanceOf(address owner) checkAddress(owner) public view virtual override returns (uint256) {
    return balances(owner);
  }

  /**
    * @dev See {IERC721-approve}.
  */
  function approve(address to, uint256 tokenId) 
    checkTokenId(tokenId) 
    checkAddress(to) 
    public virtual override {
    address owner = _ownerOf(tokenId);
    require(_msgSender() == owner, "ERC721: Approve Caller is not Token Owner");
    require(to != owner, "ERC721: Approval to Owner is not Allowed");
    require(isApprovedForAll(owner, _msgSender()), "ERC721: Token Already Approved for all");

    _approve(to, tokenId);
  }

  /**
    * @dev Approve `to` to operate on `tokenId`
    *
    * Emits an {Approval} event.
  */
  function _approve(address to, uint256 tokenId) internal virtual {
    setTokenApproval(tokenId, to);
    emit Approval(ownerOf(tokenId), to, tokenId);
  }

  /**
    * @dev See {IERC721-setApprovalForAll}.
  */
  function setApprovalForAll(address operator, bool approved) public virtual override {
    _setApprovalForAll(_msgSender(), operator, approved);
  }

  /**
    * @dev Approve `operator` to operate on all of `owner` tokens
    *
    * Emits an {ApprovalForAll} event.
  */
  function _setApprovalForAll(
    address owner,
    address operator,
    bool approved
  ) internal virtual {
    require(owner != operator, "ERC721: Approve to Caller is not Allowed");
    setOperatorApproval(owner, operator, approved);
    emit ApprovalForAll(owner, operator, approved);
  }

  /**
  * @dev Returns whether `spender` is allowed to manage `tokenId`.
  *
  * Requirements:
  *
  * - `tokenId` must exist.
  */
  function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
      address owner = ownerOf(tokenId);
      return (spender == owner || isApprovedForAll(owner, spender) || getApproved(tokenId) == spender);
  }

  /**
    * @dev Safely mints `tokenId` and transfers it to `to`.
    *
    * Requirements:
    *
    * - `tokenId` must not exist.
    * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
    *
    * Emits a {Transfer} event.
  */
  function _safeMint(address to, uint256 tokenId) checkAddress(to) internal virtual {
    require(!_isExists(tokenId), "ERC721: Exist TokenId is not Allowed");
    _safeMint(to, tokenId, "");
  }

  /**
    * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
    * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
  */
  function _safeMint(
    address to,
    uint256 tokenId,
    bytes memory data
  ) internal virtual {
    _mint(to, tokenId);
    require(
      _checkOnERC721Received(address(0), to, tokenId, data),
      "ERC721: Transfer to non ERC721Receiver implementer"
    );
  }

  /* @dev Mints `tokenId` and transfers it to `to`.
    *
    * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
    *
    * Requirements:
    *
    * - `tokenId` must not exist.
    * - `to` cannot be the zero address.
    *
    * Emits a {Transfer} event.
  */
  function _mint(address to, uint256 tokenId) checkAddress(to) internal virtual {
    require(!_isExists(tokenId), "ERC721: Exist TokenId is not Allowed");
    _beforeTokenTransfer(address(0), to, tokenId, 1);

    // Check that tokenId was not minted by `_beforeTokenTransfer` hook
    require(!_isExists(tokenId), "ERC721: Exist TokenId is not Allowed");
    require(to != address(0), "ERC721: Mint to the Zero Addres is not Allowed");

    unchecked {
        // Will not overflow unless all 2**256 token ids are minted to the same owner.
        // Given that tokens are minted one by one, it is impossible in practice that
        // this ever happens. Might change if we allow batch minting.
        // The ERC fails to describe this case.
        setBalances(to, balances(to) + 1);
    }

    setOwners(tokenId, to);

    emit Transfer(address(0), to, tokenId);

    _afterTokenTransfer(address(0), to, tokenId, 1);
  }

  /**
    * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
    * are aware of the ERC721 protocol to prevent tokens from being forever locked.
    *
    * `data` is additional data, it has no specified format and it is sent in call to `to`.
    *
    * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
    * implement alternative mechanisms to perform token transfer, such as signature-based.
    *
    * Requirements:
    *
    * - `from` cannot be the zero address.
    * - `to` cannot be the zero address.
    * - `tokenId` token must exist and be owned by `from`.
    * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
    *
    * Emits a {Transfer} event.
  */
  function _safeTransfer(
    address from,
    address to,
    uint256 tokenId,
    bytes memory data
  ) internal virtual {
    _transfer(from, to, tokenId);
    require(
      _checkOnERC721Received(from, to, tokenId, data),
      "ERC721: transfer to non ERC721Receiver implementer");
  }

  function _transfer(address from, address to, uint256 tokenId) checkAddress(to) internal virtual {
    require(ownerOf(tokenId) == from, "ERC721: Transfer from Incorrect Owner is Not Allowed");

    _beforeTokenTransfer(from, to, tokenId, 1);
    
    // Check that tokenId was not transferred by `_beforeTokenTransfer` hook
    require(ownerOf(tokenId) == from, "ERC721: Transfer from Incorrect Owner is Not Allowed");

    // Clear approvals from the previous owner
    setTokenApproval(tokenId, address(0));

    unchecked {
      // `_balances[from]` cannot overflow for the same reason as described in `_burn`:
      // `from`'s balance is the number of token held, which is at least one before the current
      // transfer.
      // `_balances[to]` could overflow in the conditions described in `_mint`. That would require
      // all 2**256 token ids to be minted, which in practice is impossible.
      setBalances(from, balances(from) - 1);
      setBalances(to, balances(to) + 1);
    }
    setOwners(tokenId, to); 

    emit Transfer(from, to, tokenId);
    _afterTokenTransfer(from, to, tokenId, 1); 
  }


    /**
    * @dev Destroys `tokenId`.
    * The approval is cleared when the token is burned.
    * This is an internal function that does not check if the sender is authorized to operate on the token.
    *
    * Requirements:
    *
    * - `tokenId` must exist.
    *
    * Emits a {Transfer} event.
    */ 
    function _burn(uint256 tokenId) checkTokenId(tokenId) internal virtual {
      address owner = ownerOf(tokenId);
      _beforeTokenTransfer(owner, address(0), tokenId, 1);

      // Update ownership in case tokenId was transferred by `_beforeTokenTransfer` hook
      owner = ownerOf(tokenId);

      // Clear approvals
      setTokenApproval(tokenId, address(0));
      unchecked {
        // Cannot overflow, as that would require more tokens to be burned/transferred
        // out than the owner initially received through minting and transferring in.
        setBalances(owner, balances(owner) - 1);
      }
      setOwners(tokenId, address(0));

      emit Transfer(owner, address(0), tokenId);

      _afterTokenTransfer(owner, address(0), tokenId, 1);      
    }

    /**
      * @dev See {IERC721-isApprovedForAll}.
    */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
      return operatorApprovals(owner, operator);
    }
    
    /**
      * @dev See {IERC721-transferFrom}.
    */
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
      require(
        _isApprovedOrOwner(_msgSender(), tokenId), 
        "ERC721: Callet is Not Token Owner or Approved Address"
        );
      _transfer(from, to, tokenId);
    }

    /**
      * @dev See {IERC721-safeTransferFrom}.
    */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
      safeTransferFrom(from, to, tokenId, "");
    }

    /**
      * @dev See {IERC721-safeTransferFrom}.
    */
    function safeTransferFrom(
      address from,
      address to,
      uint256 tokenId,
      bytes memory data
      ) public virtual override {
          require(_isApprovedOrOwner(_msgSender(), tokenId),
          "ERC721: Callet is Not Token Owner or Approved Address");
          _safeTransfer(from, to, tokenId, data);
      }

    /**
      * @dev See {IERC721-getApproved}.
    */
    function getApproved(uint256 tokenId) checkTokenId(tokenId) public view virtual override  returns (address) {
      return tokenApprovals(tokenId);
    }
    
    /**
      * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
      * The call is not executed if the target address is not a contract.
      *
      * @param from address representing the previous owner of the given token ID
      * @param to target address that will receive the tokens
      * @param tokenId uint256 ID of the token to be transferred
      * @param data bytes optional data to send along with the call
      * @return bool whether the call correctly returned the expected magic value
    */
  function _checkOnERC721Received(
      address from,
      address to,
      uint256 tokenId,
      bytes memory data
  ) private returns (bool) {
      if (to.isContract()) {
          try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, data) returns (bytes4 retval) {
              return retval == IERC721Receiver.onERC721Received.selector;
          } catch (bytes memory reason) {
              if (reason.length == 0) {
                  revert("ERC721: transfer to non ERC721Receiver implementer");
              } else {
                  /// @solidity memory-safe-assembly
                  assembly {
                      revert(add(32, reason), mload(reason))
                  }
              }
          }
      } else {
          return true;
      }
  }

    /**
    * @dev Hook that is called before any token transfer. This includes minting and burning. If {ERC721Consecutive} is
    * used, the hook may be called as part of a consecutive (batch) mint, as indicated by `batchSize` greater than 1.
    *
    * Calling conditions:
    *
    * - When `from` and `to` are both non-zero, ``from``'s tokens will be transferred to `to`.
    * - When `from` is zero, the tokens will be minted for `to`.
    * - When `to` is zero, ``from``'s tokens will be burned.
    * - `from` and `to` are never both zero.
    * - `batchSize` is non-zero.
    *
    * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
    */
  function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal virtual {}

  /**
    * @dev Hook that is called after any token transfer. This includes minting and burning. If {ERC721Consecutive} is
    * used, the hook may be called as part of a consecutive (batch) mint, as indicated by `batchSize` greater than 1.
    *
    * Calling conditions:
    *
    * - When `from` and `to` are both non-zero, ``from``'s tokens were transferred to `to`.
    * - When `from` is zero, the tokens were minted for `to`.
    * - When `to` is zero, ``from``'s tokens were burned.
    * - `from` and `to` are never both zero.
    * - `batchSize` is non-zero.
    *
    * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
    */
  function _afterTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal virtual {}
}