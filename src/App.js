import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider, useAuth } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/Login';
import Table from './components/Table';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Table />
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
