
import React, { useState, useEffect } from 'react';
import { Search, Bell, MapPin } from 'lucide-react';
import AnimatedTransition from '../shared/AnimatedTransition';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useState('Kuala Lumpur');
  const [notifications, setNotifications] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 ${scrolled ? 'glassmorphism' : 'bg-transparent'} transition-all duration-300`}>
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <AnimatedTransition direction="down" delay={0.1}>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                CM
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  CakapMakan
                </h1>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={14} className="mr-1" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </AnimatedTransition>

          <AnimatedTransition direction="down">
            <div className="flex items-center space-x-3">
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200">
                <Search size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
              
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200">
                <Bell size={20} className="text-gray-600 dark:text-gray-300" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-brand-600 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </header>
  );
};

export default Header;
