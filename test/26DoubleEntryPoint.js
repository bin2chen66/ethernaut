const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("26DoubleEntryPoint", function () {
  let player,
    levelOwner,
    runContract,
    fortaContract,
    cryptoVaultContract,
    legacyToken,
    doubleEntryPointToken;
  it("setup", async function () {
    [player, levelOwner] = await ethers.getSigners();

    fortaContract = await tools.deployContract("Forta", levelOwner);
    cryptoVaultContract = await tools.deployContract(
      "CryptoVault",
      levelOwner,
      levelOwner.address
    );
    legacyToken = await tools.deployContract("LegacyToken", levelOwner);
    doubleEntryPointToken = await tools.deployContract(
      "DoubleEntryPoint",
      levelOwner,
      legacyToken.address,
      cryptoVaultContract.address,
      fortaContract.address,
      player.address
    );
    cryptoVaultContract
      .connect(levelOwner)
      .setUnderlying(doubleEntryPointToken.address);
    legacyToken
      .connect(levelOwner)
      .delegateToNewContract(doubleEntryPointToken.address);

    runContract = await tools.deployContract(
      "DoubleEntryPointRun",
      player,
      cryptoVaultContract.address
    );

    //检测原始
    //测试100个成功
    expect(await doubleEntryPointToken.balanceOf(levelOwner.address)).to.equal(
      "0"
    );
    await legacyToken.mint(cryptoVaultContract.address, "100");
    await cryptoVaultContract.sweepToken(legacyToken.address);
    expect(await doubleEntryPointToken.balanceOf(levelOwner.address)).to.equal(
      "100"
    );
  });

  it("attacks", async function () {
    await fortaContract.connect(player).setDetectionBot(runContract.address);
  });

  it("check", async function () {
    //检查通过条件
    let beforeBalance = await doubleEntryPointToken.balanceOf(
      levelOwner.address
    );
    await legacyToken
      .connect(levelOwner)
      .mint(cryptoVaultContract.address, "100");
    await expect(
      cryptoVaultContract.connect(levelOwner).sweepToken(legacyToken.address)
    ).to.be.reverted;
    expect(await doubleEntryPointToken.balanceOf(levelOwner.address)).to.equal(
      beforeBalance
    );
  });
});
