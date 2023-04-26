import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useContext } from 'react';
import { Store } from './Store';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column ">
        <header>
          <nav className="navbar bg-dark">
            <div className="d-flex align-items-center ps-3">
              <Link
                to={'/'}
                className="text-light text-decoration-none navbar-brand "
              >
                Amazona
              </Link>
              <Link
                to="/cart"
                className=" text-secondary text-decoration-none navbar-brand "
              >
                Cart
                {cart.cartItems.length > 0 && (
                  <div className="badge bg-danger">{cart.cartItems.length}</div>
                )}
              </Link>
            </div>
          </nav>
        </header>
        <main>
          <div className="container mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
