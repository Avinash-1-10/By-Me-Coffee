const hre = require('hardhat');

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}

async function consoleBalances(addresses) {
  counter = 1;
  for (const address of addresses) {
    console.log(`Address ${counter} balance: `, await getBalance(address));
    counter += 1;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = new Date(memo.timestamp * 1000);
    console.log(`From: ${memo.from}`);
    console.log(`Name: ${memo.name}`);
    console.log(`Message: ${memo.message}`);
    console.log(`Timestamp: ${timestamp}`);
    console.log('\n');
  }
}
async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory('Coffee');
  const contract = await contractFactory.deploy();
  await contract.deployed();
 
  console.log(`Address of contract is: ${contract.address}`);
  console.log(`Contract balance: `, await getBalance(contract.address));
  console.log(`Owner balance: `, await getBalance(owner.address));

 const addresses = [owner.addresss, from1.address]
 await consoleBalances(addresses); 

 const amount = {value:hre.ethers.utils.parseEther('0.01')};
 await contract.connect(from1).byCoffee("From 1", "Very Nice Coffee",amount);
 await contract.connect(from2).byCoffee("From 2", "Very Nice Hardhat",amount);
 await contract.connect(from3).byCoffee("From 3", "Very Nice Solidity",amount);
 const memos = await contract.getMemos();
 consoleMemos(memos); 
 await consoleBalances(addresses);
 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
