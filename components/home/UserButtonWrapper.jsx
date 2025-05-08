'use client';

import { UserButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

const UserButtonWrapper = () => {
  // Only render on client side
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show a placeholder during server rendering and initial hydration
  if (!isMounted) {
    return <div className="h-16 w-16 rounded-full bg-alternate" />;
  }

  return (
    <UserButton
      appearance={{
        elements: {
          userButtonAvatarBox: {
            width: '50px',
            height: '50px',
          },
        },
      }}
    />
  );
};

export default UserButtonWrapper;
