const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const ABI = require("../artifacts/contracts/Belgium.sol/Belgium.json");
require("dotenv").config();


async function main() {
  const networkAddress = "https://ethereum-sepolia-rpc.publicnode.com";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const wallet = new ethers.Wallet(privateKey, provider);
  const signer = wallet.connect(provider);

  const Belgium_NFT = await ethers.getContractFactory("Belgium", signer);
  const nft = Belgium_NFT.attach("0x58752A414F876DF0A5b931Dc6D1f7b2936ea9B19");
  const fxRootAddress = "0x9E688939Cb5d484e401933D850207D6750852053";
  const fxRoot = new ethers.Contract(fxRootAddress, FXRootContractAbi, signer);

  const TokenIdef = [0, 1, 2, 3, 4];
  const approveTx = await nft.setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Transfer Succesfully Approved!");

  for (const tokenId of TokenIdef) {
    const depositTx = await fxRoot.deposit(nft.address, wallet.address, tokenId, "0x6566");
    await depositTx.wait();
  }

  console.log("NFTs Succesfully Transfered");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
