const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("11Elevator", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Elevator");
    runContract = await tools.deployContract("ElevatorRun", player);
    //检查原始top
    expect(await levelContract.top()).to.equal(false);
  });

  it("attacks", async function () {
    await runContract.connect(player).run(levelContract.address);
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.top()).to.equal(true);
  });
});
