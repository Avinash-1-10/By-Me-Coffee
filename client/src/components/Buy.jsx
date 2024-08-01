import React, { useState } from 'react';
import { ethers } from 'ethers';

const Buy = ({ state, toggleReload }) => {
  const [data, setData] = useState({ name: '', message: '' });

  const buyCoffee = async (event) => {
    event.preventDefault();
    try {
      const { contract } = state;
      const value = { value: ethers.parseEther('0.001') };
      const transaction = await contract.byCoffee(
        data.name,
        data.message,
        value
      );
      
      // Wait for transaction to be mined (optional but recommended)
      await transaction.wait();

      // Reset form data
      setData({ name: '', message: '' });

      // Trigger reload
      toggleReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='buy-container'>
      <form className='buy-form' onSubmit={buyCoffee}>
        <div className='form-group'>
          <label className='form-label'>Name</label>
          <input
            className='form-input'
            type='text'
            placeholder='Enter your name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Message</label>
          <input
            className='form-input'
            type='text'
            placeholder='Enter message'
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
        </div>
        <button className='form-button'>Pay</button>
      </form>
    </div>
  );
};

export default Buy;
