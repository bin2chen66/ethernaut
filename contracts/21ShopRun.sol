// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface ILevel{
  function isSold() external view returns(bool);
  function buy() external;
}

contract ShopRun {
  
  function run(address _runAddress) external payable {
    ILevel(_runAddress).buy();
  } 

  function price() external view returns (uint) {
    // view不能写storage，但可以调用外部的view
    // 也可以调用gasleft()来达到两次返回不一样的值，但比较麻烦
    return ILevel(msg.sender).isSold() ? 0 : 100;
  } 
  
}