# Blockchain-HW-3
Blockchain-HW-3


1.  Which address(es) should be allowed to mint/burn the LP tokens?
Ans: Only the DEX contract should be allowed to mint and burn LP tokens.
  When liquidity is added → DEX mints LP tokens
  When liquidity is removed → DEX burns LP tokens

2. In what way do DEXs level the playing ground between a powerful and resourceful trader(HFT/institutional investor) and a lower resource trader (retail investors, like you and me!)?
Ans: DEXs remove intermediaries and provide:
  Permissionless access → anyone can trade
  Transparent pricing → based on on-chain reserves
  No order book advantage → AMM model removes need for high-speed infrastructure
  Unlike centralized exchanges:
  No privileged access to order flow
  No need for expensive infrastructure (HFT servers
  
  Retail users can participate equally using the same smart contract.

3. Suppose there are many transaction requests to the DEX sitting in a miner’s mempool.  Howcan  the  miner  take  undue  advantage  of  this  information?   Is  it  possible  to  make  the  DEXrobust against it?
Ans: Miners (or validators) can exploit mempool visibility:

  Attack: Front-running / Sandwich attack
  See a large trade in mempool
  Insert their own trade before and after it
  Profit from price movement

  Can DEX be made robust?
    Partially, but not fully
    
  Mitigation techniques:
    Slippage limits (users set min output)
    Private transactions (Flashbots)
    Batch auctions (reduce ordering advantage)
    Commit-reveal schemes

4. We have left out a very important dimension on the feasibility of this smart contract- thegas fees!  Every function call needs gas.  How does gas fees influence economic viability of theentire DEX and arbitrage?
Ans: Gas fees directly affect profitability:
  For swaps:
  Small trades become uneconomical

  For arbitrage:
  Profit must exceed:
  Profit > Gas Cost + Fees
  
  If gas is high:
  Many arbitrage opportunities become non-viable
  
  This is why real arbitrage bots optimize gas heavily.

5. Could gas fees lead to undue advantages to some transactors over others?  How?
Ans: Yes
  Users who can:
  Pay higher gas fees
  Use faster infrastructure
  can:
  Get transactions included earlier
  Win arbitrage opportunities 

6. What are the various ways to minimize slippage (as defined in 4.2) in a swap?
Ans: Slippage occurs due to AMM price movement during trade.
  Ways to reduce it:
  Trade smaller amounts
  Use pools with high liquidity
  Set slippage tolerance
  Split large trades into smaller ones
  Use aggregators (best price routing)

7. Having  defined  what  slippage,  plot  how  slippage  varies  with  the  “trade  lot  fraction”  for  aconstant product AMM. Trade lot fraction is the ratio of the amount of token X deposited ina swap, to the amount of X in the reserves just before the swap.
Ans: 
  Trade lot fraction:
  f=Δx/x
​
  Slippage=Expected Price−Actual Price / Expected Price
  	​
  Behavior:
  Small trades → very low slippage
  Large trades → high slippage
  Slippage increases non-linearly
