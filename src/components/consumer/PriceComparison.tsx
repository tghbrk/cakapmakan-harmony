
import React from 'react';
import { cn } from '@/lib/utils';

export interface PlatformPrice {
  platform: 'grab' | 'shopee' | 'foodpanda';
  price: number;
  deliveryFee: number;
  originalPrice?: number;
  estimatedTime: string;
}

interface PriceComparisonProps {
  prices: PlatformPrice[];
}

export const PriceComparison: React.FC<PriceComparisonProps> = ({ prices }) => {
  // Find the best deal based on total price (price + deliveryFee)
  const bestDeal = prices.reduce((best, current) => 
    (current.price + current.deliveryFee < best.price + best.deliveryFee) ? current : best
  , prices[0]);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'grab': return 'bg-grabGreen text-white';
      case 'shopee': return 'bg-shopeeOrange text-white';
      case 'foodpanda': return 'bg-foodpandaPink text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'grab': return 'Grab';
      case 'shopee': return 'Shopee';
      case 'foodpanda': return 'Foodpanda';
      default: return platform;
    }
  };

  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3">
        {prices.map((price, index) => {
          const isLowestPrice = price === bestDeal;
          const totalPrice = price.price + price.deliveryFee;
          
          return (
            <div 
              key={price.platform} 
              className={cn(
                "relative rounded-lg overflow-hidden transition-all duration-300",
                isLowestPrice ? "elevation-2" : "elevation-1",
                isLowestPrice ? "border-brand-500 border" : "border border-gray-100 dark:border-gray-800"
              )}
            >
              {isLowestPrice && (
                <div className="absolute top-2 right-2 bg-brand-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  Best Deal
                </div>
              )}
              
              <div className="flex flex-col p-3">
                <div className="flex items-center mb-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                    getPlatformColor(price.platform)
                  )}>
                    <span className="text-xs font-bold">{getPlatformName(price.platform).charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{getPlatformName(price.platform)}</span>
                      <div className="flex flex-col items-end">
                        {price.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(price.originalPrice)}
                          </span>
                        )}
                        <span className={cn(
                          "font-bold",
                          isLowestPrice ? "text-brand-600" : ""
                        )}>
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Food: {formatPrice(price.price)}</span>
                      <span>Delivery: {formatPrice(price.deliveryFee)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs border-t border-gray-100 dark:border-gray-800 pt-2 mt-1">
                  <span className="text-gray-500">Estimated delivery</span>
                  <span className="font-medium">{price.estimatedTime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceComparison;
