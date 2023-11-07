// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC721/ERC721Metadata.sol)

pragma solidity ^0.8.0;

import { IERC721Metadata } from "./IERC721Metadata.sol";
import { ERC721Utils } from "./ERC721Utils.sol";
import { Context } from "../../utils/Context.sol";
import { StorageSlot, StringSlot, Uint256Slot } from "../../utils/StorageSlot.sol";
import { ERC721SlotBase } from "./ERC721SlotBase.sol";

abstract contract ERC721Metadata is IERC721Metadata, ERC721Utils {
  function getSlotName() private pure returns (StringSlot storage) {
      // TODO: slot offset conventions
      return StorageSlot.getStringSlot(ERC721SlotBase-1);
  }
  function getSlotSymbol() private pure returns (StringSlot storage) {
      // TODO: slot offset conventions
      return StorageSlot.getStringSlot(ERC721SlotBase-2);
  }
  function getSlotTokenURI(uint256 tokenId) private pure returns (StringSlot storage) {
      string memory baseURI = baseURI();

      // TODO: slot offset conventions
      return bytes(baseURI).length > 0 
        ? StorageSlot.getStringSlot(bytes32(abi.encode(baseURI, tokenId)))
        : StorageSlot.getStringSlot("");
  }

  function setName(string memory _name) internal {
    getSlotName().value = _name;
  }

  function setSymbol(string memory _symbol) internal {
    getSlotSymbol().value = _symbol;
  }

  function setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
    getSlotTokenURI(tokenId).value = _tokenURI;
  }

  function name() public view override returns (string memory) {
    return getSlotName().value;
  }
  function symbol() public view override returns (string memory) {
    return getSlotSymbol().value;
  }
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
      return getSlotTokenURI(tokenId).value;
  }
}