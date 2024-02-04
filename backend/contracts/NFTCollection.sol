// SPDX-License-Identifier: MIT

// This contract handles each new collection of NFTs
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract NFTCollection is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol) {}

 
}