const { ethers } = require('hardhat');
const { expect, assert } = require('chai');

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

// :::::::::: MARKETPLACE CONTRACT TESTS :::::::::::

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

  it('Should emit NFTCollectionCreated event when user creates a collection with args', async () => {
    const tx = await marketplace.deployNewNFTCollection('MyCollection', 'MC');
    const receipt = await tx.wait();
    const newCollectionAddress = await receipt.to;

    expect(tx)
      .to.emit('NFTCollectionCreated')
      .withArgs(newCollectionAddress, 'MyCollection', 'MC');
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

  it("Should revert with 'Missing name' when name is empty", async () => {
    await expect(
      marketplace.deployNewNFTCollection('', 'TC')
    ).to.be.revertedWith('Missing name');
  });

  it("Should revert with 'Missing symbol' when symbol is empty", async () => {
    await expect(
      marketplace.deployNewNFTCollection('TestCollection', '')
    ).to.be.revertedWith('Missing symbol');
  });

  it("Should revert with 'Collection already created' when trying to create a second collection", async () => {
    await marketplace.deployNewNFTCollection('FirstCollection', 'FC');
    await expect(
      marketplace.deployNewNFTCollection('SecondCollection', 'SC')
    ).to.be.revertedWith('Collection already created');
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

describe('🔵 [Marketplace] GetAllCollections', function () {
  beforeEach(async function () {
    [admin, user1, user2] = await ethers.getSigners();
    const contract = await ethers.getContractFactory('Marketplace');
    marketplace = await contract.deploy();
  });

  it('Should get the correct number of collections created', async () => {
    await marketplace
      .connect(user1)
      .deployNewNFTCollection('Pain au chocolat', 'PC');
    await marketplace
      .connect(user2)
      .deployNewNFTCollection('Chocolatine', 'CT');
    await marketplace.deployNewNFTCollection('Admin collection', 'ADM');

    const collections = await marketplace.getAllCollections();
    expect(collections.length).to.equal(3);
  });

  it('Should have no collections at first', async () => {
    const collections = await marketplace.getAllCollections();
    expect(collections.length).to.equal(0);
  });
});
