// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.11;

import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/utils/Strings.sol";
import "@klaytn/contracts/utils/Base64.sol";

contract SupersquadNFT is KIP17URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    event NftMinted(uint _tokenId, string _experience, address _owner);
    event NftUpgraded(uint _tokenId, string _experience, address _owner);

    enum ExperienceLevel {
        Beginner,
        Intermediate,
        Expert
    }

    mapping(uint => ExperienceLevel) _idToDetails;
    address payable _owner;

    constructor() KIP17("Supersquad NFT", "SuperNFT") {
        _owner = payable(msg.sender);
    }

    function experienceLevelToString(
        ExperienceLevel _experience
    ) internal pure returns (string memory) {
        if (_experience == ExperienceLevel.Beginner) {
            return "Beginner";
        } else if (_experience == ExperienceLevel.Intermediate) {
            return "Intermediate";
        } else if (_experience == ExperienceLevel.Expert) {
            return "Expert";
        } else {
            revert("Invalid experience level");
        }
    }

    function generateSVGImage(
        uint tokenId,
        ExperienceLevel _experience
    ) public returns (string memory) {
        string
            memory svgUrl1 = "https://proto-v2.s3.ap-northeast-2.amazonaws.com/dynamicNFT/1.png";
        string
            memory svgUrl2 = "https://proto-v2.s3.ap-northeast-2.amazonaws.com/dynamicNFT/2.png";
        string
            memory svgUrl3 = "https://proto-v2.s3.ap-northeast-2.amazonaws.com/dynamicNFT/3.png";

        if (_experience == ExperienceLevel.Beginner) {
            return svgUrl1;
        } else if (_experience == ExperienceLevel.Intermediate) {
            return svgUrl2;
        } else if (_experience == ExperienceLevel.Expert) {
            return svgUrl3;
        } else {
            revert("Invalid experience level");
        }
    }

    function generateTokenURI(
        uint256 tokenId,
        ExperienceLevel _experience
    ) public returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Supersquad NFT #',
            tokenId.toString(),
            '",',
            '"description": "SuperNFT on Klaytn",',
            '"image": "',
            generateSVGImage(tokenId, _experience),
            '"',
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function mint() public {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        _idToDetails[newItemId] = ExperienceLevel.Beginner;

        _setTokenURI(
            newItemId,
            generateTokenURI(newItemId, _idToDetails[newItemId])
        );

        emit NftMinted(
            newItemId,
            experienceLevelToString(_idToDetails[newItemId]),
            msg.sender
        );
    }

    function upgradeNFTLevel(
        uint256 tokenId,
        ExperienceLevel _experience
    ) public payable {
        require(_exists(tokenId), "Please use an existing token");

        require(
            ownerOf(tokenId) == msg.sender,
            "You must own this token to train it"
        );

        _idToDetails[tokenId] = _experience;

        _setTokenURI(tokenId, generateTokenURI(tokenId, _idToDetails[tokenId]));

        emit NftUpgraded(
            tokenId,
            experienceLevelToString(_idToDetails[tokenId]),
            msg.sender
        );
    }

    function getNftExperience(
        uint tokenId
    ) public view returns (string memory) {
        ExperienceLevel experience = _idToDetails[tokenId];
        return experienceLevelToString(experience);
    }
}
