const hre = require('hardhat');

async function main() {
  const contractFactory = await hre.ethers.getContractFactory('Coffee');
  const contract = await contractFactory.deploy();
  console.log(`Address of contract is: ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
