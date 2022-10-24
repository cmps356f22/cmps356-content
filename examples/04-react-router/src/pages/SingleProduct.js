import { Link, useOutletContext, useParams } from 'react-router-dom';
import About from './About';
//import products from '../data';
const SingleProduct = () => {
  const [products] = useOutletContext();
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);
  const { image, name } = product;
  return (
    <section className='section product'> <br></br>
      <img src={image} alt={name} />
      <h5>{name}</h5>
      <Link to='/products'>back to products</Link>

      <About />
    </section>
  );
};

export default SingleProduct;
