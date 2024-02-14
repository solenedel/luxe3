const { ethers } = require('hardhat');
const { expect, assert } = require('chai');

// CONTRACT DEPLOYMENT

describe('Setup: Contract initialisation', function () {
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const contract = await ethers.getContractFactory('NFTCollection');
    NFTCollection = await contract.deploy('NAME', 'SYMBOL', owner.address);
  });

  it('Should deploy the contract with the address of the owner', async function () {
    assert.equal(owner.address, await NFTCollection.owner());
  });
});

// :::::::::: MARKETPLACE CONTRACT TESTS :::::::::::

// describe('🔵 [NFT Collection] Mint NFT', function () {
//   beforeEach(async function () {
//     [admin, user1] = await ethers.getSigners();
//     const contract = await ethers.getContractFactory('NFTCollection');
//     NFTCollection = await contract.deploy();
//   });

//   it('Should emit MintedNFT event when user mints an NFT', async () => {
//     expect(
//       await NFTCollection.connect(user1).safeMint(
//         user1.address,
//         'ipfs://bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy/metadata.json'
//       )
//     )
//       .to.emit('MintedNFT')
//       .withArgs(
//         NFTCollection.address,
//         user1.address,
//         'ipfs://bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy/metadata.json'
//       );
//   });
// });
