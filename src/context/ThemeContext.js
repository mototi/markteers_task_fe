import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors: {
      primary: '#1DB954', 
      background: '#121212',
      text: '#FFFFFF', 
      inputBackground: '#282828', 
      border: '#1DB954', 
      error: 'red',
    },
    fonts: {
      main: 'Roboto, sans-serif',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
