const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GateKeep", function () {
  it("Test", async function () {
    const [owner] = await ethers.getSigners();

    const GateKeep = await ethers.getContractFactory("GateKeep");
    const gatekeeper = await GateKeep.deploy();
    await gatekeeper.deployed();

    const NFT = await ethers.getContractFactory("Nft");
    const nft = await NFT.deploy();
    await nft.deployed();

 

    const setNftAddress = await gatekeeper.setNft("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    await setNftAddress.wait();
    // await console.log(gatekeeper.getNft());
    expect(await gatekeeper.getNft()).to.equal("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    //expect(await gatekeeper.showContentNftOwners()).to.equal("The required NFT is not present");

    const mintToken = await gatekeeper.connect(owner).mintNft();

    // // // wait until the transaction is mined
    //  await mintToken.wait();

    //  expect(await gatekeeper.showContentNftOwners()).to.equal("Content");

    // const transferToken = await gatekeeper.transferNft();
    // await transferToken.wait();
    // expect(await gatekeeper.showContentNftOwners()).to.equal("Content ID owner");
  });
});
