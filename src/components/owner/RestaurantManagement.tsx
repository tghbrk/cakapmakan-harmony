
import React, { useState } from 'react';
import { Check, X, Edit2, Plus, MoreHorizontal, Search } from 'lucide-react';
import AnimatedTransition from '../shared/AnimatedTransition';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  platforms: ('grab' | 'shopee' | 'foodpanda')[];
  active: boolean;
}

const RestaurantManagement: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('menu');

  // Mock menu items data
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Nasi Lemak Special',
      price: 11.90,
      description: 'Coconut rice with sambal, fried chicken, egg, and condiments',
      image: 'https://images.unsplash.com/photo-1606503036653-8c718f01e499?q=80&w=1974&auto=format&fit=crop',
      platforms: ['grab', 'shopee', 'foodpanda'],
      active: true
    },
    {
      id: '2',
      name: 'Roti Canai Set',
      price: 8.50,
      description: 'Flaky flatbread served with curry and dhal',
      image: 'https://images.unsplash.com/photo-1626694733662-9237272ee72b?q=80&w=2574&auto=format&fit=crop',
      platforms: ['grab', 'foodpanda'],
      active: true
    },
    {
      id: '3',
      name: 'Satay Combo (10pcs)',
      price: 15.90,
      description: 'Grilled meat skewers with peanut sauce and ketupat',
      image: 'https://images.unsplash.com/photo-1616501268066-720dd261c99f?q=80&w=2670&auto=format&fit=crop',
      platforms: ['grab', 'shopee', 'foodpanda'],
      active: true
    },
    {
      id: '4',
      name: 'Mee Goreng',
      price: 9.50,
      description: 'Spicy fried noodles with vegetables and protein',
      image: 'https://images.unsplash.com/photo-1645696301019-35adcc18fc22?q=80&w=2574&auto=format&fit=crop',
      platforms: ['shopee', 'foodpanda'],
      active: false
    }
  ];

  const filteredItems = menuItems.filter(item => {
    // Filter by search term
    const matchesSearch = item.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchValue.toLowerCase());
    
    // Filter by platform
    const matchesPlatform = filterPlatform ? item.platforms.includes(filterPlatform as any) : true;
    
    return matchesSearch && matchesPlatform;
  });

  // Get platform color
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'grab': return 'bg-grabGreen text-white';
      case 'shopee': return 'bg-shopeeOrange text-white';
      case 'foodpanda': return 'bg-foodpandaPink text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="pb-20 px-4 pt-4">
      <AnimatedTransition direction="down" delay={0.1}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Restaurant Management</h1>
          <button className="flex items-center bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-full text-sm transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </button>
        </div>
      </AnimatedTransition>

      <AnimatedTransition delay={0.2} direction="up">
        <div className="glassmorphism rounded-xl mb-6">
          <div className="flex overflow-x-auto">
            {['menu', 'promotions', 'settings'].map((tab) => (
              <button
                key={tab}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
                  activeTab === tab 
                    ? "border-brand-500 text-brand-600" 
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200"
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </AnimatedTransition>

      <AnimatedTransition delay={0.3} direction="up">
        <div className="mb-6">
          <div className="glassmorphism rounded-lg mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search menu items..."
                className="w-full h-12 pl-10 pr-10 rounded-lg bg-transparent border-none focus:ring-2 focus:ring-brand-500 transition-all duration-200"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="flex overflow-x-auto py-2 space-x-2 mb-4">
            <button
              onClick={() => setFilterPlatform(null)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200",
                !filterPlatform ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"
              )}
            >
              All Platforms
            </button>
            {['grab', 'shopee', 'foodpanda'].map(platform => (
              <button
                key={platform}
                onClick={() => setFilterPlatform(platform)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200",
                  filterPlatform === platform 
                    ? getPlatformColor(platform) 
                    : "bg-gray-100 text-gray-700"
                )}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </AnimatedTransition>

      <div className="grid grid-cols-1 gap-4">
        {filteredItems.map((item, index) => (
          <AnimatedTransition key={item.id} delay={0.1 * index} direction="up">
            <div className={cn(
              "glassmorphism rounded-xl overflow-hidden transition-all duration-300 elevation-hover",
              !item.active && "opacity-60"
            )}>
              <div className="flex">
                <div className="w-24 h-24 relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {!item.active && (
                    <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                      <span className="text-xs font-bold text-white bg-gray-800/80 px-2 py-1 rounded">INACTIVE</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    <p className="font-bold">RM {item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex space-x-1">
                      {item.platforms.map(platform => (
                        <div 
                          key={platform}
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            getPlatformColor(platform)
                          )}
                        >
                          <span className="text-xs font-bold">{platform.charAt(0).toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Edit2 size={14} className="text-gray-600" />
                      </button>
                      <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <MoreHorizontal size={14} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedTransition>
        ))}
      </div>
    </div>
  );
};

export default RestaurantManagement;
