'use client';
import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext(null);

// Provider component that wraps your app and makes user data available to any child component
export function UserProvider({ userData, children }) {
  const [data, setData] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Value object that will be provided to consumers
  const value = {
    userData: data,
    loading,
    error,
    // Optional method to refresh data client-side if needed
    refresh: async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }
        
        const freshData = await response.json();
        setData(freshData);
        setError(null);
      } catch (err) {
        console.error('Error refreshing user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to access the user data
export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
