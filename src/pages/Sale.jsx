import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import ProductView from '../components/ProductView.jsx';
import { products } from '../data/dummyData.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { MdAccessTime, MdLocalOffer, MdFlashOn, MdStar } from 'react-icons/md';

const Sale = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [sortBy, setSortBy] = useState('discount');
  const [category, setCategory] = useState('all');
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 45
  });
  const { addToCart, addToWishlist } = useContext(CartContext);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products on sale (those with originalPrice)
  const saleProducts = products.filter(product => product.originalPrice && product.originalPrice > product.price);

  // Calculate discount percentage
  const getDiscountPercentage = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Sort products
  const sortedProducts = [...saleProducts].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return getDiscountPercentage(b.price, b.originalPrice) - getDiscountPercentage(a.price, a.originalPrice);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Filter by category
  const filteredProducts = category === 'all' 
    ? sortedProducts 
    : sortedProducts.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductViewOpen(true);
  };

  const closeProductView = () => {
    setIsProductViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Hero Section with Countdown */}
      <section className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="animate-pulse absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-30"></div>
          <div className="animate-bounce absolute top-20 right-20 w-16 h-16 bg-white rounded-full opacity-20"></div>
          <div className="animate-pulse absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 rounded-full opacity-40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <MdFlashOn className="w-8 h-8 text-yellow-300 animate-pulse" />
              <span className="bg-yellow-300 text-red-600 px-4 py-1 rounded-full font-bold text-lg">MEGA SALE</span>
              <MdFlashOn className="w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-4 animate-pulse">
              UP TO <span className="text-yellow-300">70% OFF</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-pink-100 mb-8">
              Limited Time Offer • Don't Miss Out!
            </p>

            {/* Countdown Timer */}
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 inline-block mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MdAccessTime className="w-6 h-6 text-yellow-300" />
                <span className="text-lg font-semibold">Sale Ends In:</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-white bg-opacity-30 rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-sm">Days</div>
                </div>
                <div className="bg-white bg-opacity-30 rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-sm">Hours</div>
                </div>
                <div className="bg-white bg-opacity-30 rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-sm">Minutes</div>
                </div>
                <div className="bg-white bg-opacity-30 rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-sm">Seconds</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl">
                Shop Now & Save Big!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Stats */}
      <section className="py-8 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-red-100 p-3 rounded-full">
                <MdLocalOffer className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{saleProducts.length}+</div>
                <div className="text-gray-600">Items on Sale</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <MdStar className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8★</div>
                <div className="text-gray-600">Customer Rating</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <MdFlashOn className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24H</div>
                <div className="text-gray-600">Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-red-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MdLocalOffer className="w-6 h-6 text-red-600 mr-2" />
                  {filteredProducts.length} Hot Deals
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="kurta">Kurta</option>
                  <option value="shirt">Shirts</option>
                  <option value="lehenga">Lehenga</option>
                  <option value="saree">Saree</option>
                  <option value="kurti">Kurti</option>
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
                >
                  <option value="discount">Highest Discount</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Special Offers Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
              <h3 className="text-2xl font-bold mb-2">Flash Sale</h3>
              <p className="text-orange-100 mb-4">Extra 20% off on orders above ₹2999</p>
              <span className="bg-white text-red-600 px-4 py-2 rounded-full font-bold">CODE: FLASH20</span>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full transform -translate-x-12 translate-y-12"></div>
              <h3 className="text-2xl font-bold mb-2">Free Shipping</h3>
              <p className="text-purple-100 mb-4">On all orders above ₹1999</p>
              <span className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold">NO CODE NEEDED</span>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {getDiscountPercentage(product.price, product.originalPrice)}% OFF
                  </div>
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
                <MdLocalOffer className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No sale items found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => {
                  setCategory('all');
                  setSortBy('discount');
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Don't Miss These Amazing Deals!</h2>
          <p className="text-xl text-red-100 mb-8">Limited time offer • While stocks last</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-white text-red-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
              View All Products
            </Link>
            <Link to="/wishlist" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-red-600 transition-colors">
              My Wishlist
            </Link>
          </div>
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

export default Sale;
