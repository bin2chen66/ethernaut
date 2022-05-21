const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("10Reentrance", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Reentrance");
    let donateAmount = ethers.utils.parseEther("12.3").toString();
    await levelContract.donate(levelOwner.address, { value: donateAmount });
    runContract = await tools.deployContract("ReentranceRun", player);
    //检查原始的余额
    expect(await tools.getBalance(levelContract.address)).to.equal(
      donateAmount
    );
  });

  it("attacks", async function () {
    await runContract.connect(player).run(levelContract.address, {
      value: ethers.utils.parseEther("0.5"),
    });
  });

  it("check", async function () {
    //检查通过条件
    expect(await tools.getBalance(levelContract.address)).to.equal(0);
  });
});
