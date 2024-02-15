// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./NFTCollection.sol";


// // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ USE NFT COLLECTION CONTRACT  ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼◼️◼️


  struct NFT {
     address currentOwner;
     uint256 price;
    }
interface INFTCollection {


    function ownerOf(uint256 _tokenId) external view returns (address _collectionOwner);
    function transferFrom(address _from, address _to, uint256 _tokenId) external;
    function getNFTInfo(uint256 tokenId) external view returns (NFT memory);
    // does the safeMint func need to be here? and transfer ownership
  }


/// @title this contract handles marketplace actions, such as: creating a new collection (one per user), marking items as received, and more.
/// @author Solene D.
/// @notice 

contract Marketplace is Ownable {

   using Address for address payable;

  // define interface to interact with NFT collection contract instances
  INFTCollection public nftCollectionInterface;


    // contract addresses of the NFT collections
    // address[] public nftCollectionAddressesArray;

     // Instantiate NFT collection contracts
    // mapping(address => INFTCollection) public nftCollectionInterfaces;

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    
    /// @notice Owner corresponds to the admin of the marketplace, not of an NFT or collection. 
    constructor() Ownable(msg.sender){}

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ VARIABLES ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    struct User {
      bool hasCollection; 
    }

  uint256 public NFTprice; // use same price for all NFTs

  // struct NFT {
  //    address currentOwner;
  //    uint256 currentPrice;
  //    uint256 price;
  //   }


    mapping (address => User) users;

    struct Collection {
        address contractAddress;
        string name;
        string symbol;
    }

 
    // Mapping to keep track of all ERC721 contracts (collections) created with the marketplace
    // note that the address acting as the key to each collection is that of the collection creator, not the collection contract address itself
    mapping(address => Collection) public allCollections;

    // for iteration purposes
    Collection[] public collectionsArray; 

     struct SaleInfo {
        uint256 tokenId;
        address payable seller;
        // address buyer;
        uint256 price;
        bool isForSale;
        // SaleStatus status;
    }

    mapping(uint256 => SaleInfo) public sales;



  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ EVENTS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


      event NFTCollectionCreated(address indexed contractAddress, string name, string symbol); 


    
// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ MODIFIERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
 
    
    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ GETTERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


    /// @notice Gets all collections created by the Marketplace contract.
    /// @return An array of all the collections created. 
  function getAllCollections() public view returns (Collection[] memory) {
    return collectionsArray;
  }

    /// @notice Gets one collection, indexed by the creator (owner) of that collection.
    /// @return The single collection owned by the address provided.
  function getCollection(address _address) public view returns (Collection memory) {
    return allCollections[_address];
  }

  function getUser(address _addr) public view returns (User memory) {
    return(users[_addr]);
  }

  // function getNFTDataFromCollection(address _collectionAddr, uint256 _tokenId) public view returns (NFT memory) {
  //   // require(collectionsArray[_collectionAddr] != "", "Invalid NFT Collection address.");
  //    INFTCollection collection = INFTCollection(_collectionAddr);
  //   return collection.getNFTInfo(_tokenId);

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ DEPLOY NEW COLLECTION ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice This function deploys a new NFTCollection contract. Only one collection is allowed per user.
    /// @param _name is the name of the new NFT collection, ex: "My Collection" and _symbol is the symbol, ex: "MC"
    function deployNewNFTCollection(string memory _name, string memory _symbol) public returns(Collection memory _newCollection) {   
       
      require(users[msg.sender].hasCollection == false, "You have already created an NFT collection.");
      require(keccak256(abi.encode(_name)) != keccak256(abi.encode("")), "Name cannot be empty.");
      require(keccak256(abi.encode(_symbol)) != keccak256(abi.encode("")), "Symbol cannot be empty.");

      NFTCollection newCollection = new NFTCollection(_name, _symbol, msg.sender);

      _newCollection = Collection({
            contractAddress: address(newCollection),
            name: _name,
            symbol: _symbol
        });

       // store new collection's contract address and other details
      allCollections[msg.sender] = _newCollection;

      collectionsArray.push(_newCollection);

      users[msg.sender].hasCollection = true; //todo - reentrancy here?

      // todo- remove return value here, not doing anything
      
        // emit event
      emit NFTCollectionCreated(address(newCollection), _name, _symbol);
    }

}
