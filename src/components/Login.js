import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { loginUser } from './apis/Login'; 

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    if (!email || !password) {
      if (!email) setEmailError("Email is required.");
      if (!password) setPasswordError("Password is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const data = await loginUser(email, password); // Call the new login function
      login(data.access_token);
      if (rememberMe) {
        localStorage.setItem('email', email);
      } else {
        localStorage.removeItem('email');
      }
      navigate('/home');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const inputStyle = {
    marginBottom: '0.625em',
    padding: '0.625em',
    borderRadius: '0.3125em',
    border: `1px solid ${theme.colors.border}`,
    width: '100%',
    maxWidth: '18.75em',
    backgroundColor: theme.colors.inputBackground,
    color: theme.colors.text,
    outline: 'none',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      padding: '1.25em',
      boxSizing: 'border-box',
    }}>
      <h1 style={{ fontSize: '1.5em', marginBottom: '1.25em' }}>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          ...inputStyle,
          border: emailError ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.border}`,
        }}
        onFocus={(e) => e.target.style.border = `1px solid ${theme.colors.text}`}
        onBlur={(e) => e.target.style.border = emailError ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.border}`}
      />
      {emailError && <p style={{ color: theme.colors.error, fontSize: '0.8em', margin: '0.25em 0' }}>{emailError}</p>}
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          ...inputStyle,
          border: passwordError ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.border}`,
        }}
        onFocus={(e) => e.target.style.border = `1px solid ${theme.colors.text}`}
        onBlur={(e) => e.target.style.border = passwordError ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.border}`}
      />
      {passwordError && <p style={{ color: theme.colors.error, fontSize: '0.8em', margin: '0.25em 0' }}>{passwordError}</p>}
      
      <label style={{ marginBottom: '0.625em' }}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember Me
      </label>
      <button onClick={handleLogin} style={{
        padding: '0.625em 1.25em',
        borderRadius: '0.3125em',
        border: 'none',
        backgroundColor: theme.colors.primary,
        color: theme.colors.text,
        cursor: 'pointer',
        marginBottom: '0.625em',
      }}>Login</button>
      {loginError && (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <p style={{ color: theme.colors.error, fontSize: '0.9em', margin: '0.25em 0' }}>
            {loginError} 
            <span 
              onClick={() => navigate('/signup')} 
              style={{ color: theme.colors.primary, textDecoration: 'underline', cursor: 'pointer', marginLeft: '0.5em' }}
            >
              Sign Up
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
