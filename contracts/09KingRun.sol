// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract KingRun {    

    function run(address _levelAddress) external payable{     
        //transfer会失败，2300gas限制了
        (bool result,) = payable(_levelAddress).call{value:msg.value}("");        
        if(!result) revert("call error");
    }

    //条件二:阻止转账（其实不实现这个方法也是阻止的）
    receive() external payable {
        revert("not receive");
    }
}