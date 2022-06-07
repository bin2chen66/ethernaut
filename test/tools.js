const { ethers, waffle } = require("hardhat");
module.exports = {
  //通用的初始化关卡方法，返回三个参数：player,levelOwner,levelContract
  initLevel: async function (contractName, ...params) {
    const [player, levelOwner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(contractName, levelOwner);
    const levelContract = await Contract.deploy(...params);
    await levelContract.deployed();
    return [player, levelOwner, levelContract];
  },
  //部署合约，通知用来部署run
  deployContract: async function (contractName, owner, ...params) {
    const Contract = await ethers.getContractFactory(contractName, owner);
    const contract = await Contract.deploy(...params);
    await contract.deployed();
    return contract;
  },
  //得到账号的余额
  getBalance: async function (address) {
    return await waffle.provider.getBalance(address);
  },
};
