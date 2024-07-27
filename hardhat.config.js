require('@nomicfoundation/hardhat-toolbox');
const dotenv = require("dotenv");
dotenv.config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// npx hardhat run --network sepolia scripts/finalDeploy.js
// Address of contract is: 0x4414e0Cb6A94FD93CEB5A84608023bC19e867F4A

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
