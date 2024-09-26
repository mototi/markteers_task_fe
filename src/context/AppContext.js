import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [existingValue, setExistingValue] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state for handling API errors

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setExistingValue(null); // Clear the existing value on logout
  };

  // Fetch the existing value from the database
  useEffect(() => {
    const fetchValue = async () => {
      if (token) { // Only fetch if there's a token
        try {
          const response = await fetch('http://localhost:5000/home', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setExistingValue(data.body); // Assuming the response has a body field
        } catch (err) {
          console.error(err);
          setError('Failed to fetch value from the server.');
        } finally {
          setLoading(false); // Set loading to false regardless of success or failure
        }
      } else {
        setLoading(false); // Set loading to false if no token is present
      }
    };

    fetchValue();
  }, [token]); // Dependency on token to refetch when it changes

  return (
    <AppContext.Provider value={{ token, login, logout, existingValue, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppContext);
};

export default AppContext;
