require('dotenv').config();

const { ethers } = require('ethers');
const mongoose = require('mongoose');

const Challenge = require('./models/challenge.model');

// 컨트랙트의 ABI (함수 인터페이스)
const poolFactoryContractAbi =
  require('./../proto.v2-contract/artifacts/contracts/dynamicpool/factory/DynamicPoolFactory.sol/DynamicPoolFactory.json').abi;

const dynamicPoolContractAbi =
  require('./../proto.v2-contract/artifacts/contracts/dynamicpool/DynamicPool.sol/DynamicPool.json').abi;

// Ethereum JSON-RPC 프로바이더 생성
// const providerUrl = process.env.INFURA_URL;
const providerUrl = process.env.KLAYTN_URL;
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
  })
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('Unable to connect to MongoDB.', err));

// 컨트랙트 및 이벤트 구독
(async () => {
  // Challenge 모델에서 모든 문서를 가져옴
  const challenges = await Challenge.find({});

  // 각 Challenge 문서의 successPoolAddress와 failPoolAddress를 배열에 저장
  const successPoolAddresses = challenges.map(
    (challenge) => challenge.successPoolAddress
  );
  const successPoolContracts = successPoolAddresses.map(
    (address) => new ethers.Contract(address, dynamicPoolContractAbi, provider)
  );

  const failPoolAddresses = challenges.map((challenge) => challenge.failPoolAddress);
  const failPoolContracts = failPoolAddresses.map(
    (address) => new ethers.Contract(address, dynamicPoolContractAbi, provider)
  );

  const successPoolEventFilters = successPoolContracts.map((contract) =>
    contract.filters.Transfered()
  );
  const failPoolEventFilters = failPoolContracts.map((contract) =>
    contract.filters.Transfered()
  );

  successPoolContracts.forEach((contract, index) => {
    contract.on(successPoolEventFilters[index], async (From, To, Amount, Result) => {
      const successPoolBalance = await provider.getBalance(From);
      const successPoolBalanceInEther = ethers.utils.formatEther(successPoolBalance);

      const failPoolBalance = await provider.getBalance(To);
      const failPoolBalanceInEther = ethers.utils.formatEther(failPoolBalance);

      const updatedChallengeSuccess = await Challenge.findOneAndUpdate(
        { successPoolAddress: From },
        { $set: { cryptoSuccessPool: successPoolBalanceInEther } },
        { new: true }
      );
      console.log('updatedChallengeSuccess: ', updatedChallengeSuccess.cryptoSuccessPool);

      const challengeFail = await Challenge.findOne({ failPoolAddress: To });

      if (challengeFail) {
        const updatedChallengeFail = await Challenge.findOneAndUpdate(
          { failPoolAddress: To },
          { $set: { cryptoFailPool: failPoolBalanceInEther } },
          { new: true }
        );
        console.log('updatedChallengeFail: ', updatedChallengeFail.cryptoFailPool);
      } else {
        console.log('To user', ethers.utils.formatEther(Amount));
      }
    });
  });

  failPoolContracts.forEach((contract, index) => {
    contract.on(failPoolEventFilters[index], async (From, To, Amount, Result) => {
      const failPoolBalance = await provider.getBalance(From);
      const failPoolBalanceInEther = ethers.utils.formatEther(failPoolBalance);

      const updatedChallengeFail = await Challenge.findOneAndUpdate(
        { failPoolAddress: To },
        { $set: { cryptoFailPool: failPoolBalanceInEther } },
        { new: true }
      );
      console.log('updatedChallengeFail: ', updatedChallengeFail.cryptoFailPool);
    });
  });
})();
