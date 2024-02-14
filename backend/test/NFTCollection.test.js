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

describe('🔵 [NFT Collection] Mint NFT', function () {
  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
    const contract = await ethers.getContractFactory('NFTCollection');
    NFTCollection = await contract.deploy('NAME', 'SYMBOL', owner.address);
  });

  it('Should only allow the owner of the collection to mint an NFT', async function () {
    await expect(
      NFTCollection.connect(user1).safeMint(
        user1.address,
        'ipfs://bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy/metadata.json'
      )
    ).to.be.revertedWithCustomError(
      NFTCollection,
      'OwnableUnauthorizedAccount'
    );
  });

  it('Should emit MintedNFT event when owner mints an NFT', async () => {
    expect(
      await NFTCollection.safeMint(
        owner.address,
        'ipfs://bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy/metadata.json'
      )
    )
      .to.emit('MintedNFT')
      .withArgs(
        NFTCollection.address,
        owner.address,
        'ipfs://bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy/metadata.json'
      );
  });

  it('Should allow the owner to mint several NFTs', async () => {
    await NFTCollection.safeMint(owner.address, 'ipfs://test1');
    await NFTCollection.safeMint(owner.address, 'ipfs://test2');
    expect(await NFTCollection.safeMint(owner.address, 'ipfs://test3'))
      .to.emit('MintedNFT')
      .withArgs(NFTCollection.address, owner.address, 'ipfs://test3');
  });

  it('Should have tokenIdCounter = 0 before any NFTs have been minted', async function () {
    expect(await NFTCollection.getLatestTokenNumber()).to.equal(0);
    expect(await NFTCollection.getTokenIdList()).to.deep.equal([]);
  });

  it('Should have tokenIdCounter = 1 when one NFT has been minted', async function () {
    await NFTCollection.safeMint(owner.address, 'ipfs://test1');
    expect(await NFTCollection.getLatestTokenNumber()).to.equal(1);
  });

  it('Should have tokenIdCounter = 3 when 3 NFTs have been minted', async function () {
    await NFTCollection.safeMint(owner.address, 'ipfs://test1');
    await NFTCollection.safeMint(owner.address, 'ipfs://test2');
    await NFTCollection.safeMint(owner.address, 'ipfs://test3');

    expect(await NFTCollection.getLatestTokenNumber()).to.equal(3);
    expect(await NFTCollection.getTokenIdList()).to.deep.equal([1, 2, 3]);
  });
});
