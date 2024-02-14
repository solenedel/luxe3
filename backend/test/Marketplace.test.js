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
