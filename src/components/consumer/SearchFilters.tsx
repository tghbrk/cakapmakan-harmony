
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  options?: string[];
}

const SearchFilters: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const filters: FilterOption[] = [
    { 
      id: 'cuisine', 
      label: 'Cuisine',
      options: ['Malaysian', 'Chinese', 'Indian', 'Western', 'Japanese', 'Korean', 'Thai']
    },
    { 
      id: 'price', 
      label: 'Price',
      options: ['$', '$$', '$$$', '$$$$']
    },
    { 
      id: 'rating', 
      label: 'Rating',
      options: ['4.5+', '4.0+', '3.5+', '3.0+']
    },
    { 
      id: 'platform', 
      label: 'Platform',
      options: ['All', 'Grab', 'Shopee', 'Foodpanda']
    },
    { 
      id: 'distance', 
      label: 'Distance',
      options: ['1 km', '3 km', '5 km', '10 km']
    }
  ];

  // Popular searches - this would typically come from an API
  const popularSearches = [
    'Nasi Lemak', 'Roti Canai', 'Satay', 'Bubble Tea', 'Burger'
  ];

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="w-full">
      <div className="glassmorphism rounded-lg mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for restaurants, dishes..."
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

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex overflow-x-auto py-1 scrollbar-hide space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200",
                  activeFilters.includes(filter.id)
                    ? "bg-brand-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <Filter size={18} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        
        {isFilterExpanded && (
          <div className="glassmorphism rounded-lg p-4 animate-slide-in-bottom">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Filters</h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-brand-600 hover:text-brand-700 transition-colors"
              >
                Clear all
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {filters.map((filter) => (
                <div key={filter.id} className="mb-3">
                  <h4 className="text-sm font-medium mb-2">{filter.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {filter.options?.map((option) => (
                      <button
                        key={option}
                        className={cn(
                          "px-2 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-200",
                          activeFilters.includes(`${filter.id}-${option}`)
                            ? "bg-brand-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                        onClick={() => toggleFilter(`${filter.id}-${option}`)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!searchValue && !activeFilters.length && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Popular searches</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <button
                key={search}
                className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                onClick={() => setSearchValue(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
