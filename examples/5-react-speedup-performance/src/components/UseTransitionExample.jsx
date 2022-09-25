import { useState, useTransition } from 'react';
import { searchProducts, ProductsList, randomChars } from './ProductList';

export default function UseTransitionExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    //setProducts(searchProducts(value));
    startTransition(() => {
      setProducts(searchProducts(value));
    }); 
  };

  const handleRandom = () => {
    const value = randomChars();
    setSearchTerm(value);
    setProducts(searchProducts(value));
  };

  return (
    <div>
      <input value={searchTerm} onChange={handleChange} />
      <button onClick={handleRandom}>Random</button>
      {isPending ? <h3>Updating the list...</h3> : ''}
      <div style={{ opacity: isPending ? .5 : 1 }}>
        <ProductsList items={products} />
      </div>
    </div>
  );
}