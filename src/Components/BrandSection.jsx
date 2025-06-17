import React from 'react';

// Import real company logos
import ZaraLogo from '../assets/company_logo/zara.jpg';
import HMLogo from '../assets/company_logo/hm.jpg';
import Burberrylogo from '../assets/company_logo/burberry.jpg';
import GucciLogo from '../assets/company_logo/gucci_logo.jpg';
import louisvuittonlogo from '../assets/company_logo/louis_vuitton.jpg';
import AllenSollyLogo from '../assets/company_logo/allen_solly.jpeg';



const BrandSection = () => {
  // Real brand data with imported logos
  const realBrands = [

    { id: 4, name: 'Zara', logo: ZaraLogo, category: 'Fashion' },
    { id: 5, name: 'H&M', logo: HMLogo, category: 'Fashion' },
    { id: 8, name: 'Burberry', logo: Burberrylogo, category: 'Premium' },
    { id: 10, name: 'Louis Vuitton', logo: louisvuittonlogo, category: 'Luxury' },
    { id: 9, name: 'Gucci', logo: GucciLogo, category: 'Luxury' },
    { id: 11, name: 'Allen Solly', logo: AllenSollyLogo, category: 'Fashion' }

  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by World's Leading Brands</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partnering with global fashion leaders to bring you authentic, premium quality products
          </p>
        </div>
        
        {/* Brand Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Sportswear</span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">Fashion</span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Premium</span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Luxury</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {realBrands.map((brand, index) => (
            <div
              key={brand.id}
              className="group relative bg-white rounded-2xl px-3 py-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-indigo-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl flex items-center justify-center h-20 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                  loading="lazy"
                  onError={(e) => {
                    // Enhanced fallback with brand initials
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="hidden w-full h-full items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-lg"
                  style={{ display: 'none' }}
                >
                  {brand.name.charAt(0)}
                </div>
              </div>
              
              <div className="mt-2 text-center">
                <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors text-sm mb-1">
                  {brand.name}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                  {brand.category}
                </p>
              </div>
              
              {/* Enhanced hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              
              {/* Animated corner decoration */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse"></div>
              
              {/* Subtle border glow effect */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-indigo-400/0 group-hover:ring-indigo-400/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Enhanced statistics section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Global Brands</div>
          </div>
          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Authentic Products</div>
          </div>
          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">50M+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-indigo-600">Authorized Retailer</span> • 
            <span className="font-semibold text-green-600 ml-2">100% Genuine</span> • 
            <span className="font-semibold text-purple-600 ml-2">Worldwide Shipping</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
