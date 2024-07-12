import * as hre from "hardhat";

async function main() {
  const CreditScoreContract = await hre.ethers.deployContract("CreditScore");

  await CreditScoreContract._deployed();

  // Pvgeaddress of the deployed contract
  console.log("Credit Score Contract Address:", CreditScoreContract.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});