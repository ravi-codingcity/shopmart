import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Components/ProductCard.jsx';
import ProductView from '../Components/ProductView.jsx';
import { products } from '../Data/DummyData.jsx';
import { CartContext } from '../Context/CartContext.jsx';

const MenShirts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart, addToWishlist } = useContext(CartContext);

  // Filter products for men's shirts category
  const menShirtProducts = products.filter(product => 
    product.category === 'Men Shirts' || 
    (product.gender === 'Men' && product.name.toLowerCase().includes('shirt'))
  );

  // Sort products based on selected option
  const sortedProducts = [...menShirtProducts].sort((a, b) => {
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
      case 'under-1000':
        return product.price < 1000;
      case '1000-2000':
        return product.price >= 1000 && product.price <= 2000;
      case '2000-3000':
        return product.price >= 2000 && product.price <= 3000;
      case 'above-3000':
        return product.price > 3000;
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Men's Shirt Collection
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Discover elegant shirts for every occasion - formal, casual & party wear
            </p>
            <nav className="flex justify-center">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-blue-300">/</li>
                <li>
                  <Link to="/men" className="text-blue-200 hover:text-white transition-colors">
                    Men
                  </Link>
                </li>
                <li className="text-blue-300">/</li>
                <li className="text-white font-medium">Shirts</li>
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
                  {filteredProducts.length} Men's Shirts Found
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Price Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="under-1000">Under ₹1,000</option>
                  <option value="1000-2000">₹1,000 - ₹2,000</option>
                  <option value="2000-3000">₹2,000 - ₹3,000</option>
                  <option value="above-3000">Above ₹3,000</option>
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Formal Shirts</h3>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-7.938V18a2 2 0 01-2 2H8a2 2 0 01-2-2V6.062" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Casual Shirts</h3>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Party Wear</h3>
            </div>
            
            <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
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
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.901-6.06 2.371M12 9V3m0 6l2-2m-2 2L10 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No shirts found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => {
                  setPriceRange('all');
                  setSortBy('featured');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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

export default MenShirts;
