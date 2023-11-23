// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.0;

import { ERC721Base } from "./../ERC721Base.sol";
import { ERC721SlotBase } from "./../ERC721SlotBase.sol";

import { IERC721Enumerable } from "./interface/IERC721Enumerable.sol";

import './../../../utils/StorageSlot.sol';

/**
 * @dev This implements an optional extension of {ERC721} defined in the EIP that adds
 * enumerability of all the token ids in the contract as well as all token ids owned by each
 * account.
 */
abstract contract ERC721Enumerable is IERC721Enumerable, ERC721Base {
    function getSlotOwnedTokens(address owner, uint256 index) private pure returns (Uint256Slot storage) {
      // TODO: slot offset conventions
      return StorageSlot.getUint256Slot(keccak256(abi.encode(ERC721SlotBase-5, owner, index)));
    }

    function getSlotOwnedTokensIndex(uint256 tokenId) private pure returns (Uint256Slot storage) {
      // TODO: slot offset conventions
      return StorageSlot.getUint256Slot(keccak256(abi.encode(ERC721SlotBase-6, tokenId)));
    }

    function getSlotAllTokens() private pure returns (Uint256ArraySlot storage) {
      // TODO: slot offset conventions
      return StorageSlot.getUint256ArraySlot(ERC721SlotBase-7);
    }

    function getSlotAllTokensIndex(uint256 tokenId) private pure returns (Uint256Slot storage) {
      // TODO: slot offset conventions
      return StorageSlot.getUint256Slot(keccak256(abi.encode(ERC721SlotBase-8, tokenId)));
    }

    function setOwnedTokens(address owner, uint256 ownedIndex, uint256 tokenId) private {
      getSlotOwnedTokens(owner, ownedIndex).value = tokenId;
    }

    function setOwnedTokensIndex(uint256 tokenId, uint256 ownedIndex) private {
      getSlotOwnedTokensIndex(tokenId).value = ownedIndex;
    }

    function _allTokens() private view returns (uint256[] storage) {
      return getSlotAllTokens().value;
    }

    function setAllTokensIndex(uint256 tokenId, uint256 allTokensIndex) private {
      getSlotAllTokensIndex(tokenId).value = allTokensIndex;
    }

    /**
      * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
    */
    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256) {
      require(index < ERC721Base.balanceOf(owner), "ERC721Enumerable: Owner index out of bounds");
      return getSlotOwnedTokens(owner, index).value;
    }

    /**
      * @dev See {IERC721Enumerable-totalSupply}.
    */
    function totalSupply() public view virtual override returns (uint256) {
      return _allTokens().length;
    }

    /**
      * @dev See {IERC721Enumerable-tokenByIndex}.
    */
    function tokenByIndex(uint256 index) public view virtual override returns (uint256) {
      require(index < ERC721Enumerable.totalSupply(), "ERC721Enumerable: Global index out of bounds");
      return _allTokens()[index];
    }

    /**
      * @dev See {ERC721-_beforeTokenTransfer}.
    */
    function _beforeTokenTransfer(
      address from,
      address to,
      uint256 firstTokenId,
      uint256 batchSize
    ) internal virtual override {
      super._beforeTokenTransfer(from, to, firstTokenId, batchSize);

      if (batchSize > 1) {
          // Will only trigger during construction. Batch transferring (minting) is not available afterwards.
          revert("ERC721Enumerable: consecutive transfers not supported");
      }

      uint256 tokenId = firstTokenId;

      if (from == address(0)) {
          _addTokenToAllTokensEnumeration(tokenId);
      } else if (from != to) {
          _removeTokenFromOwnerEnumeration(from, tokenId);
      }
      if (to == address(0)) {
          _removeTokenFromAllTokensEnumeration(tokenId);
      } else if (to != from) {
          _addTokenToOwnerEnumeration(to, tokenId);
      }
    }

    /**
     * @dev Private function to add a token to this extension's ownership-tracking data structures.
     * @param to address representing the new owner of the given token ID
     * @param tokenId uint256 ID of the token to be added to the tokens list of the given address
     */
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint256 length = ERC721Base.balanceOf(to);
        setOwnedTokens(to, length, tokenId);
        getSlotOwnedTokensIndex(tokenId).value = length;
    }

    /**
     * @dev Private function to add a token to this extension's token tracking data structures.
     * @param tokenId uint256 ID of the token to be added to the tokens list
    */
    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
      setAllTokensIndex(tokenId, _allTokens().length);
      _allTokens().push(tokenId);
    }

    /**
     * @dev Private function to remove a token from this extension's ownership-tracking data structures. Note that
     * while the token is not assigned a new owner, the `_ownedTokensIndex` mapping is _not_ updated: this allows for
     * gas optimizations e.g. when performing a transfer operation (avoiding double writes).
     * This has O(1) time complexity, but alters the order of the _ownedTokens array.
     * @param from address representing the previous owner of the given token ID
     * @param tokenId uint256 ID of the token to be removed from the tokens list of the given address
     */
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = ERC721Base.balanceOf(from) - 1;
        uint256 tokenIndex = getSlotOwnedTokensIndex(tokenId).value;

        // When the token to delete is the last token, the swap operation is unnecessary
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = getSlotOwnedTokens(from, lastTokenIndex).value;

            setOwnedTokens(from, tokenIndex, lastTokenId); // Move the last token to the slot of the to-delete token
            setOwnedTokensIndex(lastTokenId, tokenIndex); // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        setOwnedTokensIndex(tokenId, 0);
        setOwnedTokens(from, lastTokenIndex, 0);
    }

    /**
     * @dev Private function to remove a token from this extension's token tracking data structures.
     * This has O(1) time complexity, but alters the order of the _allTokens() array.
     * @param tokenId uint256 ID of the token to be removed from the tokens list
     */
    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        // To prevent a gap in the tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _allTokens().length - 1;
        uint256 tokenIndex = getSlotAllTokensIndex(tokenId).value;

        // When the token to delete is the last token, the swap operation is unnecessary. However, since this occurs so
        // rarely (when the last minted token is burnt) that we still do the swap here to avoid the gas cost of adding
        // an 'if' statement (like in _removeTokenFromOwnerEnumeration)
        uint256 lastTokenId = _allTokens()[lastTokenIndex];

        _allTokens()[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        setAllTokensIndex(lastTokenId, tokenIndex); // Update the moved token's index

        // This also deletes the contents at the last position of the array
        setAllTokensIndex(tokenId, 0);
        _allTokens().pop();
    }
}
