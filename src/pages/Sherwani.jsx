import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Components/ProductCard.jsx';
import ProductView from '../Components/ProductView.jsx';
import { products } from '../Data/DummyData.jsx';
import { CartContext } from '../Context/CartContext.jsx';

const Sherwani = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart, addToWishlist } = useContext(CartContext);

  // Filter products for sherwani category
  const sherwaniProducts = products.filter(product => 
    product.category === 'Sherwani' || product.name.toLowerCase().includes('sherwani')
  );

  // Sort products based on selected option
  const sortedProducts = [...sherwaniProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Filter by price range
  const filteredProducts = sortedProducts.filter(product => {
    switch (priceRange) {
      case 'under-10000':
        return product.price < 10000;
      case '10000-20000':
        return product.price >= 10000 && product.price <= 20000;
      case '20000-35000':
        return product.price >= 20000 && product.price <= 35000;
      case 'above-35000':
        return product.price > 35000;
      default:
        return true;
    }
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductViewOpen(true);
  };

  const closeProductView = () => {
    setIsProductViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Royal Sherwani Collection
            </h1>
            <p className="text-lg md:text-xl text-yellow-100 mb-6">
              Discover majestic sherwanis for weddings, festivals & special occasions
            </p>
            <nav className="flex justify-center">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link to="/" className="text-yellow-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-yellow-300">/</li>
                <li>
                  <Link to="/men" className="text-yellow-200 hover:text-white transition-colors">
                    Men
                  </Link>
                </li>
                <li className="text-yellow-300">/</li>
                <li className="text-white font-medium">Sherwani</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredProducts.length} Sherwanis Found
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Price Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="under-10000">Under ₹10,000</option>
                  <option value="10000-20000">₹10,000 - ₹20,000</option>
                  <option value="20000-35000">₹20,000 - ₹35,000</option>
                  <option value="above-35000">Above ₹35,000</option>
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">👑</span>
              </div>
              <h3 className="font-semibold text-gray-900">Wedding</h3>
            </div>
            
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">💎</span>
              </div>
              <h3 className="font-semibold text-gray-900">Designer</h3>
            </div>
            
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">🎭</span>
              </div>
              <h3 className="font-semibold text-gray-900">Traditional</h3>
            </div>
            
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">⭐</span>
              </div>
              <h3 className="font-semibold text-gray-900">Premium</h3>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard 
                    product={product} 
                    onProductClick={handleProductClick}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤵</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No sherwanis found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => {
                  setPriceRange('all');
                  setSortBy('featured');
                }}
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <ProductView
        product={selectedProduct}
        isOpen={isProductViewOpen}
        onClose={closeProductView}
      />
    </div>
  );
};

export default Sherwani;
