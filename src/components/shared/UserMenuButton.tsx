
import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const UserMenuButton: React.FC = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  if (isSignedIn) {
    return (
      <UserButton afterSignOutUrl="/" />
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => navigate('/auth')}
    >
      Sign In
    </Button>
  );
};
