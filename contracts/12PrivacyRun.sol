// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface ILevel {
    function unlock(bytes16 _key) external;
}

contract PrivacyRun { 
    function run(address _levelAddress,bytes32 _key) external {   
        ILevel(_levelAddress).unlock(bytes16(_key));
    }
}