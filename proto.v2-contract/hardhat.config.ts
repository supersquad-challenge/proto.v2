import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
        hardfork: "london",
        // base fee of 0 allows use of 0 gas price when testing
        initialBaseFeePerGas: 0,
        // brownie expects calls and transactions to throw on revert
        throwOnTransactionFailures: true,
        throwOnCallFailures: true
   }
  },
};

export default config;
