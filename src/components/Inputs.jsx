// Inputs.jsx
import React, { useState } from 'react';
import { UilSearch } from '@iconscout/react-unicons';

function Inputs({ setCity, buttonTemp, setButtonTemp }) { // Thêm props buttonTemp và setButtonTemp
  const [input, setInput] = useState('Hanoi'); 
  const [isFocused, setIsFocused] = useState(false); 

  const handleSearch = () => {
    if (input) {
      setCity(input);
    }
  };

  const handleFocus = () => {
    if (input === 'Hanoi' && !isFocused) {
      setInput(''); 
      setIsFocused(true); 
    }
  };

  const handleBlur = () => {
    if (input === '') {
      setInput('Hanoi'); 
      setIsFocused(false); 
    }
  };

  const handleToggle = () => {
    setButtonTemp(prevTemp => prevTemp === 'F' ? 'C' : 'F'); // Chuyển đổi giữa 'F' và 'C'
  };

  return (
    <div className='flex w-full items-center space-x-2 my-1 text-left'>
      <label className='text-gray-700 font-bold'>Your city</label>
      <UilSearch size={20} onClick={handleSearch} className="text-white cursor-pointer text-gray-700 transition ease-out hover:scale-125" />
      <input
        type="text"
        placeholder='city...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className='font-light p-2 w-1/6 shadow-xl focus:outline-none text-sm capitalize placeholder:lowercase rounded-lg'
      />
      <div className="flex items-center">
        <label className='text-gray-700 font-bold mr-2'>{buttonTemp}</label>
        <button onClick={handleToggle} className='p-2 bg-gray-200 rounded-full'>
          {buttonTemp === 'F' ? '°C' : '°F'}
        </button>
      </div>
    </div>
  );
}

export default Inputs;
