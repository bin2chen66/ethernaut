const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("24PuzzleProxy", function () {
  let player, levelOwner, levelContract, runContract;
  const MAX_BALANCE = ethers.utils.parseEther("1");
  const INIT_LEVEL_BALANCE = ethers.utils.parseEther("0.001");
  it("setup", async function () {
    [player, levelOwner] = await ethers.getSigners();
    const puzzleWalletContract = await tools.deployContract(
      "PuzzleWallet",
      levelOwner
    );
    const initData = puzzleWalletContract.interface.encodeFunctionData("init", [
      MAX_BALANCE,
    ]);
    const Contract = await ethers.getContractFactory("PuzzleProxy", levelOwner);
    levelContract = await Contract.deploy(
      levelOwner.address,
      puzzleWalletContract.address,
      initData
    );
    await levelContract.deployed();
    runContract = await tools.deployContract("PuzzleProxyRun", player);
    //检测原始状态
    expect(await levelContract.admin()).to.not.equal(player.address);

    levelContract = await ethers.getContractAt(
      "PuzzleWallet",
      levelContract.address
    );
    await levelContract.connect(levelOwner).addToWhitelist(levelOwner.address);
    //需要先存0.001到关卡合约里
    await levelContract
      .connect(levelOwner)
      .deposit({ value: INIT_LEVEL_BALANCE });

    //检测原始状态
    expect(await levelContract.owner()).to.equal(levelOwner.address);
    expect(await levelContract.whitelisted(player.address)).to.equal(false);
    expect(await tools.getBalance(levelContract.address)).to.equal(
      INIT_LEVEL_BALANCE
    );
  });

  it("attacks", async function () {
    await runContract
      .connect(player)
      .run(levelContract.address, { value: INIT_LEVEL_BALANCE });
  });

  it("check", async function () {
    //检查通过条件
    const proxy = await ethers.getContractAt(
      "PuzzleProxy",
      levelContract.address
    );
    expect(await proxy.admin()).to.equal(player.address);
  });
});
