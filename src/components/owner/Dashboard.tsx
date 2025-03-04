
import React, { useState } from 'react';
import { Calendar, TrendingUp, ShoppingBag, DollarSign, ArrowDownRight, ArrowUpRight, Filter } from 'lucide-react';
import AnimatedTransition from '../shared/AnimatedTransition';
import AnalyticsChart from './AnalyticsChart';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState('all');

  // Mock data - in a real app, this would come from an API
  const revenueData = [
    { name: 'Mon', grab: 4500, shopee: 2400, foodpanda: 3800 },
    { name: 'Tue', grab: 3800, shopee: 2800, foodpanda: 4200 },
    { name: 'Wed', grab: 5200, shopee: 3100, foodpanda: 4000 },
    { name: 'Thu', grab: 4900, shopee: 3400, foodpanda: 3900 },
    { name: 'Fri', grab: 6100, shopee: 3900, foodpanda: 4800 },
    { name: 'Sat', grab: 8200, shopee: 4500, foodpanda: 5700 },
    { name: 'Sun', grab: 7400, shopee: 4100, foodpanda: 5100 },
  ];

  const ordersData = [
    { name: 'Mon', grab: 42, shopee: 23, foodpanda: 35 },
    { name: 'Tue', grab: 38, shopee: 25, foodpanda: 37 },
    { name: 'Wed', grab: 45, shopee: 29, foodpanda: 36 },
    { name: 'Thu', grab: 43, shopee: 30, foodpanda: 34 },
    { name: 'Fri', grab: 52, shopee: 36, foodpanda: 42 },
    { name: 'Sat', grab: 75, shopee: 43, foodpanda: 51 },
    { name: 'Sun', grab: 68, shopee: 38, foodpanda: 47 },
  ];

  const platformData = [
    { name: 'Grab', value: 45 },
    { name: 'Shopee', value: 20 },
    { name: 'Foodpanda', value: 35 },
  ];

  const metricsData = [
    { title: 'Total Revenue', value: 'RM 56,789', change: 12.5, icon: DollarSign, color: 'bg-brand-500' },
    { title: 'Total Orders', value: '1,234', change: 8.2, icon: ShoppingBag, color: 'bg-grabGreen' },
    { title: 'Avg. Order Value', value: 'RM 46.02', change: 3.7, icon: TrendingUp, color: 'bg-shopeeOrange' },
    { title: 'Next Payout', value: 'RM 12,345', change: -2.3, icon: Calendar, color: 'bg-foodpandaPink' },
  ];

  // Chart data calculation based on filters
  const getPlatformData = (data: any[]) => {
    if (selectedPlatformFilter === 'all') {
      return data;
    }
    
    return data.map(item => {
      const filtered = { name: item.name };
      // Only include the selected platform
      filtered[selectedPlatformFilter] = item[selectedPlatformFilter];
      return filtered;
    });
  };

  const getFilteredDataKeys = () => {
    if (selectedPlatformFilter === 'all') {
      return ['grab', 'shopee', 'foodpanda'];
    }
    return [selectedPlatformFilter];
  };

  return (
    <div className="pb-20 px-4 pt-4">
      <AnimatedTransition direction="down" delay={0.1}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <button 
              className={cn(
                "px-3 py-1.5 text-sm rounded-full transition-all duration-200",
                selectedPeriod === 'week' ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-700"
              )}
              onClick={() => setSelectedPeriod('week')}
            >
              Week
            </button>
            <button 
              className={cn(
                "px-3 py-1.5 text-sm rounded-full transition-all duration-200",
                selectedPeriod === 'month' ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-700"
              )}
              onClick={() => setSelectedPeriod('month')}
            >
              Month
            </button>
            <button 
              className={cn(
                "px-3 py-1.5 text-sm rounded-full transition-all duration-200",
                selectedPeriod === 'year' ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-700"
              )}
              onClick={() => setSelectedPeriod('year')}
            >
              Year
            </button>
          </div>
        </div>
      </AnimatedTransition>
      
      <section className="grid grid-cols-2 gap-3 mb-6">
        {metricsData.map((metric, index) => (
          <AnimatedTransition key={metric.title} delay={0.1 * index} direction="up">
            <div className="glassmorphism rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", metric.color)}>
                  <metric.icon className="w-4 h-4 text-white" />
                </div>
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  metric.change >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {metric.change >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <p className="text-sm text-gray-500">{metric.title}</p>
              <p className="text-lg font-bold">{metric.value}</p>
            </div>
          </AnimatedTransition>
        ))}
      </section>
      
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Platform Filter</h2>
          <div className="flex gap-2 items-center">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex gap-1">
              <button 
                className={cn(
                  "px-2 py-1 text-xs rounded-full transition-all duration-200",
                  selectedPlatformFilter === 'all' ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"
                )}
                onClick={() => setSelectedPlatformFilter('all')}
              >
                All
              </button>
              <button 
                className={cn(
                  "px-2 py-1 text-xs rounded-full transition-all duration-200",
                  selectedPlatformFilter === 'grab' ? "bg-grabGreen text-white" : "bg-gray-100 text-gray-700"
                )}
                onClick={() => setSelectedPlatformFilter('grab')}
              >
                Grab
              </button>
              <button 
                className={cn(
                  "px-2 py-1 text-xs rounded-full transition-all duration-200",
                  selectedPlatformFilter === 'shopee' ? "bg-shopeeOrange text-white" : "bg-gray-100 text-gray-700"
                )}
                onClick={() => setSelectedPlatformFilter('shopee')}
              >
                Shopee
              </button>
              <button 
                className={cn(
                  "px-2 py-1 text-xs rounded-full transition-all duration-200",
                  selectedPlatformFilter === 'foodpanda' ? "bg-foodpandaPink text-white" : "bg-gray-100 text-gray-700"
                )}
                onClick={() => setSelectedPlatformFilter('foodpanda')}
              >
                Foodpanda
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <AnimatedTransition delay={0.3} direction="up">
        <section className="mb-6">
          <AnalyticsChart 
            title="Revenue" 
            data={getPlatformData(revenueData)} 
            type="line" 
            dataKeys={getFilteredDataKeys()}
            legendLabels={{ grab: 'Grab', shopee: 'Shopee', foodpanda: 'Foodpanda' }}
            colors={['#00B14F', '#EE4D2D', '#D70F64']}
          />
        </section>
      </AnimatedTransition>
      
      <AnimatedTransition delay={0.4} direction="up">
        <section className="mb-6">
          <AnalyticsChart 
            title="Orders" 
            data={getPlatformData(ordersData)} 
            type="bar" 
            dataKeys={getFilteredDataKeys()}
            legendLabels={{ grab: 'Grab', shopee: 'Shopee', foodpanda: 'Foodpanda' }}
            colors={['#00B14F', '#EE4D2D', '#D70F64']}
          />
        </section>
      </AnimatedTransition>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <AnimatedTransition delay={0.5} direction="up">
          <div className="glassmorphism rounded-xl p-4">
            <h3 className="font-bold mb-4">Top Selling Items</h3>
            <div className="space-y-3">
              {[
                { name: 'Nasi Lemak Special', orders: 423, amount: 'RM 4,653' },
                { name: 'Roti Canai Set', orders: 317, amount: 'RM 2,536' },
                { name: 'Satay Combo', orders: 289, amount: 'RM 3,179' },
                { name: 'Mee Goreng', orders: 213, amount: 'RM 1,917' }
              ].map((item, index) => (
                <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.orders} orders</p>
                    </div>
                  </div>
                  <p className="font-bold">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition delay={0.6} direction="up">
          <div className="glassmorphism rounded-xl p-4">
            <h3 className="font-bold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {[
                { id: '#ORD-7824', time: '10:23 AM', items: 3, amount: 'RM 56.90', platform: 'grab' },
                { id: '#ORD-7823', time: '9:45 AM', items: 1, amount: 'RM 18.50', platform: 'shopee' },
                { id: '#ORD-7822', time: '9:12 AM', items: 2, amount: 'RM 42.00', platform: 'foodpanda' },
                { id: '#ORD-7821', time: '8:30 AM', items: 4, amount: 'RM 76.30', platform: 'grab' }
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                      order.platform === 'grab' ? "bg-grabGreen" : 
                      order.platform === 'shopee' ? "bg-shopeeOrange" : "bg-foodpandaPink"
                    )}>
                      <span className="text-xs text-white font-bold">
                        {order.platform.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.time} • {order.items} items</p>
                    </div>
                  </div>
                  <p className="font-bold">{order.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedTransition>
      </section>
    </div>
  );
};

export default Dashboard;
