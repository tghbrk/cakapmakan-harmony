
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, BarChart2, Search, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ElementType;
  userType: 'consumer' | 'owner' | 'both';
}

interface NavigationBarProps {
  userType: 'consumer' | 'owner';
}

const NavigationBar: React.FC<NavigationBarProps> = ({ userType }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigationItems: NavigationItem[] = [
    { name: 'Home', path: '/', icon: Home, userType: 'both' },
    { name: 'Search', path: '/search', icon: Search, userType: 'consumer' },
    { name: 'Orders', path: '/orders', icon: ShoppingBag, userType: 'consumer' },
    { name: 'Dashboard', path: '/owner-dashboard', icon: BarChart2, userType: 'owner' },
    { name: 'Profile', path: '/profile', icon: User, userType: 'both' },
  ];

  const filteredItems = navigationItems.filter(
    item => item.userType === userType || item.userType === 'both'
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 glassmorphism backdrop-blur-lg z-50">
      <div className="max-w-lg mx-auto px-4">
        <ul className="flex items-center justify-around h-16">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.name;
            
            return (
              <li key={item.name} className="relative">
                <Link
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center w-16 h-16 transition-all duration-300",
                    isActive ? "text-brand-600" : "text-gray-500 hover:text-brand-500"
                  )}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative">
                    <item.icon 
                      size={isActive || isHovered ? 24 : 20} 
                      className={cn(
                        "transition-all duration-300",
                        isActive && "animate-pulse-subtle"
                      )}
                    />
                    
                    {/* Animated background circle on active */}
                    {isActive && (
                      <div className="absolute inset-0 -m-2 bg-brand-100 dark:bg-brand-900/20 rounded-full scale-110 animate-pulse-subtle" 
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </div>
                  
                  <span className={cn(
                    "text-xs mt-1 font-medium transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-70"
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-brand-600 rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
