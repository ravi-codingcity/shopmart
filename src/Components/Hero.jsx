import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner_1 from '../assets/Banner_1.jpg';
import Banner_2 from '../assets/Banner_2.jpg';
import Banner_3 from '../assets/Banner_3.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider banners
  const heroSlides = [
    {
      id: 1,
      image: Banner_1,
      title: 'Summer Fashion Collection',
      subtitle: 'Discover the latest trends in fashion',
      description: 'Up to 50% off on selected items',
      badge: 'New Arrivals',
      buttonText: 'Shop Collection',
      buttonLink: '/products?category=summer'
    },
    {
      id: 2,
      image: Banner_2,
      title: 'Premium Accessories',
      subtitle: 'Complete your perfect look',
      description: 'Luxury accessories for every occasion',
      badge: 'Limited Edition',
      buttonText: 'Explore Now',
      buttonLink: '/products?category=accessories'
    },
    {
      id: 3,
      image: Banner_3,
      title: 'Exclusive Footwear',
      subtitle: 'Step into style and comfort',
      description: 'Premium shoes for every lifestyle',
      badge: 'Best Sellers',
      buttonText: 'Shop Shoes',
      buttonLink: '/products?category=footwear'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
      {/* Full Screen Slider */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 "></div>
            </div>
            
            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300 text-white hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300 text-white hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8 h-3 rounded-full' 
                : 'bg-white/50 hover:bg-white/70 w-3 h-3 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-6 right-6 z-20 hidden lg:block">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">5K+</div>
              <div className="text-xs opacity-80">Products</div>
            </div>
            <div>
              <div className="text-xl font-bold">25K+</div>
              <div className="text-xs opacity-80">Customers</div>
            </div>
            <div>
              <div className="text-xl font-bold">4.8★</div>
              <div className="text-xs opacity-80">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-6 z-20 hidden md:block">
        <div className="flex flex-col items-center text-white/80">
          <span className="text-xs mb-2 transform rotate-90 origin-center">Scroll</span>
          <div className="w-px h-8 bg-white/50"></div>
          <svg className="w-3 h-3 mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
