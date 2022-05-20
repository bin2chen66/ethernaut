const { expect } = require("chai");
var tools = require("./tools");

describe("08Vault", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner] = await ethers.getSigners();
    //这个值可以从chrome的console中执行来获取（虽然是private）：await web3.eth.getStorageAt(instance,1)+""
    levelContract = await tools.deployContract(
      "Vault",
      levelOwner,
      "0x412076657279207374726f6e67207365637265742070617373776f7264203a29"
    );
    //检查原始的locked值
    expect(await levelContract.locked()).to.equal(true);
  });

  it("attacks", async function () {
    //这个值可以从chrome的console中执行来获取（虽然是private）：await web3.eth.getStorageAt(instance,1)+""
    await levelContract
      .connect(player)
      .unlock(
        "0x412076657279207374726f6e67207365637265742070617373776f7264203a29"
      );
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.locked()).to.equal(false);
  });
});
