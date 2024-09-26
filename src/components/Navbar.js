import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { logout } = useAuth();
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 300); 

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '.5em 1.25em',
      backgroundColor: theme.colors.primary,
      boxShadow: '0 0.125em 0.3125em rgba(0, 0, 0, 0.5)', 
    }}>
      <h1 style={{
        fontSize: '1.5em', 
        fontWeight: 'bold',
        color: isMounted ? theme.colors.text : 'transparent',
        transition: 'color 0.5s ease, transform 0.5s ease',
        transform: isMounted ? 'translateY(0)' : 'translateY(-0.625em)', 
      }}>
        MyApp
      </h1>
      <div>
        <Link to="/home" style={{
          marginRight: '0.9375em', 
          color: theme.colors.text,
          textDecoration: 'none',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.background} 
        onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.text} 
        >
          Home
        </Link>
        <button onClick={handleLogout} style={{
          width: '5em', 
          height: '3em', 
          borderRadius: '1em', 
          backgroundColor: theme.colors.buttonBackground,
          color: theme.colors.buttonText,
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s, transform 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.colors.background; 
          e.currentTarget.style.transform = 'scale(1.1)'; 
          e.currentTarget.style.color = theme.colors.text; 
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.colors.text; 
          e.currentTarget.style.transform = 'scale(1)'; 
          e.currentTarget.style.color = theme.colors.background; 
        }}
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
