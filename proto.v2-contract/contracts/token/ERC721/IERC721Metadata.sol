// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */

interface IERC721Metadata {

  /**
    * @dev Returns the token collection name.
    */
  function name() external view returns (string memory);

  /**
    * @dev Returns the token collection symbol.
    */
  function symbol() external view returns (string memory);

  /**
    * @dev Returns the token collection tokenURI.
  */
  function tokenURI(uint256 tokenId) external view returns (string memory); 
}