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
    uint256 private tokenIdCounter; // maybe not needed, can just use length of array

    // for iteration purposes 
    uint256[] public tokenIdList; // tokenId = i+1


    struct NFT {
     address currentOwner;
    //   bool isForSale; 
      uint256 currentPrice;
    
    }

    // // use for looking up data
    mapping (uint256 => NFT) NFTData;

    
    event MintedNFT(address indexed collectionAddress, address indexed to, string URI); 
    event NFTOwnershipTransferred(address indexed from, address indexed to, uint256 tokenId);

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    constructor(string memory _name, string memory _symbol, address _owner)
        ERC721(_name, _symbol) Ownable(_owner) {}



// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ GETTERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice Returns the latest token number (the total number of NFTs in the collection)
    /// @return tokenIdCounter A number that corresponds to the total number of NFTs in the collection.

    function getLatestTokenNumber() public view returns(uint256) {
        return(tokenIdCounter);
    }


     function getTokenIdList() public view returns(uint256[] memory) {
        return(tokenIdList);
    }

    function getNFTInfo(uint256 _tokenId) public view returns(NFT memory) {
        return(NFTData[_tokenId]);
    }
// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ SAFE MINT ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  /// @notice Collection owner mints (posts) a new NFT to the collection.
  /// @param _to is the address of the owner of the collection/contract, _URI is the metadata. 

 //todo- should the safemint not take a _to param at all?

    function safeMint(address _to, string memory _URI) public onlyOwner {
        
        tokenIdCounter++;
        _safeMint(_to, tokenIdCounter);
        _setTokenURI(tokenIdCounter, _URI);
         tokenIdList.push(tokenIdCounter);
        NFTData[tokenIdCounter].currentOwner = _to;

        emit MintedNFT(address(this), msg.sender, _URI); 

    }


    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ TRANSFER NFT OWNERSHIP ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice Current owner of an NFT transfers ownership to a new owner.
    /// @param _from: address of the current owner
    /// @param _from: address of the new owner
    /// @param _tokenId: token ID of the token to transfer
    function transferOwnership(address _from, address _to, uint256 _tokenId) public {
        require(NFTData[_tokenId].currentOwner == msg.sender, "Caller is not the owner");

        NFTData[_tokenId].currentOwner = _to;
        _transfer(_from, _to, _tokenId);

        emit NFTOwnershipTransferred(_from, _to, _tokenId);
    }


}