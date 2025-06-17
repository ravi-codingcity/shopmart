import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import ProductView from '../components/ProductView.jsx';
import { products } from '../data/dummyData.jsx';
import { CartContext } from '../context/CartContext.jsx';

const MenKurta = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart, addToWishlist } = useContext(CartContext);

  // Filter products for men's kurta category
  const menKurtaProducts = products.filter(product => 
    product.category === 'Men Kurta' || 
    (product.gender === 'Men' && product.name.toLowerCase().includes('kurta'))
  );

  // Sort products based on selected option
  const sortedProducts = [...menKurtaProducts].sort((a, b) => {
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
      case 'under-2000':
        return product.price < 2000;
      case '2000-4000':
        return product.price >= 2000 && product.price <= 4000;
      case '4000-6000':
        return product.price >= 4000 && product.price <= 6000;
      case 'above-6000':
        return product.price > 6000;
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
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Men's Kurta Collection
            </h1>
            <p className="text-lg md:text-xl text-amber-100 mb-6">
              Discover elegant kurtas for every occasion - traditional, festive & casual wear
            </p>
            <nav className="flex justify-center">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link to="/" className="text-amber-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-amber-300">/</li>
                <li>
                  <Link to="/men" className="text-amber-200 hover:text-white transition-colors">
                    Men
                  </Link>
                </li>
                <li className="text-amber-300">/</li>
                <li className="text-white font-medium">Kurta</li>
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
                  {filteredProducts.length} Men's Kurtas Found
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Price Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="under-2000">Under ₹2,000</option>
                  <option value="2000-4000">₹2,000 - ₹4,000</option>
                  <option value="4000-6000">₹4,000 - ₹6,000</option>
                  <option value="above-6000">Above ₹6,000</option>
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
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
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">🕉️</span>
              </div>
              <h3 className="font-semibold text-gray-900">Traditional</h3>
            </div>
            
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">🎉</span>
              </div>
              <h3 className="font-semibold text-gray-900">Festive</h3>
            </div>
            
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">👔</span>
              </div>
              <h3 className="font-semibold text-gray-900">Casual</h3>
            </div>
            
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <h3 className="font-semibold text-gray-900">Designer</h3>
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
                <span className="text-4xl">👘</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No kurtas found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => {
                  setPriceRange('all');
                  setSortBy('featured');
                }}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
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

export default MenKurta;
