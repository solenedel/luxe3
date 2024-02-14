const hre = require('hardhat');

async function main() {
  const Marketplace = await hre.ethers.deployContract('Marketplace');
  await Marketplace.waitForDeployment();

  console.log(`Marketplace contract was deployed to: ${Marketplace.target}`);

  const [admin] = await hre.ethers.getSigners();
  const adminAddr = admin.address;

  // deploy Admin's collection
  const collectionName = 'Admin Collection';
  const collectionSymbol = 'ADMIN';
  await Marketplace.deployNewNFTCollection(collectionName, collectionSymbol);

  console.log(
    `New NFT collection "${collectionName}" (${collectionSymbol}) was deployed by ${adminAddr}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
