import { Outlet, Link } from 'react-router-dom';
import products from '../data';
const ProductSharedLayout = () => {
  return (
    <>
    <h2>Products</h2>
    <nav className='navbar'>
      <Link to="/products">Products List</Link>
      <Link to="/products/search">Search Products</Link>
      <Link to="/products/new">New Product</Link>
    </nav>
    <Outlet context={products}/>
    </>
  );
};
export default ProductSharedLayout;
