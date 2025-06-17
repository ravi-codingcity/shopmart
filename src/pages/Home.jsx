import React from 'react';
import Hero from '../Components/Hero.jsx';
import CategoryGrid from '../Components/CategoryGrid.jsx';
import ProductGrid from '../Components/ProductGrid.jsx';
import BrandSection from '../Components/BrandSection.jsx';
import PromoBanner from '../Components/PromoBanner.jsx';
import DealCards from '../Components/DealCards.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <CategoryGrid />
      <ProductGrid title="Featured Products" limit={5} />
      <DealCards />
      <BrandSection />
      <PromoBanner />
      <ProductGrid title="Best Selling Products" subtitle="Top-rated products loved by customers" limit={10} />
    </div>
  );
};

export default Home;
