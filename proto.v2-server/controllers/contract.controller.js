const ethers = require('ethers');

const poolFactoryContractAbi =
  require('./../../proto.v2-contract/artifacts/contracts/dynamicpool/factory/DynamicPoolFactory.sol/DynamicPoolFactory.json').abi;

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

const poolFactoryAddress = process.env.POOL_FACTORY_CONTRACT_ADDRESS;

const poolFactoryContract = new ethers.Contract(
  poolFactoryAddress,
  poolFactoryContractAbi,
  ServerWallet
);

module.exports = {
  test: async (req, res) => {
    try {
      const challenge = await poolFactoryContract.createChallenge('test2');
      const receipt = await challenge.wait();

      const idx = await poolFactoryContract.getIndex();
      const address = await poolFactoryContract.getChallenge(idx);
      console.log(address);
      console.log(address[0]);
      console.log(address[1]);

      res.status(200).json({
        message: 'User nickname update',
        userInfo: {},
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
