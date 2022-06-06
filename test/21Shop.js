const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("21Shop", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Shop");
    runContract = await tools.deployContract("ShopRun", player);

    //检测原始
    expect(await levelContract.isSold()).to.equal(false);
    expect(await levelContract.price()).to.equal(100);
  });

  it("attacks", async function () {
    await runContract.connect(player).run(levelContract.address);
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.isSold()).to.equal(true);
    expect(await levelContract.price()).to.below(100);
  });
});
