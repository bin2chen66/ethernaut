const { expect } = require("chai");
var tools = require("./tools");

describe("13GatekeeperTwo", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel(
      "GatekeeperTwo"
    );
    //检查原始
    expect(await levelContract.entrant()).to.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });

  it("attacks", async function () {
    runContract = await tools.deployContract(
      "GatekeeperTwoRun",
      player,
      levelContract.address
    );
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.entrant()).to.equal(player.address);
  });
});
