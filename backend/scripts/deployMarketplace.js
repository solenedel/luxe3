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
  const tx = await Marketplace.deployNewNFTCollection(
    collectionName,
    collectionSymbol
  );

  //const receipt = await tx.wait(); // Wait for transaction to be mined
  // console.log('event', receipt.logs);

  // Print events emitted by the transaction
  // for (const event of receipt.logs || []) {
  //   console.log(`Event: ${event.log}, Args: ${JSON.stringify(event.args)}`);
  // }

  console.log(
    `New NFT collection "${collectionName}" (${collectionSymbol}) was deployed by .`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
