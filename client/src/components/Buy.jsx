import React, { useState } from 'react';
import { ethers } from 'ethers';

const Buy = ({ state }) => {
  const [data, setData] = useState(null);
  const buyCoffee = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const value = {value: ethers.parseEther('0.001')};
    const transaction = await contract.byCoffee(
      data.name,
      data.message,
      value
    );
    console.log(transaction)
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
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Message</label>
          <input
            className='form-input'
            type='text'
            placeholder='Enter message'
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
        </div>
        <button className='form-button'>Pay</button>
      </form>
    </div>
  );
};

export default Buy;
