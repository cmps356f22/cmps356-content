import { Link, useOutletContext } from 'react-router-dom';
const About = () => {
  const [products] = useOutletContext();
  return (
    <section className='section'>
      <h2>About</h2>
      <Link to='/' className='btn'>
        Back Home (Products count {products.length})
      </Link>
    </section>
  );
};
export default About;
