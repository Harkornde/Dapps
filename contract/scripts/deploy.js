const hre = require("hardhat");

async function main() {
  const namings = await hre.ethers.deployContract("Namings");

  await namings.waitForDeployment();

  console.log(`deployed to ${namings.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0x5DA65fA47AbdB0fCA8f8616E343732698C2c146C