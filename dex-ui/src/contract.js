import { ethers } from "ethers";
import DEX_ABI from "./abi/DEX.json";
import TOKEN_ABI from "./abi/Token.json";
import ARB_ABI from "./abi/Arbitrage.json";

export const DEX1 = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
export const DEX2 = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";
export const TOKEN_A = "0xd9145CCE52D386f254917e481eB44e9943F39138";
export const TOKEN_B = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
export const ARB = "0xaE036c65C649172b43ef7156b009c6221B596B8b";

export async function getContracts() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return {
    signer,
    dex1: new ethers.Contract(DEX1, DEX_ABI, signer),
    dex2: new ethers.Contract(DEX2, DEX_ABI, signer),
    tokenA: new ethers.Contract(TOKEN_A, TOKEN_ABI, signer),
    tokenB: new ethers.Contract(TOKEN_B, TOKEN_ABI, signer),
    arb: new ethers.Contract(ARB, ARB_ABI, signer),
  };
}