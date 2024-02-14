require('@nomicfoundation/hardhat-toolbox');
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.20',
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true, // Allow contracts larger than  24KB
    },
  },
};
