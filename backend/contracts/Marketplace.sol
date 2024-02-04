// SPDX-License-Identifier: MIT


pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";


import "./NFTCollection.sol";

/// @title this contract handles marketplace actions, such as: creating a new collection (one per user), marking items as received, and more.
/// @author Solene D.
/// @notice 

contract Marketplace is Ownable {
    
    constructor() Ownable(msg.sender) {}

    /// @notice This function deploys a new NFTCollection contract. Only one collection is allowed per user.
    /// @param _name is the name of the new NFT collection, ex: "My Collection" and _symbol is the symbol, ex: "MC"
    /// @return 
        function deployNewNFTCollection(string memory _name, string memory _symbol) public {
        // todo - check if user already has a collection or not.
        NFTCollection newCollection = new NFTCollection(_name, _symbol);
        
    }
}
