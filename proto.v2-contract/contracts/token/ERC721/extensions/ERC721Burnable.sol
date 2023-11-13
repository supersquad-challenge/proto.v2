// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.0;

import { ERC721Base } from "./../ERC721Base.sol";
import { ERC721SlotBase } from "./../ERC721SlotBase.sol";

import "./../../../utils/StorageSlot.sol";

abstract contract ERC721Burnable is ERC721Base {
  /**
  * @dev Burns `tokenId`. See {ERC721-_burn}.
  *
  * Requirements:
  *
  * - The caller must own `tokenId` or be an approved operator.
  */
  function burn(uint256 tokenId) public virtual {
    //solhint-disable-next-line max-line-length
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
    _burn(tokenId);
  }
}
