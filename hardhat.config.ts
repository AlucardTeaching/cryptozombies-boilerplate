import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// Load environment variables from .env file (optional)
// To use: npm install --save-dev dotenv --legacy-peer-deps
// Then uncomment the line below:
// import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    // Local Hardhat network
    hardhat: {
      chainId: 31337,
    },

    // Uncomment and configure for deployment to testnets/mainnet
    localhost: {
      url: "http://127.0.0.1:8545",
    },

    // sepolia: {
    //   url: process.env.SEPOLIA_RPC_URL || "",
    //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    //   chainId: 11155111,
    // },

    // mainnet: {
    //   url: process.env.MAINNET_RPC_URL || "",
    //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    //   chainId: 1,
    // },
  },

  // Etherscan verification (optional)
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY || "",
  // },

  // Gas reporter (optional)
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
  },
};

export default config;
