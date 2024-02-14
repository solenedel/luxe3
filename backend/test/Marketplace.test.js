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

  describe('🔵 Deploy new NFT collection', function () {
    it('Should successfully create a new NFT collection', async () => {
      const tx = await marketplace.deployNewNFTCollection(
        'TestCollection',
        'TC'
      );
      await expect(tx).to.emit(marketplace, 'NFTCollectionCreated');
      const logs = await tx.wait();
      const event = logs.events?.find(
        (e) => e.event === 'NFTCollectionCreated'
      );
      expect(event).to.exist;
      expect(event.args)
        .to.have.property('_name')
        .that.equals('TestCollection');
      expect(event.args).to.have.property('_symbol').that.equals('TC');
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

    // it('Should not let a user create more than one collection', async function () {
    //   await marketplace
    //     .connect(user1.address)
    //     .deployNewNFTCollection("User1's collection", 'U1C');
    //   await expect(
    //     marketplace
    //       .connect(user1.address)
    //       .deployNewNFTCollection("User1's collection 2", 'U1C2')
    //       .to.be.revertedWith('You have already created an NFT collection.')
    //   );
    // });
    // it('Should allow a user to create an NFT collection', async function () {
    //   await expect(
    //     marketplace
    //       .connect(user1.address)
    //       .deployNewNFTCollection("User1's collection", 'U1C')
    //   )
    //     .to.emit('NFTCollectionCreated')
    //     .withArgs("User1's collection", 'U1C');
    // });
  });
});
