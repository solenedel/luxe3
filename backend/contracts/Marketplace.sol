// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./NFTCollection.sol";


/// @title this contract handles the creation of new ERC721 NFT collections.
/// @author Solene D.

contract Marketplace is Ownable {

   using Address for address payable; 

  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    
    /// @notice Owner corresponds to the admin of the marketplace. 
    constructor() Ownable(msg.sender){}

  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ VARIABLES ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    struct User {
      bool hasCollection; 
    }

    mapping (address => User) users;

    struct Collection {
        address contractAddress;
        string name;
        string symbol;
    }

    /// @notice Mapping to keep track of all ERC721 contracts (collections) created with the marketplace.
    /// @notice The address acting as the key to each collection is that of the collection creator, not the collection contract address itself.
    mapping(address => Collection) public allCollections;

    Collection[] public collectionsArray; 

  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ EVENTS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    event NFTCollectionCreated(address indexed contractAddress, string name, string symbol); 

  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ GETTERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice Gets all collections created by the Marketplace contract.
    /// @return An array of all the collections created. 
    function getAllCollections() external view returns (Collection[] memory) {
      return collectionsArray;
    }

    /// @notice Gets one collection, indexed by the creator (owner) of that collection.
    /// @param _addr: address of the collection owner.
    /// @return The single collection owned by the address provided.
    function getCollection(address _addr) external view returns (Collection memory) {
      return allCollections[_addr];
    }

    /// @notice Gets one collection, indexed by the creator (owner) of that collection.
    /// @param _addr: address of the user.
    /// @return The single collection owned by the address provided.
    function getUser(address _addr) external view returns (User memory) {
      return(users[_addr]);
    }


  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ DEPLOY NEW COLLECTION ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice This function deploys a new NFTCollection (ERC721) contract. Only one collection allowed per user.
    /// @param _name: The name of the new NFT collection, ex: "My Collection"
    /// @param _symbol: The symbol of the new collection, ex: "MC"
    function deployNewNFTCollection(string memory _name, string memory _symbol) public returns(Collection memory _newCollection) {   
       
      require(users[msg.sender].hasCollection == false, "Collection already created");

      require(keccak256(abi.encode(_name)) != keccak256(abi.encode("")), "Missing name");
      require(keccak256(abi.encode(_symbol)) != keccak256(abi.encode("")), "Missing symbol");

      // deploy new ERC721 contract 
      NFTCollection newCollection = new NFTCollection(_name, _symbol, msg.sender);

      _newCollection = Collection({
            contractAddress: address(newCollection),
            name: _name,
            symbol: _symbol
        });

       // store new collection's contract address and other details
      allCollections[msg.sender] = _newCollection;

      collectionsArray.push(_newCollection);

      users[msg.sender].hasCollection = true; 

      emit NFTCollectionCreated(address(newCollection), _name, _symbol);   
    }

}
