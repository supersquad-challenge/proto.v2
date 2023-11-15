import { ethers } from "hardhat"
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import DynamicPool from './../artifacts/contracts/dynamicpool/DynamicPool.sol/DynamicPool.json'

describe('DynamicPool', function() {
  async function deploydynamicPoolFactory() {
    const [ deployer, ...users ] = await ethers.getSigners();

    const DynamicPoolFactory = await ethers.getContractFactory("DynamicPoolFactory");
    const factory = await DynamicPoolFactory.connect(deployer).deploy(deployer);

    return {
      factory,
      deployer,
      users
    }
  }

  describe("Receive", function() {
    it("receive function", async function() {
      const { factory, deployer, users } = await loadFixture(deploydynamicPoolFactory);
      
      const challenge = await factory.createChallenge("Test");
      const idx1 = await factory.getIndex();
      const challenge1 = await factory.getChallenge(idx1);

      console.log("challenge1", challenge1)

      const success = new ethers.Contract(
        challenge1[0],
        JSON.stringify(DynamicPool.abi),
        deployer
      )

      const fail = new ethers.Contract(
        challenge1[1],
        JSON.stringify(DynamicPool.abi),
        deployer
      )

      const isSuccess = await success.getForm();
      console.log("successForm", isSuccess);

      const beforeSuccessBalance = await success.getBalance();
      console.log("beforeSuccessBalance", ethers.formatUnits(beforeSuccessBalance, 0));
      expect(parseInt(ethers.formatUnits(beforeSuccessBalance, 0))).to.equal(0);

      const successAddress = await success.getAddress();
      console.log("successAddress", successAddress);


      const txRes1 = await deployer.sendTransaction({
        to: successAddress,
        value: ethers.parseEther("0.00000000001"),
      })

      const AfterSuccessBalance = await success.getBalance();
      console.log("AfterSuccessBalance", parseInt(ethers.formatUnits(AfterSuccessBalance, 0)));
      expect(parseInt(ethers.formatUnits(AfterSuccessBalance, 0))).to.equal(10000000)
      console.log("txRes1", txRes1);

      await expect(txRes1)
        .to.emit(success, "CoinReceived")
        .withArgs('0x0000000000000000000000000000000000000000', 10000000);
    
      console.log("msg data", await success.getMsgData());
    })
  })
})