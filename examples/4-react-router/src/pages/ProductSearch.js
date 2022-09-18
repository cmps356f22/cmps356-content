import { useState } from 'react';
import { Link, useParams, useNavigate, useOutletContext } from 'react-router-dom';
//import products from '../data';
const ProductSearch = () => {
  const products = useOutletContext()
  const [productId, setProductId] = useState()
  const navigate = useNavigate()

  function onProductSelected(productId) {
    if (productId != '0') {
      navigate(`/products/${productId}`)
    }
  }

  return (
    <>
      <label htmlFor="productDD">Product </label>
      <select id="productDD" onChange={(e) => {
                console.dir(e);
                onProductSelected(e.target.value)
              }
          }>
          <option value="0"></option>
          {products.map(product =>
              <option value={product.id}>
                  {product.name}
              </option>
          )}
      </select>
      <br />
      <Link to='/products'>back to products</Link>
  </>
  );
};

export default ProductSearch;
