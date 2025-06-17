import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';
import ProductView from './ProductView.jsx';
import { products as defaultProducts } from '../Data/DummyData.jsx';

const ProductGrid = ({ 
  title = "Featured Products", 
  subtitle = "", 
  showAll = false, 
  limit = 10,
  products = defaultProducts // Accept products as prop
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  
  const displayProducts = showAll ? products : products.slice(0, limit);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductViewOpen(true);
  };

  const closeProductView = () => {
    setIsProductViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section className="pb-10 pt-7 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          {title && (
            <div className="text-center mb-5">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
             
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayProducts.map((product, index) => (
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
        </div>
      </section>
      
      <ProductView
        product={selectedProduct}
        isOpen={isProductViewOpen}
        onClose={closeProductView}
      />
    </>
  );
};

export default ProductGrid;
