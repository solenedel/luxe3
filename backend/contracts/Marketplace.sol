// SPDX-License-Identifier: MIT


pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./NFTCollection.sol";

/// @title this contract handles marketplace actions, such as: creating a new collection (one per user), marking items as received, and more.
/// @author Solene D.
/// @notice 

contract Marketplace is Ownable {

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ VARIABLES ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    struct User {
      bool hasCollection; 
    }
    
    mapping (address => User) users;
    
    

    
    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    
    /// @notice Owner corresponds to the admin of the marketplace. 
    constructor() Ownable(msg.sender) {}


    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ FUNCTION: DEPLOY NEW COLLECTION ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice This function deploys a new NFTCollection contract. Only one collection is allowed per user.
    /// @param _name is the name of the new NFT collection, ex: "My Collection" and _symbol is the symbol, ex: "MC"

    function deployNewNFTCollection(string memory _name, string memory _symbol) public {   
       
      require(users[msg.sender].hasCollection == false, "You have already created an NFT collection.");

      NFTCollection newCollection = new NFTCollection(_name, _symbol);
      
      users[msg.sender].hasCollection = true; //todo - reentrancy here?
        
    }
}
