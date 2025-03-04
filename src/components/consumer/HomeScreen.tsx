
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Header from './Header';
import SearchFilters from './SearchFilters';
import RestaurantCard from './RestaurantCard';
import AnimatedTransition from '../shared/AnimatedTransition';

const HomeScreen: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const restaurants = [
    {
      id: '1',
      name: 'Warong Nasi Lemak',
      image: 'https://images.unsplash.com/photo-1630914054214-df5a1d0a8f12?q=80&w=2574&auto=format&fit=crop',
      cuisine: 'Malaysian',
      rating: 4.7,
      distance: '1.2 km',
      prices: [
        { platform: 'grab', price: 12.90, deliveryFee: 3.00, estimatedTime: '25-30 min' },
        { platform: 'shopee', price: 11.50, deliveryFee: 5.00, estimatedTime: '30-40 min' },
        { platform: 'foodpanda', price: 12.50, deliveryFee: 2.50, estimatedTime: '20-30 min' }
      ]
    },
    {
      id: '2',
      name: 'Sarawak Laksa House',
      image: 'https://images.unsplash.com/photo-1587116892227-a0cd46f090a5?q=80&w=2574&auto=format&fit=crop',
      cuisine: 'Malaysian',
      rating: 4.5,
      distance: '0.8 km',
      prices: [
        { platform: 'grab', price: 15.90, deliveryFee: 2.50, estimatedTime: '15-25 min' },
        { platform: 'foodpanda', price: 16.00, deliveryFee: 2.00, estimatedTime: '20-30 min' }
      ]
    },
    {
      id: '3',
      name: 'Sushi Tei',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2670&auto=format&fit=crop',
      cuisine: 'Japanese',
      rating: 4.8,
      distance: '2.5 km',
      prices: [
        { platform: 'grab', price: 25.90, deliveryFee: 4.00, estimatedTime: '25-35 min' },
        { platform: 'shopee', price: 24.50, deliveryFee: 5.50, originalPrice: 28.50, estimatedTime: '35-45 min' },
        { platform: 'foodpanda', price: 26.50, deliveryFee: 3.50, estimatedTime: '30-40 min' }
      ]
    }
  ];

  // Categories for food - this would typically come from an API
  const categories = [
    { id: '1', name: 'Malaysian', image: 'https://images.unsplash.com/photo-1602743355066-5abd9224dc1a?q=80&w=1974&auto=format&fit=crop' },
    { id: '2', name: 'Japanese', image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=2574&auto=format&fit=crop' },
    { id: '3', name: 'Chinese', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2670&auto=format&fit=crop' },
    { id: '4', name: 'Indian', image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2574&auto=format&fit=crop' },
    { id: '5', name: 'Thai', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670&auto=format&fit=crop' },
  ];

  return (
    <div className="pb-20 flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 px-4 pt-2 pb-6">
        <section className="mb-6">
          <AnimatedTransition direction="up" delay={0.2}>
            <SearchFilters />
          </AnimatedTransition>
        </section>
        
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Categories</h2>
            <button className="flex items-center text-sm text-brand-600 hover:text-brand-700 transition-colors">
              <span>View all</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="flex overflow-x-auto py-2 space-x-3">
            {categories.map((category, index) => (
              <AnimatedTransition key={category.id} delay={0.1 * index} direction="up">
                <div className="flex-shrink-0 w-24 relative group">
                  <div className="w-24 h-24 rounded-xl overflow-hidden mb-1 elevation-hover">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <span className="text-center block text-sm font-medium">{category.name}</span>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Recommended</h2>
            <button className="flex items-center text-sm text-brand-600 hover:text-brand-700 transition-colors">
              <span>View all</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {restaurants.map((restaurant, index) => (
              <AnimatedTransition key={restaurant.id} delay={0.15 * index} direction="up">
                <RestaurantCard {...restaurant} />
              </AnimatedTransition>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
