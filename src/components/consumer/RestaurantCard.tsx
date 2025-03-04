
import React, { useState } from 'react';
import { Star, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import PriceComparison, { PlatformPrice } from './PriceComparison';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  distance: string;
  prices: PlatformPrice[];
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  image,
  cuisine,
  rating,
  distance,
  prices
}) => {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate the best price
  const bestPrice = prices.reduce((best, current) => 
    (current.price + current.deliveryFee < best.price + best.deliveryFee) ? current : best
  , prices[0]);

  const totalBestPrice = bestPrice.price + bestPrice.deliveryFee;

  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300",
        expanded ? "elevation-3" : "elevation-hover"
      )}
    >
      <div className="relative">
        <div className={cn(
          "w-full h-48 bg-gray-200 overflow-hidden",
          !imageLoaded && "animate-pulse"
        )}>
          <img 
            src={image} 
            alt={name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-700",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
          <span className="font-medium text-sm">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <span>{cuisine}</span>
              <span className="mx-2">•</span>
              <span>{distance}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Best price from</span>
            <span className="font-bold text-brand-600">RM {totalBestPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex">
            {prices.map((price) => (
              <div 
                key={price.platform}
                className={cn(
                  "w-6 h-6 rounded-full mr-1 flex items-center justify-center text-white text-xs font-bold",
                  price.platform === 'grab' ? "bg-grabGreen" : 
                  price.platform === 'shopee' ? "bg-shopeeOrange" : 
                  "bg-foodpandaPink"
                )}
              >
                {price.platform.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {expanded ? (
              <>
                <span>Hide prices</span>
                <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Compare prices</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
        
        {expanded && (
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4 animate-slide-in-bottom">
            <PriceComparison prices={prices} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
