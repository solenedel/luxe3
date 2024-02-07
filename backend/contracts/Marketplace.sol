// SPDX-License-Identifier: MIT

//QUESTIONS
// how to deal with arrays? is it not goot to write a getter for an array because of gas?
// in that case, can we mirror the state in the react app so that we don't need to get it in the smart contract
// but in that case need to store it in a DB 

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

    SaleStatus public saleStatus;

    struct Collection {
        address contractAddress;
        string name;
        string symbol;
    }

    // Mapping to keep track of all ERC721 contracts (collections) created with the marketplace
    mapping(address => Collection) public allCollections;

    // for iteration purposes
    Collection[] public collectionsArray;

    struct SaleInfo {
      address buyer;
      address seller;
      uint256 soldFor; // final price of sale
      SaleStatus status;
      // date ??
    }

     struct NFT {
      bool isForSale; 
      uint256 currentPrice;
      address currentOwner;
    }

      // use for looking up data
    mapping (uint256 => NFT) nftData;


      // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ EVENTS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


      event NFTCollectionCreated(address indexed contractAddress, string name, string symbol); 
      event SaleStatusChange(SaleStatus prevStatus, SaleStatus newStatus); 
      event SaleInitiated(SaleInfo saleInfo);
      event NFTPriceChanged(uint256 oldPrice, uint256 newPrice);
      // event NewNFTMinted(); IN OTHER CONTRACT


    
// ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ MODIFIERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
 
       modifier onlyForSale(uint256 _tokenId) {
        require(nftData[_tokenId-1].isForSale == true, "This NFT is not currently for sale.");
        _;
    }

    /// @notice note the distinction between the below modifier and the generic onlyOwner  
    modifier onlyCurrentNFTOwner(uint256 _tokenId) {
        require(nftData[_tokenId-1].currentOwner == msg.sender, "You are not the current owner of this NFT.");
        _;
    }
    

    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ CONSTRUCTOR ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
    
    /// @notice Owner corresponds to the admin of the marketplace, not of an NFT or collection. 
    constructor() Ownable(msg.sender) {}



    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ GETTERS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


  function getAllCollections() public view returns (Collection[] memory) {
    return collectionsArray;
  }
    // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ DEPLOY NEW COLLECTION ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

    /// @notice This function deploys a new NFTCollection contract. Only one collection is allowed per user.
    /// @param _name is the name of the new NFT collection, ex: "My Collection" and _symbol is the symbol, ex: "MC"
    function deployNewNFTCollection(string memory _name, string memory _symbol) public {   
       
      require(users[msg.sender].hasCollection == false, "You have already created an NFT collection.");
      require(keccak256(abi.encode(_name)) != keccak256(abi.encode("")), "Name cannot be empty.");
      require(keccak256(abi.encode(_symbol)) != keccak256(abi.encode("")), "Symbol cannot be empty.");

      NFTCollection newCollection = new NFTCollection(_name, _symbol);

       // store new collection's contract address and other details
        allCollections[address(newCollection)] = Collection({
            contractAddress: address(newCollection),
            name: _name,
            symbol: _symbol
        });


      users[msg.sender].hasCollection = true; //todo - reentrancy here?
        
        // emit event
      emit NFTCollectionCreated(address(newCollection), _name, _symbol);
    }

  // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ SET NEW PRICE ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  /// @notice Current owner of the NFT sets a new price for the NFT.
  /// @param _newPrice is the new price to set.
  /// @param _tokenId is the token ID of the NFT to update.

   function setNewPrice(uint256 _tokenId, uint256 _newPrice) public onlyForSale( _tokenId) onlyCurrentNFTOwner(_tokenId) {
   
    uint256 _oldPrice = nftData[_tokenId].currentPrice;
    require(_oldPrice != _newPrice, "The new price must be different from the current price.");

    nftData[_tokenId].currentPrice = _newPrice; // updates the price
    
     // emit event
        emit NFTPriceChanged(_oldPrice, _newPrice); // add addr to this?
   } 

   // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ BUY NFT ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️

  // function buyNFT(string calldata _status, uint256 _tokenId) external {

  //   // should this function be in the other contract?
  //   // check if status of the NFT is correct 
  //     // check if enough funds
  //     // 
  //   }


      // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ MARK AS RECEIVED ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️


    /// @notice A user marks the physical item as being received. 
    /// @param _tokenId is respective to the NFT that was purchased.
      // function markAsReceived(uint256 _tokenId) private {
      //   // set to true
      // }

      // ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ UNLOCK FUNDS ◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️
      

    /// @notice The marketplace admin unlocks the payment and the platform takes a cut.
      // function unlockFunds() onlyOwner private {
      //   // most of the amount goes to the seller (prev owner) of the NFT
      //   // marketplace takes a percentage
      // }
}
