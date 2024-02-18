require('@nomicfoundation/hardhat-toolbox');
require('solidity-coverage');
require('dotenv/config');

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const ALCHEMY_SEPOLIA_RPC_URL = process.env.ALCHEMY_SEPOLIA_RPC_URL || '';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200, // Adjust the number of runs for the optimizer
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true, // ok because not deployed on mainnet
    },
    sepolia: {
      // allowUnlimitedContractSize: true,
      url: ALCHEMY_SEPOLIA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`], //private key of addr that deployed the contract
      chainId: 11155111,
    },
  },
};
