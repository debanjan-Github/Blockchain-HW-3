// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DEX.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Arbitrage {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function execute(
        address dex1,
        address dex2,
        address tokenA,
        address tokenB,
        uint amount
    ) external {

        DEX d1 = DEX(dex1);
        DEX d2 = DEX(dex2);

        uint price1 = d1.spotPrice();
        uint price2 = d2.spotPrice();

        require(price1 != price2, "No arbitrage");

        IERC20(tokenA).approve(dex1, amount);
        IERC20(tokenA).approve(dex2, amount);
        IERC20(tokenB).approve(dex1, type(uint).max);
        IERC20(tokenB).approve(dex2, type(uint).max);

        uint initial = IERC20(tokenA).balanceOf(address(this));

        if (price1 < price2) {
            d1.swapAforB(amount);
            uint balB = IERC20(tokenB).balanceOf(address(this));
            d2.swapBforA(balB);
        } else {
            d2.swapAforB(amount);
            uint balB = IERC20(tokenB).balanceOf(address(this));
            d1.swapBforA(balB);
        }

        uint finalBalance = IERC20(tokenA).balanceOf(address(this));

        require(finalBalance > initial, "No profit");

        IERC20(tokenA).transfer(owner, finalBalance - initial);
    }
}