const { expect } = require("chai");
var tools = require("./tools");

describe("03CoinFlip", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("CoinFlip");
    runContract = await tools.deployContract("CoinFlipRun", player);
    //检查原始的consecutiveWins
    expect(await levelContract.consecutiveWins()).to.equal(0);
  });

  it("attacks", async function () {
    for (let i = 0; i < 10; i++) {
      await runContract.run(levelContract.address);
    }
  });

  it("check", async function () {
    expect(await levelContract.consecutiveWins()).to.equal(10);
  });
});
