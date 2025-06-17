import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, products } from '../data/dummyData.jsx';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategoryProducts = (categoryName) => {
    return products.filter(product => product.category === categoryName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Product Categories</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Explore our wide range of product categories and find exactly what you're looking for
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => {
            const categoryProducts = getCategoryProducts(category.name);
            return (
              <div
                key={category.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-40 transition-opacity`}></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.productCount} products</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h4>
                        <p className="text-gray-600 text-sm">{categoryProducts.length} items available</p>
                      </div>
                      <div className="flex items-center text-indigo-600 group-hover:text-indigo-700">
                        <span className="text-sm font-medium mr-2">Explore</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Preview products */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {categoryProducts.slice(0, 3).map((product) => (
                        <div key={product.id} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Categories */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className="group text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl">
                  {category.name.charAt(0)}
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{category.productCount} items</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center">
            <h3 className="text-3xl font-bold mb-2">{categories.length}</h3>
            <p className="text-blue-100">Categories Available</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl text-center">
            <h3 className="text-3xl font-bold mb-2">{products.length}</h3>
            <p className="text-green-100">Total Products</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl text-center">
            <h3 className="text-3xl font-bold mb-2">24/7</h3>
            <p className="text-purple-100">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
