import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext.jsx';

const ProductCard = ({ product, onProductClick, className = '' }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(CartContext);
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${className}`}>
      {/* Enhanced Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
          onClick={() => onProductClick(product)}
        />
        
        {/* Enhanced Overlay Buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-3">
            <button
              onClick={() => onProductClick(product)}
              className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Quick View
            </button>
          </div>
        </div>

        {/* Enhanced Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              NEW
            </span>
          )}
        </div>

        {/* Enhanced Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistToggle();
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            inWishlist
              ? 'bg-red-600 text-white scale-110'
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600'
          }`}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Enhanced Product Info */}
      <div className="p-3">
        <div className="mb-1">
          <h3 
            className="font-semibold text-base text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2"
            onClick={() => onProductClick(product)}
          >
            {product.name}
          </h3>
         
        </div>

       

        {/* Enhanced Price */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-base font-semibold text-indigo-600">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
