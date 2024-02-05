// SPDX-License-Identifier: MIT

// This contract handles each new collection of NFTs
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title this contract handles a collection of NFTs. Each user can create one collection.
/// @author Solene D.
/// @notice each user can have one collection only. 
contract NFTCollection is ERC721URIStorage, Ownable {

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ VARIABLES ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    uint256 private tokenIdCounter;

    // enum Status {
    //     ForSale, 
    //     Pending, // NFT has a new owner but physical item not yet received
    //     NotForSale
    //   }
 
    
    struct NFT {
      bool isForSale; 
      uint256 currentPrice;
      address currentOwner;
    }

    NFT[] public nftList; // tokenId = i+1


// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol) Ownable(msg.sender) {}

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTORS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


    modifier onlyForSale(uint256 _tokenId) {
        require(nftList[_tokenId-1].isForSale == true, "This NFT is not currently for sale.");
        _;
    }
    
    // is it worth having modifiers if you have to pass args to them
    //   modifier onlyCurrentOwner() {
    //     require(msg.sender, "This NFT is not currently for sale.");
    //     _;
    // }
 // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ SAFE MINT ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  /// @notice Collection owner mints (posts) a new NFT to the collection.
  /// @param _to is the address of the owner of the collection/contract, _URI is the metadata. 

    function safeMint(address _to, string memory _URI) public onlyOwner {
        
        tokenIdCounter++;
        _safeMint(_to, tokenIdCounter);
        _setTokenURI(tokenIdCounter, _URI);
        //todo- should the safemint not take a _to param at all?
        // todo - at what point is the initial price set for the nft?
    }

 // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ SET NEW PRICE ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  /// @notice Current owner of the NFT sets a new price for the NFT.
  /// @param _newPrice is the new price to set.
  /// @param _tokenId is the token ID of the NFT to update.

   function setNewPrice(uint256 _tokenId, uint256 _newPrice) public onlyForSale( _tokenId) {
    // set new price 
    
    // only the current owner of NFT can do this (not the contract owner)

   } 


 // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ BUY NFT ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  function buyNFT(string calldata _status, uint256 _tokenId) external {


    // check if status of the NFT is correct 
      // check if enough funds
      // 
    }


}