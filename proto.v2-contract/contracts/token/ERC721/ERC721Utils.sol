// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

abstract contract ERC721Utils {
  
  /**
    * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
    * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
    * by default, can be overridden in child contracts.
  */
  function baseURI() internal pure returns (string memory) {
    return "";
  }
}