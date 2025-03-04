
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Store } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
      <header className="container mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
          CakapMakan
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Malaysia's Food Delivery Super App
        </p>
      </header>

      <main className="container mx-auto flex-1 flex items-center justify-center px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 elevation-hover">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Utensils className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>For Consumers</CardTitle>
              <CardDescription>Find the best food delivery deals</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                <li>⭐ Compare prices across Grab, Shopee, and Foodpanda</li>
                <li>⭐ Find the cheapest delivery options</li>
                <li>⭐ Search across all platforms in one place</li>
                <li>⭐ Track your orders in real-time</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="w-full sm:w-auto">
                <Link to="/consumer">
                  Access Consumer App
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 elevation-hover">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Store className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>For Restaurant Owners</CardTitle>
              <CardDescription>Manage your restaurant across platforms</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                <li>📊 Cross-platform analytics dashboard</li>
                <li>📊 Manage listings across all delivery services</li>
                <li>📊 Track performance metrics and revenue</li>
                <li>📊 Set promotions and special offers</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/restaurant">
                  Access Restaurant Dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="container mx-auto py-6 px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© 2023 CakapMakan - Malaysia's Food Delivery Super App</p>
      </footer>
    </div>
  );
};

export default Index;
