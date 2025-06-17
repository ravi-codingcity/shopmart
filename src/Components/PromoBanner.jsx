import React from 'react';
import PromoImage from '../assets/promo_code.jpg'; // You'll need to save the provided image as this filename

const PromoBanner = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={PromoImage}
            alt="Special Offer - Extra 12% Off"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
