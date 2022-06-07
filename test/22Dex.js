const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("22Dex", function () {
  let player, levelOwner, levelContract, runContract;
  let token1, token2;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Dex");

    token1 = await tools.deployContract(
      "SwappableToken",
      levelOwner,
      levelContract.address,
      "Token1",
      "T1",
      10000
    );
    token2 = await tools.deployContract(
      "SwappableToken",
      levelOwner,
      levelContract.address,
      "Token2",
      "T2",
      10000
    );

    await levelContract
      .connect(levelOwner)
      .setTokens(token1.address, token2.address);
    await token1.connect(levelOwner).transfer(levelContract.address, 100);
    await token2.connect(levelOwner).transfer(levelContract.address, 100);

    runContract = await tools.deployContract("DexRun", player);
    await token1.connect(levelOwner).transfer(player.address, 10);
    await token2.connect(levelOwner).transfer(player.address, 10);

    //检测原始
    expect(await levelContract.token1()).to.equal(token1.address);
    expect(await levelContract.token2()).to.equal(token2.address);

    expect(await token1.balanceOf(levelContract.address)).to.equal(100);
    expect(await token2.balanceOf(levelContract.address)).to.equal(100);

    expect(await token1.balanceOf(player.address)).to.equal(10);
    expect(await token2.balanceOf(player.address)).to.equal(10);
  });

  it("attacks", async function () {
    await token1.connect(player).transfer(runContract.address, 10);
    await token2.connect(player).transfer(runContract.address, 10);
    await runContract
      .connect(player)
      .run(levelContract.address, token1.address, token2.address);
  });

  it("check", async function () {
    //检查通过条件
    let levelToken1Balance = await token1.balanceOf(levelContract.address);
    let levelToken2Balance = await token2.balanceOf(levelContract.address);
    expect(levelToken1Balance == 0 || levelToken2Balance == 0).to.equal(true);
  });
});
