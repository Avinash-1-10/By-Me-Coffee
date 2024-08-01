import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractAbi from '../../artifacts/contracts/Coffee.sol/Coffee.json';
import Buy from './components/Buy';
import Memos from './components/Memos';

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [reload, setReload] = useState(false);

  const toggleReload = () => setReload((prev) => !prev);

  const connectWallet = async () => {
    const contractAddress = '0x4414e0Cb6A94FD93CEB5A84608023bC19e867F4A';
    try {
      const { ethereum } = window;
      if (ethereum) {
        await ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          signer
        );
        setState({
          provider,
          signer,
          contract,
        });
        console.log({
          provider,
          signer,
          contract,
        });
      } else {
        console.log('Ethereum object not found, install Metamask.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      <Buy state={state} toggleReload={toggleReload} />
      <Memos state={state} reload={reload} />
    </div>
  );
};

export default App;
