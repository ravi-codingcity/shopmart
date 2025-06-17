import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Categories from './pages/Categories.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Cart from './pages/Cart.jsx';
import Lehenga from './pages/Lehenga.jsx';
import MenShirts from './pages/MenShirts.jsx';
import Saree from './pages/Saree.jsx';
import Kurti from './pages/Kurti.jsx';
import MenKurta from './pages/MenKurta.jsx';
import Sherwani from './pages/Sherwani.jsx';
import Sale from './pages/Sale.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/women/lehenga" element={<Lehenga />} />
              <Route path="/men/shirts" element={<MenShirts />} />
              <Route path="/women/saree" element={<Saree />} />
              <Route path="/women/kurti" element={<Kurti />} />
              <Route path="/men/kurta" element={<MenKurta />} />
              <Route path="/men/sherwani" element={<Sherwani />} />
              <Route path="/sale" element={<Sale />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
