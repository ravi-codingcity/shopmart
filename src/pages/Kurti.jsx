import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Components/ProductCard.jsx';
import ProductView from '../Components/ProductView.jsx';
import { products } from '../Data/DummyData.jsx';
import { CartContext } from '../Context/CartContext.jsx';

const Kurti = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart, addToWishlist } = useContext(CartContext);

  // Filter products for kurti category
  const kurtiProducts = products.filter(product => 
    product.category === 'Kurti' || product.name.toLowerCase().includes('kurti')
  );

  // Sort products based on selected option
  const sortedProducts = [...kurtiProducts].sort((a, b) => {
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
      case 'under-1500':
        return product.price < 1500;
      case '1500-3000':
        return product.price >= 1500 && product.price <= 3000;
      case '3000-5000':
        return product.price >= 3000 && product.price <= 5000;
      case 'above-5000':
        return product.price > 5000;
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
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Stylish Kurti Collection
            </h1>
            <p className="text-lg md:text-xl text-teal-100 mb-6">
              Discover trendy kurtis for everyday wear - casual, formal & ethnic styles
            </p>
            <nav className="flex justify-center">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link to="/" className="text-teal-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-teal-300">/</li>
                <li>
                  <Link to="/women" className="text-teal-200 hover:text-white transition-colors">
                    Women
                  </Link>
                </li>
                <li className="text-teal-300">/</li>
                <li className="text-white font-medium">Kurti</li>
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
                  {filteredProducts.length} Kurtis Found
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Price Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="under-1500">Under ₹1,500</option>
                  <option value="1500-3000">₹1,500 - ₹3,000</option>
                  <option value="3000-5000">₹3,000 - ₹5,000</option>
                  <option value="above-5000">Above ₹5,000</option>
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
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
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">👗</span>
              </div>
              <h3 className="font-semibold text-gray-900">Casual Kurti</h3>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">💼</span>
              </div>
              <h3 className="font-semibold text-gray-900">Formal Kurti</h3>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900">Printed Kurti</h3>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <h3 className="font-semibold text-gray-900">Ethnic Kurti</h3>
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
                <span className="text-4xl">👗</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No kurtis found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => {
                  setPriceRange('all');
                  setSortBy('featured');
                }}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
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

export default Kurti;
