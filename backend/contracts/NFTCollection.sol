// SPDX-License-Identifier: MIT

// This contract handles each new collection of NFTs
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title this contract handles a collection of NFTs. Each user can create one collection.
/// @author Solene D.
/// @notice each user can have one collection only. 
contract NFTCollection is ERC721URIStorage, Ownable {


// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ VARIABLES ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    uint8 private tokenIdCounter; 



    struct NFT {
     address currentOwner;
    //  uint256 price;
    }

    // use for looking up data
    mapping (uint8 => NFT) public NFTData;

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ EVENTS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    
    event MintedNFT(address indexed collectionAddress, address indexed to, string URI); 
    event NFTOwnershipTransferred(address indexed from, address indexed to, uint256 tokenId);

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    constructor(string memory _name, string memory _symbol, address _owner)
        ERC721(_name, _symbol) Ownable(_owner) {}

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ GETTERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice Returns the latest token number (the total number of NFTs in the collection)
    /// @return tokenIdCounter A number that corresponds to the total number of NFTs in the collection.

    function getLatestTokenNumber() external view returns(uint128) {
        return(tokenIdCounter);
    }


    function getNFTInfo(uint8 _tokenId) external view returns(NFT memory) {
    // require collection exists
        return(NFTData[_tokenId]);
    }
// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ SAFE MINT ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  /// @notice Collection owner mints (posts) a new NFT to the collection.

    function safeMint(string memory _URI) external onlyOwner {

        require(tokenIdCounter < 30, "Token limit exceeded");   // limit total number of NFTs minted per collection to 30
        
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
    /// @param _tokenId: token ID of the token to transfer
    function transferOwnership(address _from, address _to, uint8 _tokenId) external {

        require(NFTData[_tokenId].currentOwner == msg.sender, "Caller is not owner");

        NFTData[_tokenId].currentOwner = _to;

        _transfer(_from, _to, _tokenId);

        emit NFTOwnershipTransferred(_from, _to, _tokenId);
    }


}