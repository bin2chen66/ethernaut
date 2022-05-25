const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("12Privacy", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    //从chrome的控制台拿:await web3.eth.getStorageAt(instance,5)   slot=3到5
    let keys = [
      "0x52882e38c4a1f074a9c8af449baa7d280a70ac5dfcbba89a4a68ae09b1a448d8",
      "0x651c34068e6722b8ea6de89c9faf5c9fd9742167075b6cf6aad50e7bf863f1ce",
      "0x1d9da787827b4d4aea38011b26b92fd0928e8cd736a86d8b9c5348f782dbe3a5",
    ];
    [player, levelOwner, levelContract] = await tools.initLevel(
      "Privacy",
      keys
    );
    runContract = await tools.deployContract("PrivacyRun", player);
    //检查原始top
    expect(await levelContract.locked()).to.equal(true);
  });

  it("attacks", async function () {
    await runContract
      .connect(player)
      .run(
        levelContract.address,
        "0x1d9da787827b4d4aea38011b26b92fd0928e8cd736a86d8b9c5348f782dbe3a5"
      );
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.locked()).to.equal(false);
  });
});
