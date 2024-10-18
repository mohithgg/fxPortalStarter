const hre = require("hardhat");

async function main() {
  const Belgium_contract = await hre.ethers.deployContract("Belgium");
  console.log("Address of my contract", Belgium_contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
