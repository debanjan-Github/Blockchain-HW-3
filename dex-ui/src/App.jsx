import { useState } from "react";
import { getContracts } from "./contract";

export default function App() {

  const [account, setAccount] = useState("");
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [resA, setResA] = useState("0");
  const [resB, setResB] = useState("0");
  const [price, setPrice] = useState("0");

  // Connect wallet
 async function connect() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const acc = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  setAccount(acc[0]);
  loadData();
}

  // Load reserves
  async function loadData() {
    const { dex1 } = await getContracts();

    const rA = await dex1.reserveA();
    const rB = await dex1.reserveB();
    const p = await dex1.spotPrice();

    setResA(rA.toString());
    setResB(rB.toString());
    setPrice(p.toString());
  }

  // Add Liquidity
  async function addLiquidity() {
    const { dex1, tokenA, tokenB } = await getContracts();

    const amtA = BigInt(amountA * 1e18);
    const amtB = BigInt(amountB * 1e18);

    await tokenA.approve(dex1.target, amtA);
    await tokenB.approve(dex1.target, amtB);

    const tx = await dex1.addLiquidity(amtA, amtB);
    await tx.wait();

    alert("Liquidity Added!");
    loadData();
  }

  // Swap A → B
  async function swapAtoB() {
    const { dex1, tokenA } = await getContracts();

    const amt = BigInt(amountA * 1e18);

    await tokenA.approve(dex1.target, amt);

    const tx = await dex1.swapAforB(amt);
    await tx.wait();

    alert("Swapped!");
    loadData();
  }

  // Arbitrage
  async function runArb() {
    const { arb } = await getContracts();

    const tx = await arb.execute(
      "DEX1_ADDRESS",
      "DEX2_ADDRESS",
      "TOKEN_A",
      "TOKEN_B",
      BigInt(1e18)
    );

    await tx.wait();

    alert("Arbitrage done!");
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>Test DEX UI Debanjan Basu</h1>

      <button onClick={connect}>Connect Wallet</button>
      <p>{account}</p>

      <hr />

      <h2>Add Liquidity</h2>
      <input placeholder="TokenA" onChange={e => setAmountA(e.target.value)} />
      <input placeholder="TokenB" onChange={e => setAmountB(e.target.value)} />
      <button onClick={addLiquidity}>Add</button>

      <hr />

      <h2>Swap A → B</h2>
      <input placeholder="Amount" onChange={e => setAmountA(e.target.value)} />
      <button onClick={swapAtoB}>Swap</button>

      <hr />

      <h2>Pool Info</h2>
      <p>Reserve A: {resA}</p>
      <p>Reserve B: {resB}</p>
      <p>Price: {price}</p>

      <hr />

      <h2>Arbitrage</h2>
      <button onClick={runArb}>Run Arbitrage</button>

    </div>
  );
}