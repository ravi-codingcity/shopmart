import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartContext } from './Context/CartContext.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import Categories from './Pages/Categories.jsx';
import Wishlist from './Pages/Wishlist.jsx';
import Cart from './Pages/Cart.jsx';
import Lehenga from './Pages/Lehenga.jsx';
import MenShirts from './Pages/MenShirts.jsx';
import Saree from './Pages/Saree.jsx';
import Kurti from './Pages/Kurti.jsx';
import MenKurta from './Pages/MenKurta.jsx';
import Sherwani from './Pages/Sherwani.jsx';
import Sale from './Pages/Sale.jsx';

function App() {
  return (
    <CartContext>
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
    </CartContext>
  );
}

export default App;
