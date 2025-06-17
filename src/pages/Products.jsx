import React, { useState, useMemo, useContext } from 'react';
import ProductCard from '../Components/ProductCard.jsx';
import ProductView from '../Components/ProductView.jsx';
import { products } from '../Data/DummyData.jsx';
import { CartContext } from '../Context/CartContext.jsx';
import { MdFilterList, MdViewModule, MdViewList, MdClose } from 'react-icons/md';

const Products = () => {
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    color: '',
    brand: '',
    gender: '',
    priceRange: [0, 100000],
    sortBy: 'featured'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const { addToCart, addToWishlist } = useContext(CartContext);

  // Filter options
  const filterOptions = {
    categories: ['T-Shirts', 'Jeans', 'Jackets', 'Shirts', 'Dresses', 'Shoes', 'Accessories'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Grey', 'Brown'],
    brands: ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Uniqlo', 'Levi\'s', 'Tommy Hilfiger'],
    genders: ['Men', 'Women', 'Unisex'],
    sortOptions: [
      { value: 'featured', label: 'Featured' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
      { value: 'newest', label: 'Newest First' },
      { value: 'rating', label: 'Highest Rated' }
    ]
  };

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }
    if (filters.gender) {
      filtered = filtered.filter(product => product.gender === filters.gender);
    }
    
    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      size: '',
      color: '',
      brand: '',
      gender: '',
      priceRange: [0, 100000],
      sortBy: 'featured'
    });
  };

  const activeFiltersCount = Object.values(filters).filter(filter => 
    filter && filter !== 'featured' && !(Array.isArray(filter) && filter[0] === 0 && filter[1] === 100000)
  ).length;

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
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Fashion Collection</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover the latest trends in fashion with our premium clothing collection
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Filter Toggle & Results Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <MdFilterList className="w-5 h-5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <div className="text-gray-600">
              <span className="font-semibold text-gray-900 text-lg">{filteredProducts.length}</span> 
              <span className="ml-1">products found</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <MdViewModule className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <MdViewList className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
              >
                {filterOptions.sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <MdFilterList className="w-5 h-5 mr-2 text-indigo-600" />
                  Filters
                </h3>
                <div className="flex items-center space-x-2">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 px-3 py-1 rounded-full"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-400 hover:text-gray-600"
                  >
                    <MdClose className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {filterOptions.categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={filters.category === category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender Filter */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Gender</h4>
                  <div className="space-y-2">
                    {filterOptions.genders.map(gender => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={filters.gender === gender}
                          onChange={(e) => handleFilterChange('gender', e.target.value)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filterOptions.brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          value={brand}
                          checked={filters.brand === brand}
                          onChange={(e) => handleFilterChange('brand', e.target.checked ? e.target.value : '')}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {filterOptions.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => handleFilterChange('size', filters.size === size ? '' : size)}
                        className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                          filters.size === size
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Color</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {filterOptions.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleFilterChange('color', filters.color === color ? '' : color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          filters.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                        }`}
                        style={{ 
                          backgroundColor: color.toLowerCase(),
                          borderColor: color === 'White' ? '#d1d5db' : (filters.color === color ? '#1f2937' : '#d1d5db')
                        }}
                        title={color}
                      >
                        {color === 'White' && <div className="w-full h-full rounded-full bg-white"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange[0]}
                        onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 100000])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>
                    <div className="text-xs text-gray-600">
                      ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'space-y-6'
                }`}>
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className={`
                      animate-fade-in
                      ${viewMode === 'list' ? 'bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300' : ''}
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {viewMode === 'grid' ? (
                      <div className="transform hover:scale-105 transition-transform duration-300">
                        <ProductCard 
                          product={product} 
                          onProductClick={handleProductClick}
                          className="h-full shadow-lg hover:shadow-xl"
                        />
                      </div>
                    ) : (
                      /* List View */
                      <div className="flex flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-6">
                        <div className="md:w-64 md:h-64 w-full h-48 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => handleProductClick(product)}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 
                              className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
                              onClick={() => handleProductClick(product)}
                            >
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-2xl font-bold text-indigo-600">₹{product.price.toLocaleString()}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="flex items-center">
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
                              </div>
                              <span className="text-sm text-gray-500">• {product.brand}</span>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => addToCart(product)}
                              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => addToWishlist(product)}
                              className="px-4 py-3 border border-gray-300 rounded-lg hover:border-red-300 hover:text-red-600 transition-colors"
                            >
                              ♡
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MdFilterList className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={clearFilters}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductView
        product={selectedProduct}
        isOpen={isProductViewOpen}
        onClose={closeProductView}
      />
    </div>
  );
};

export default Products;
