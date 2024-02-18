// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title this contract handles a collection of NFTs. Each user can have one collection.
/// @author Solene D.

contract NFTCollection is ERC721URIStorage, Ownable {

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ VARIABLES ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    uint8 private tokenIdCounter; 

    struct NFT {
     address currentOwner;
    }

    mapping (uint8 => NFT) public NFTData;

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ EVENTS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
   
    event MintedNFT(address indexed collectionAddress, address indexed to, string URI); 
    event NFTOwnershipTransferred(address indexed from, address indexed to, uint8 tokenId);

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    constructor(string memory _name, string memory _symbol, address _owner)
        ERC721(_name, _symbol) Ownable(_owner) {}

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ GETTERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice Gets the latest token number (total number of NFTs in the collection).
    /// @return tokenIdCounter: a number that corresponds to the total number of NFTs in the collection.
    function getLatestTokenNumber() external view returns(uint128) {
        return(tokenIdCounter);
    }

    /// @notice Gets info about a specific token / NFT.
    /// @param _tokenId: ID of the token / NFT. 
    /// @return A struct for that token / NFT.
    function getNFTInfo(uint8 _tokenId) external view returns(NFT memory) {
        return(NFTData[_tokenId]);
    }
// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ SAFE MINT ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice Collection owner mints (posts) a new NFT to the collection.
    /// @param _URI: the URI data returned from IPFS.
    /// @notice There is a limit of 30 NFTs that can be minted per collection.
    function safeMint(string calldata _URI) external onlyOwner {

        require(tokenIdCounter < 30, "Token limit exceeded");   
        
        tokenIdCounter++;
        NFTData[tokenIdCounter].currentOwner = msg.sender;

        _safeMint(msg.sender, tokenIdCounter);
        _setTokenURI(tokenIdCounter, _URI);

        emit MintedNFT(address(this), msg.sender, _URI); 
    }

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ TRANSFER NFT OWNERSHIP ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice Current owner of an NFT transfers ownership to a new owner.
    /// @param _from: address of the current owner
    /// @param _from: address of the new owner
    /// @param _tokenId: ID of the token to transfer.
    function transferOwnership(address _from, address _to, uint8 _tokenId) external {

        require(msg.sender != NFTData[_tokenId].currentOwner, "You already own this NFT");
        require(_from != _to, "No transfer to same addr"); 

        NFTData[_tokenId].currentOwner = _to;

        _transfer(_from, _to, _tokenId);

        emit NFTOwnershipTransferred(_from, _to, _tokenId);
    }

}