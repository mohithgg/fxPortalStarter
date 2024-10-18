const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Belgium.sol/Belgium.json");

const tokenAddress = "0xae30562A567C739a820C9132FBAf4a09620B9cD9";
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xE5c60567E86FCc28502FE2229bCe17E4cA967365"; 

async function main() {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    console.log("You now have: " + await token.balanceOf(walletAddress) + "Belgium tokens");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
