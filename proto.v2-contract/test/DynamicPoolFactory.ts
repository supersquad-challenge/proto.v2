import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import DynamicPool from './../artifacts/contracts/dynamicpool/DynamicPool.sol/DynamicPool.json'

import { expect } from "chai";

describe("DynamicPoolFactory", function() {
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
  describe("Deployment", function() {
    it("deploy", async function() {

      const { factory, deployer } = await loadFixture(deploydynamicPoolFactory);
    
      expect(await factory.getOwner()).to.equal(deployer.address);
      expect(await factory.getIndex()).to.equal(0);
    })
  })

  describe("CreateChallenge", function() {
    it("create challenge", async function() {
      const { factory, deployer } = await loadFixture(deploydynamicPoolFactory);
    
      const idx1 = await factory.getIndex();
      expect(parseInt(ethers.formatUnits(idx1, 0))).to.equal(0);
      
      console.log("Create Challenge-----------", await factory.createChallenge("Test"));

      const idx2 = await factory.getIndex();
      expect(parseInt(ethers.formatUnits(idx2, 0))).to.equal(1);

      const challenges1 = await factory.getChallenge(idx2);
      console.log("Challenge-1-----------", challenges1);

      const newChallenge = await factory.createChallenge("TestTest");
      console.log("newChallenge-----------", newChallenge)

      const idx3 = await factory.getIndex();

      const challenges2 = await factory.getChallenge(idx3);
      console.log("Challenge-2-----------", challenges2);

      await expect(newChallenge)
        .to.emit(factory, "ChallengeCreated")
        .withArgs(challenges2[0], challenges2[1], deployer.address);
    })

    it("child challenges", async function() {
      const { factory, deployer } = await loadFixture(deploydynamicPoolFactory);

      const challenge = await factory.createChallenge("Test");
      const idx1 = await factory.getIndex();
      const challenges1 = await factory.getChallenge(idx1);
      
      const child1 = new ethers.Contract(
        challenges1[0],
        JSON.stringify(DynamicPool.abi),
        deployer
      )
  
      const child2 = new ethers.Contract(
        challenges1[1],
        JSON.stringify(DynamicPool.abi),
        deployer
      )

      console.log("child1-----------", child1);
      console.log("child2-----------", child2);

      const child1Addres = await child1.getAddress();
      console.log("child1: address-----------", child1Addres);
      expect(child1Addres).to.equal(challenges1[0]);

      const child1Owner = await child1.getOwner();
      console.log("child1: owner-----------", child1Owner);
      expect(child1Owner).to.equal(deployer.address);
      
      const child1Name = await child1.getName();
      console.log("child1: name-----------", child1Name);
      expect(child1Name).to.equal("Test");
      
      const child1FactoryAddress = await child1.getFactory();
      console.log("child1: factoryAddress-----------", child1FactoryAddress)
      expect(child1FactoryAddress).to.equal(await factory.getAddress());

      const child1Form = await child1.getForm();
      console.log("child1: form-----------", child1Form);
      expect(child1Form).to.equal(true);

      const child1index = await child1.getIndex();
      console.log("child1: index-----------", parseInt(ethers.formatUnits(child1index, 0)));
      expect(parseInt(ethers.formatUnits(child1index, 0))).to.equal(1);

      console.log("\n\n")

      const child2Addres = await child2.getAddress();
      console.log("child2: address-----------", child2Addres);
      expect(child2Addres).to.equal(challenges1[1]);

      const child2Owner = await child2.getOwner();
      console.log("child2: owner-----------", child2Owner);
      expect(child2Owner).to.equal(deployer.address);
      
      const child2Name = await child2.getName();
      console.log("child2: name-----------", child2Name);
      expect(child2Name).to.equal("Test");
      
      const child2FactoryAddress = await child2.getFactory();
      console.log("child2: factoryAddress-----------", child2FactoryAddress)
      expect(child2FactoryAddress).to.equal(await factory.getAddress());

      const child2Form = await child2.getForm();
      console.log("child2: form-----------", child2Form);
      expect(child2Form).to.equal(false);

      const child2Index = await child2.getIndex();
      console.log("child2: index-----------", parseInt(ethers.formatUnits(child2Index, 0)));
      expect(parseInt(ethers.formatUnits(child2Index, 0))).to.equal(1);
    })
  })
  describe("Authorization", function() {
    it("owner change autorization", async function() {
      const { factory, deployer, users } = await loadFixture(deploydynamicPoolFactory);
      
      const owner1 = await factory.getOwner();
      console.log("owner1", owner1)
      expect(owner1).to.equal(deployer.address);

      expect(await factory.changeOwner(users[0].address))
        .to.emit(factory, "OwnerChanged")
        .withArgs(users[0].address);

      const owner2 = await factory.getOwner();
      console.log("owner2", owner2)
      expect(owner2).to.equal(users[0].address);
    })
  })
})