const hre = require('hardhat');

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balance);
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
    const timestamp = new Date(Number(memo.timestamp) * 1000).toLocaleString();
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
  // await contract.deployed();

  // console.log(await contract.getAddress());
  console.log(`Address of contract is: ${await contract.getAddress()}`);
  console.log(
    `Contract balance: `,
    await getBalance(await contract.getAddress())
  );
  console.log(`Owner balance: `, await getBalance(owner.address));

  const addresses = [await owner.getAddress(), from1.address];
  console.log(addresses);
  console.log('Before bying coffee');
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther('0.01') };
  await contract.connect(from1).byCoffee('From 1', 'Very Nice Coffee', amount);
  await contract.connect(from2).byCoffee('From 2', 'Very Nice Hardhat', amount);
  await contract
    .connect(from3)
    .byCoffee('From 3', 'Very Nice Solidity', amount);
  console.log('After bying coffee');
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  console.log(await consoleMemos(memos));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
