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
const providerUrl = process.env.INFURA_URL;
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
      console.log('From: ', From);
      console.log('To: ', To);
      console.log('Amount: ', Amount);
      console.log('Result: ', Result);

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
      console.log('From: ', From);
      console.log('To: ', To);
      console.log('Amount: ', Amount);
      console.log('Result: ', Result);

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

//   // 토큰 컨트랙트가 Community 컬렉션에 있는 커뮤니티 주소들과 일치하는지 확인하기 위해 모든 커뮤니티 주소를 가져옴
//   const communityAddresses = await Community.find({}, { address: 1 });

//   // tokenContract가 communityAddresses 배열에 포함된 주소들과 일치하는지 확인하여 필터링
//   const isMatchingContract = communityAddresses.some(
//     (community) => community.address === tokenContract
//   );

//   // 만약 일치하는 커뮤니티 주소가 있을 때만 계정 정보 추가를 수행
//   if (isMatchingContract) {
//     console.log('ERC6551 레지스트리에서 새 트랜잭션 생성:', event);
//     // community_id 가져오기
//     try {
//       const community = await Community.findOne({ address: tokenContract });
//       const communityId = community ? community.id : null;

//       const accountContract = new ethers.Contract(account, accountCreatedABI, provider);

//       let owner = null;
//       try {
//         owner = await accountContract.owner();
//       } catch (error) {
//         console.log('Error occurred while getting owner');
//       }

//       // owner가 존재할 때만 계정 정보 추가
//       if (owner) {
//         const nftContract = new ethers.Contract(
//           tokenContract,
//           nftContractAbi,
//           provider
//         );

//         let tokenURI = null;
//         try {
//           tokenURI = await nftContract.tokenURI(tokenId);
//         } catch (error) {
//           console.log('Error occurred while getting tokenURI');
//         }
//         console.log(`token uri: ${tokenURI}`);
//         console.log(`tokenId:${tokenId}`);

//         // ethBalance 가져오기 (account의 이더 잔액 조회)
//         const balance = await provider.getBalance(account);
//         const ethBalance = ethers.utils.formatEther(balance);

//         // MongoDB에 계정 정보 추가
//         await Tba.create({
//           address: account,
//           owner: owner,
//           level: '',
//           tokenURI: tokenURI,
//           ethBalance: ethBalance,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           community_id: communityId,
//         });

//         console.log('계정 업데이트 완료');
//       }
//     } catch (error) {
//       console.error('DB 업데이트 오류:', error);
//     }
//     console.log('트랜잭션 처리 완료');
//   }
