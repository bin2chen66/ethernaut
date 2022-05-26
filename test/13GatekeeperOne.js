const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("13GatekeeperOne", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel(
      "GatekeeperOne"
    );
    runContract = await tools.deployContract("GatekeeperOneRun", player);
    //检查原始
    expect(await levelContract.entrant()).to.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });

  it("attacks", async function () {
    await runContract.connect(player).run(levelContract.address);
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.entrant()).to.equal(player.address);
  });
});
