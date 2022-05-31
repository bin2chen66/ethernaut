// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "hardhat/console.sol";

interface ILevel{
  function whatIsTheMeaningOfLife() external returns(uint);
}

contract MagicNumRun {
  
  function check(address _runAddress,uint codeszie) external payable {
    require(ILevel(_runAddress).whatIsTheMeaningOfLife() == 42, "not equal 42");

    uint256 size;
    assembly {
      size := extcodesize(_runAddress)
    }
    
    require(size <= codeszie,"bigger codeszie ");
  }  

}