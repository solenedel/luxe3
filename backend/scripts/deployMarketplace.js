const hre = require('hardhat');

async function main() {
  // TODO add a signer
  const Marketplace = await hre.ethers.deployContract('Marketplace');

  await Marketplace.waitForDeployment();

  console.log(`Marketplace contract was deployed to: ${Marketplace.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
