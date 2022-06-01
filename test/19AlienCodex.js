const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("19AlienCodex", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("AlienCodex");
    runContract = await tools.deployContract("AlienCodexRun", player);
    //检测原始
    expect(await levelContract.owner()).to.not.equal(player.address);
  });

  it("attacks", async function () {
    await runContract
      .connect(player)
      .run(levelContract.address, player.address);
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.owner()).to.equal(player.address);
  });
});
