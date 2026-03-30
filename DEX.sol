// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./LPToken.sol";

contract DEX {

    IERC20 public tokenA;
    IERC20 public tokenB;
    LPToken public lpToken;

    uint public reserveA;
    uint public reserveB;

    uint constant FEE = 3; // 0.3%

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        lpToken = new LPToken();
    }

    function addLiquidity(uint amountA, uint amountB) external {

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        uint liquidity;

        if (lpToken.totalSupply() == 0) {
            liquidity = amountA;
        } else {
            liquidity = (amountA * lpToken.totalSupply()) / reserveA;
        }

        lpToken.mint(msg.sender, liquidity);

        reserveA += amountA;
        reserveB += amountB;
    }

    function removeLiquidity(uint lpAmount) external {

        uint totalSupply = lpToken.totalSupply();

        uint amountA = (lpAmount * reserveA) / totalSupply;
        uint amountB = (lpAmount * reserveB) / totalSupply;

        lpToken.burn(msg.sender, lpAmount);

        reserveA -= amountA;
        reserveB -= amountB;

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public pure returns (uint) {

        uint amountInWithFee = amountIn * 997;
        return (amountInWithFee * reserveOut) / (reserveIn * 1000 + amountInWithFee);
    }

    function swapAforB(uint amountA) external {

        tokenA.transferFrom(msg.sender, address(this), amountA);

        uint amountB = getAmountOut(amountA, reserveA, reserveB);

        reserveA += amountA;
        reserveB -= amountB;

        tokenB.transfer(msg.sender, amountB);
    }

    function swapBforA(uint amountB) external {

        tokenB.transferFrom(msg.sender, address(this), amountB);

        uint amountA = getAmountOut(amountB, reserveB, reserveA);

        reserveB += amountB;
        reserveA -= amountA;

        tokenA.transfer(msg.sender, amountA);
    }

    function spotPrice() external view returns (uint) {
        return (reserveB * 1e18) / reserveA;
    }
}