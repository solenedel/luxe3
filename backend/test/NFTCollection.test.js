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

// :::::::::: NFT COLLECTION CONTRACT TESTS :::::::::::

describe('🔵 [NFT Collection] Mint NFT', function () {
  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
    const contract = await ethers.getContractFactory('NFTCollection');
    NFTCollection = await contract.deploy('NAME', 'SYMBOL', owner.address);
  });

  it('Should only allow the owner of the collection to mint an NFT', async function () {
    await expect(
      NFTCollection.connect(user1).safeMint(
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
    await NFTCollection.safeMint('ipfs://test1');
    await NFTCollection.safeMint('ipfs://test2');
    expect(await NFTCollection.safeMint('ipfs://test3'))
      .to.emit('MintedNFT')
      .withArgs(NFTCollection.address, owner.address, 'ipfs://test3');
  });

  it('Should set the correct NFT owner when minted', async function () {
    await NFTCollection.safeMint('ipfs://test1');

    const tx = await NFTCollection.getNFTInfo(1);
    const currentOwner = tx[0];
    expect(await currentOwner).to.equal(owner.address);
  });

  it('Should have tokenIdCounter = 0 before any NFTs have been minted', async function () {
    expect(await NFTCollection.getLatestTokenNumber()).to.equal(0);
  });

  it('Should have tokenIdCounter = 1 when one NFT has been minted', async function () {
    await NFTCollection.safeMint('ipfs://test1');
    expect(await NFTCollection.getLatestTokenNumber()).to.equal(1);
  });

  it('Should have tokenIdCounter = 3 when 3 NFTs have been minted', async function () {
    await NFTCollection.safeMint('ipfs://test1');
    await NFTCollection.safeMint('ipfs://test2');
    await NFTCollection.safeMint('ipfs://test3');

    expect(await NFTCollection.getLatestTokenNumber()).to.equal(3);
  });

  it('Should fail when more than 30 tokens are minted per collection.', async function () {
    // Mint  30 tokens
    for (let tokenCounter = 1; tokenCounter <= 30; tokenCounter++) {
      await NFTCollection.safeMint(`URI_${tokenCounter}`);
    }

    // Attempt to mint one more token
    await expect(NFTCollection.safeMint('URI_31')).to.be.revertedWith(
      'Token limit exceeded'
    );
  });
});

describe('🔵 [NFT Collection] addCID', function () {
  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const contract = await ethers.getContractFactory('NFTCollection');
    NFTCollection = await contract.deploy('NAME', 'SYMBOL', owner.address);
    await NFTCollection.safeMint('ipfs://test1');
  });

  it('should not let CID be added to a non-minted NFT', async function () {
    const tx = await NFTCollection.addCID(
      'bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy',
      3
    );
    // console.log('TX =====', tx);
    expect(tx).to.be.revertedWith('Not minted yet');
  });

  it('should emit the correct event when addNFT is not reverted', async function () {
    const tx = await NFTCollection.addCID(
      'bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy',
      1
    );
    expect(tx).not.to.be.reverted;
    expect(tx).to.emit('AddedCIDToNFT');
  });

  it('should add the correct CID to the correct NFT', async function () {
    const tx = await NFTCollection.addCID(
      'bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy',
      1
    );
    const NFT = await NFTCollection.getNFTInfo(1);
    expect(NFT.CID).to.equal(
      'bafyreiafdfccqzoeektnzlw4q4ib4ole2qu2ta2c6xyx4vs3nrys5cbsyy'
    );
  });
});

describe('🔵 [NFT Collection] Transfer NFT ownership', function () {
  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const contract = await ethers.getContractFactory('NFTCollection');
    NFTCollection = await contract.deploy('NAME', 'SYMBOL', owner.address);
    await NFTCollection.safeMint('ipfs://test1');
  });

  it('should let the owner transfer ownership to user1', async function () {
    const tx = await NFTCollection.transferOwnership(
      owner.address,
      user1.address,
      1
    );
    expect(tx)
      .to.emit('NFTOwnershipTransferred')
      .withArgs(owner.address, user1.address, 1);
  });

  it('should only let the owner transfer ownership', async function () {
    await expect(
      NFTCollection.connect(user1).transferOwnership(
        user1.address,
        user2.address,
        1
      )
    ).to.be.revertedWith('Caller is not owner');
  });
});
