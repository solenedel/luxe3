// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./NFTCollection.sol";



/// @title this contract handles marketplace actions, such as: creating a new collection (one per user), marking items as received, and more.
/// @author Solene D.
/// @notice 

contract Marketplace is Ownable {

   using Address for address payable; // no need anymore for this?

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    
    /// @notice Owner corresponds to the admin of the marketplace, not of an NFT or collection. 
    constructor() Ownable(msg.sender){}

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ VARIABLES ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    struct User {
      bool hasCollection; 
    }

    mapping (address => User) users;

  // uint256 public NFTprice; // use same price for all NFTs

    struct Collection {
        address contractAddress;
        string name;
        string symbol;
    }

    // Mapping to keep track of all ERC721 contracts (collections) created with the marketplace
    // note that the address acting as the key to each collection is that of the collection creator, not the collection contract address itself
    mapping(address => Collection) public allCollections;

    // for iteration purposes
    Collection[] public collectionsArray; // is this array needed??

  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ EVENTS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  event NFTCollectionCreated(address indexed contractAddress, string name, string symbol); 
  // event NFTCollectionCreatedByAdmin(address indexed contractAddress, address indexed sender, string name, string symbol);
// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ GETTERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


// should these getters be public or external??
    /// @notice Gets all collections created by the Marketplace contract.
    /// @return An array of all the collections created. 
  function getAllCollections() external view returns (Collection[] memory) {
    return collectionsArray; // not needed?
  }

    /// @notice Gets one collection, indexed by the creator (owner) of that collection.
    /// @return The single collection owned by the address provided.
  function getCollection(address _address) external view returns (Collection memory) {
    return allCollections[_address];
  }

  function getUser(address _addr) external view returns (User memory) {
    return(users[_addr]);
  }


    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ DEPLOY NEW COLLECTION ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice This function deploys a new NFTCollection contract. Only one collection is allowed per user.
    /// @param _name is the name of the new NFT collection, ex: "My Collection" and _symbol is the symbol, ex: "MC"
    function deployNewNFTCollection(string memory _name, string memory _symbol) public returns(Collection memory _newCollection) {   
       
      require(users[msg.sender].hasCollection == false, "Collection already created");

      require(keccak256(abi.encode(_name)) != keccak256(abi.encode("")), "Missing name");
      require(keccak256(abi.encode(_symbol)) != keccak256(abi.encode("")), "Missing symbol");

    
      
      // deploy new ERC721 contract for the collection
      NFTCollection newCollection = new NFTCollection(_name, _symbol, msg.sender);

      _newCollection = Collection({
            contractAddress: address(newCollection),
            name: _name,
            symbol: _symbol
        });

       // store new collection's contract address and other details
      allCollections[msg.sender] = _newCollection;

      collectionsArray.push(_newCollection);

      users[msg.sender].hasCollection = true; // should this go here

      // todo- remove return value here, not doing anything
     
        // emit event

        emit NFTCollectionCreated(address(newCollection), _name, _symbol);   
        //  emit NFTCollectionCreated(address(newCollection), msg.sender, _name, _symbol);         

      // return (_newCollection); // todo- test that this works now in the tests/??
    }

}
