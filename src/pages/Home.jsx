import React from 'react';
import Hero from '../components/Hero.jsx';
import CategoryGrid from '../components/CategoryGrid.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import BrandSection from '../components/BrandSection.jsx';
import PromoBanner from '../components/PromoBanner.jsx';
import DealCards from '../components/DealCards.jsx';

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
