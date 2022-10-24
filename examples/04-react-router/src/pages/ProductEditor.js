import { Link } from 'react-router-dom';
const ProductEditor = () => {
  return (
    <>
      <h3>Add a new Product</h3>
      <br />
      <Link to='/products'>back to products</Link>
  </>
  );
};

export default ProductEditor;