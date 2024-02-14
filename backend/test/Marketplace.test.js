const { ethers } = require('hardhat');
const { expect, assert } = require('chai');

// todo - maybe all tests should go in this file?

// CONTRACT DEPLOYMENT

describe('Setup: Contract initialisation', function () {
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const contract = await ethers.getContractFactory('Marketplace');
    marketplace = await contract.deploy();
  });

  it('Should deploy the contract with the address of the owner', async function () {
    assert.equal(owner.address, await marketplace.owner());
  });
});

// :::::::::: DEPLOY NEW NFT COLLECTION :::::::::::
// CONTRACT DEPLOYMENT

describe('🔵 [Marketplace] Deploy new NFT collection', function () {
  beforeEach(async function () {
    [admin, user1] = await ethers.getSigners();
    const contract = await ethers.getContractFactory('Marketplace');
    marketplace = await contract.deploy();
  });

  it('Should emit NFTCollectionCreated event when user creates a collection', async () => {
    expect(
      await marketplace.deployNewNFTCollection('MyCollection', 'MC')
    ).to.emit('NFTCollectionCreated');
  });

  it('Should have hasCollection = false for a user that has not created a collection.', async () => {
    let user = await marketplace.getUser(user1.address);
    expect(user.hasCollection).to.equal(false);
  });

  it('Should have hasCollection = true for a user that has created a collection.', async () => {
    await marketplace
      .connect(user1)
      .deployNewNFTCollection('MyCollection', 'MC');
    let user = await marketplace.getUser(user1.address);
    expect(user.hasCollection).to.equal(true);
  });

  it("Should revert with 'Name cannot be empty.' when name is empty", async () => {
    await expect(
      marketplace.deployNewNFTCollection('', 'TC')
    ).to.be.revertedWith('Name cannot be empty.');
  });

  it("Should revert with 'Symbol cannot be empty.' when symbol is empty", async () => {
    await expect(
      marketplace.deployNewNFTCollection('TestCollection', '')
    ).to.be.revertedWith('Symbol cannot be empty.');
  });

  it("Should revert with 'You have already created an NFT collection.' when trying to create a second collection", async () => {
    await marketplace.deployNewNFTCollection('FirstCollection', 'FC');
    await expect(
      marketplace.deployNewNFTCollection('SecondCollection', 'SC')
    ).to.be.revertedWith('You have already created an NFT collection.');
  });

  it('Should return correct collection info after creating a new collection', async () => {
    await marketplace
      .connect(user1)
      .deployNewNFTCollection('MyCollection', 'MC');

    const collection = await marketplace.getCollection(user1.address);
    expect(collection.name).to.equal('MyCollection');
    expect(collection.symbol).to.equal('MC');
  });

  it('Should return blank correct collection info for a user that has not created a collection', async () => {
    const collection = await marketplace.getCollection(user1.address);
    expect(collection.name).to.equal('');
    expect(collection.symbol).to.equal('');
  });
});
