const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

  const privateKey = process.env.PRIVATE_KEY;

  const networkAddress = "https://ethereum-sepolia-rpc.publicnode.com";
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x58752A414F876DF0A5b931Dc6D1f7b2936ea9B19";

  const Wetton = await ethers.getContractFactory("Belgium", signer);
  const Belgium_contract = await Wetton.attach(contractAddress);

  await Belgium_contract.mint(5);

  console.log("Succesfully 5 NFTs Minted");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
