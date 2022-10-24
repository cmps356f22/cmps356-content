import React, { useDeferredValue, useState } from 'react';
import { Products } from './ProductList';

export default function UseDeferredValueExample() {
  const [value, setValue] = useState('a');
  const deferredValue = useDeferredValue(value);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  
  const isStale = deferredValue !== value;

  return (
    <div>
      {isStale ? '<p>Working on it</p>' : ''}
      <br />
      <input 
        style={{ color: isStale ? 'dimgray' : 'black' }} 
        value={value}
        onChange={handleChange} />
      <Products searchTerm={deferredValue} />
    </div>
  );
}