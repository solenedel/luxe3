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
    
    enum SaleStatus {
      PaidByBuyer,
      PendingItemReceipt, 
      ItemReceived, 
      FundsUnlocked, 
      SaleComplete
    }

    struct Sale {
      address buyer;
      address seller;
      uint256 soldFor; // final price of sale
      SaleStatus status;
      // date ??
    }
    

    
    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    
    /// @notice Owner corresponds to the admin of the marketplace. 
    constructor() Ownable(msg.sender) {}


    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ DEPLOY NEW COLLECTION ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice This function deploys a new NFTCollection contract. Only one collection is allowed per user.
    /// @param _name is the name of the new NFT collection, ex: "My Collection" and _symbol is the symbol, ex: "MC"
    function deployNewNFTCollection(string memory _name, string memory _symbol) public {   
       
      require(users[msg.sender].hasCollection == false, "You have already created an NFT collection.");
      require(keccak256(abi.encode(_name)) != keccak256(abi.encode("")), "Name cannot be empty.");
      require(keccak256(abi.encode(_symbol)) != keccak256(abi.encode("")), "Symbol cannot be empty.");

      NFTCollection newCollection = new NFTCollection(_name, _symbol);

      users[msg.sender].hasCollection = true; //todo - reentrancy here?
        
        // event
    }

      // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ MARK AS RECEIVED ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


    /// @notice A user marks the physical item as being received. 
    /// @param _tokenId is respective to the NFT that was purchased.
      function markAsReceived(uint256 _tokenId) private {
        // set to true
      }

      // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ UNLOCK FUNDS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
      

    /// @notice The marketplace admin unlocks the payment and the platform takes a cut.
      function unlockFunds() onlyOwner private {
        // most of the amount goes to the seller (prev owner) of the NFT
        // marketplace takes a percentage
      }
}
