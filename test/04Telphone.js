const { expect } = require("chai");
var tools = require("./tools");

describe("04Telphone", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("Telephone");
    runContract = await tools.deployContract("TelephoneRun", player);
    //检查原始的owner
    expect(await levelContract.owner()).to.not.equal(player.address);
  });

  it("attacks", async function () {
    await runContract.connect(player).run(levelContract.address);
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.owner()).to.equal(player.address);
  });
});
