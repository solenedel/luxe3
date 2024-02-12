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

    // struct NFT {
    //   bool isForSale; 
    //   uint256 currentPrice;
    //   address currentOwner;
    // }

    // // use for looking up data
    // mapping (uint256 => NFT) nftData;

    
    event MintedNFT(address indexed collectionAddress, address indexed to, string URI); 

// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    constructor(string memory _name, string memory _symbol, address _owner)
        ERC721(_name, _symbol) Ownable(_owner) {}



// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ GETTERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice Returns the latest token number (the total number of NFTs in the collection)
    /// @return _tokenIdCounter A number that corresponds to the total number of NFTs in the collection.

    function getLatestTokenNumber() public pure returns(uint256 _tokenIdCounter) {
        return(_tokenIdCounter);
    }

     function getNFTs() public pure returns(uint256 _tokenIdCounter) {
        return(_tokenIdCounter);
    }
// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ SAFE MINT ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  /// @notice Collection owner mints (posts) a new NFT to the collection.
  /// @param _to is the address of the owner of the collection/contract, _URI is the metadata. 

    function safeMint(address _to, string memory _URI) public onlyOwner {
        
        tokenIdCounter++;
        _safeMint(_to, tokenIdCounter);
        _setTokenURI(tokenIdCounter, _URI);
        //todo- should the safemint not take a _to param at all?

        emit MintedNFT(address(this), msg.sender, _URI); 

    }

    

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ TRANSFER NFT OWNERSHIP ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    // function transferNFT()
    // use the generic transferFrom ??


}