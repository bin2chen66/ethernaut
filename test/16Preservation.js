const { expect } = require("chai");
var tools = require("./tools");

describe("16Preservation", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    const otherUser = await ethers.getSigners()[9];
    const libraryContract1 = await tools.deployContract(
      "LibraryContract",
      otherUser
    );
    const libraryContract2 = await tools.deployContract(
      "LibraryContract",
      otherUser
    );
    [player, levelOwner, levelContract] = await tools.initLevel(
      "Preservation",
      libraryContract1.address,
      libraryContract2.address
    );
    runContract = await tools.deployContract("PreservationRun", player);

    //检查原始
    expect(await levelContract.owner()).to.not.equal(player.address);
  });

  it("attacks", async function () {
    await runContract
      .connect(player)
      .run(levelContract.address, player.address);
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.owner()).to.equal(player.address);
  });
});
