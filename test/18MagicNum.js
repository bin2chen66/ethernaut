const { expect } = require("chai");
const { ethers } = require("hardhat");
var tools = require("./tools");

describe("18MagicNumb", function () {
  let player, levelOwner, levelContract, runContract;
  it("setup", async function () {
    [player, levelOwner] = await ethers.getSigners();
    const interface = ["function whatIsTheMeaningOfLife() returns (uint)"];
    //使用：得到这个solc --strict-assembly --optimize contracts/18MagicNumber.yul
    //也可以使用remix在线编译，再复制Bytecode
    const bytecode = "600a80600c6000396000f3fe602a60005260206000f3";
    const Contract = new ethers.ContractFactory(
      interface,
      bytecode,
      levelOwner
    );
    levelContract = await Contract.deploy();
    await levelContract.deployed();

    runContract = await tools.deployContract("MagicNumRun", player);
  });

  it("attacks", async function () {});

  it("check", async function () {
    //检查通过条件
    await runContract.check(levelContract.address, 10);
  });
});
