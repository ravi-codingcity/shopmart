import React from 'react';
import { dealCards } from '../data/dummyData.jsx';

const DealCards = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Flash Sale - Limited Time Only</h2>
          <p className="text-lg text-gray-600">Get incredible discounts on premium ethnic wear</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealCards.map((deal, index) => (
            <div 
              key={deal.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Product+Image';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {deal.discount}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="px-3 py-2">
                <h3 className="font-bold text-gray-900 mb-1 text-base group-hover:text-indigo-600 transition-colors">
                  {deal.title}
                </h3>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold gradient-text">₹{deal.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through">₹{deal.originalPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">You Save</p>
                    <p className="text-sm font-semibold text-green-600">₹{(deal.originalPrice - deal.price).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Stock Status</span>
                    <span className="text-red-500 font-medium">Only 5 left!</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg border border-indigo-200">
            View All Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealCards;
