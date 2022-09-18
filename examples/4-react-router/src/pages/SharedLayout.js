import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StyledNavbar from '../components/StyledNavbar';
const Home = () => {
  return (
    <>
      <StyledNavbar />
      <Outlet />
      <footer></footer>
    </>
  );
};
export default Home;
