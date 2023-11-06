// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC165 } from './IERC165.sol';

abstract contract ERC165 is IERC165 {
  /**
    * @dev See {IERC165-supportsInterface}.
  */
  function supportInterface(bytes4 interfaceId) public view virtual returns (bool) {
    return interfaceId == type(IERC165).interfaceId;
  }
}