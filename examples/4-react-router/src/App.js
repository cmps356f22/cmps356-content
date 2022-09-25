import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import SingleProduct from './pages/SingleProduct';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import ProductSharedLayout from './pages/ProductSharedLayout';
import ProductEditor from './pages/ProductEditor';
import ProductSearch from './pages/ProductSearch';
import StudentSchedule from './pages/StudentSchedule';
/*
  Example based on:
  https://github.com/john-smilga/react-router-6-tutorial
*/
function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />

        <Route path='/students/:studentId/:semester' element={<StudentSchedule />} />

        <Route path='/products' element={<ProductSharedLayout />}>
          <Route index element={<Products />} />
          <Route path='new' element={<ProductEditor />} />
          <Route path='search' element={<ProductSearch />} />
          <Route path=':productId' element={<SingleProduct />} />
        </Route>

          <Route path='login' element={<Login setUser={setUser}></Login>} />
          <Route
            path='dashboard'
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
