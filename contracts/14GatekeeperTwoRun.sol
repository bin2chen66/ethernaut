// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface ILevel {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperTwoRun { 

    constructor(address _runAddress){
        //gateThree:require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1);        
        uint64 tmp = uint64(bytes8(keccak256(abi.encodePacked(address(this)))));
        //gateThree是把tmp跟gateKey进行异或（两个位相同为0，相异为1）结果为:uint64(0) - 1 （就是0xffffffffffffffff全1）
        //这样gateKey=~tmp位取反即可
        uint64 gateKey = ~tmp;        
        ILevel(_runAddress).enter(bytes8(gateKey));
    }
    
}