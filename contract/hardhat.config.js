require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
};

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const URL = process.env.URL;

module.exports = {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
