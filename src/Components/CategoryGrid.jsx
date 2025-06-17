import React from 'react';
import { Link } from 'react-router-dom';

// Import images from assets folder
import MenKurtaImg from '../assets/men/men_kurta_1.jpg';
import LehengaImg from '../assets/women/lehenga_1.jpg';
import MenShirtsImg from '../assets/men_shirts/shirt_1.jpg';
import SareeImg from '../assets/women_saree/saree_2.jpg';
import BridalImg from '../assets/women/lehnga_3.jpg';

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: 'Men Kurta',
      image: MenKurtaImg,
      path: '/products?category=men-kurta'
    },
    {
      id: 2,
      name: 'Lehenga',
      image: LehengaImg,
      path: '/products?category=lehenga'
    },
    {
      id: 3,
      name: 'Men Shirts',
      image: MenShirtsImg,
      path: '/products?category=men-shirts'
    },
    {
      id: 4,
      name: 'Saree',
      image: SareeImg,
      path: '/products?category=saree'
    },
    {
      id: 5,
      name: 'Bridal',
      image: BridalImg,
      path: '/products?category=bridal'
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Shop Our Top Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-2xl  h-68 flex flex-col justify-between  transition-shadow ">
                <div className="flex-1 mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full  object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
