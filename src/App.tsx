
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkLoaded, ClerkLoading, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ConsumerHome from "./pages/consumer/Home";
import RestaurantDashboard from "./pages/restaurant/Dashboard";
import { Spinner } from "./components/ui/spinner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ClerkLoading>
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Clerk Auth Routes */}
            <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
            
            {/* Protected Routes */}
            <Route 
              path="/consumer" 
              element={
                <ConsumerHome />
              } 
            />
            <Route 
              path="/restaurant" 
              element={
                <RestaurantDashboard />
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClerkLoaded>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
