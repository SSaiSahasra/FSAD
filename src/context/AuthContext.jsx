import { createContext, useContext, useEffect, useState } from 'react';
import { apiPost } from '../api/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getStoredUser = () => {
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem('currentUser');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const normalizeRole = (role) => String(role || '').replace(/^ROLE_/i, '').toLowerCase();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await apiPost('/auth/login', JSON.stringify({ email, password }), null, 'application/json');
      const user = {
        name: data.name,
        email: data.email,
        role: normalizeRole(data.role),
      };
      setCurrentUser(user);
      setToken(data.token);
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiPost('/auth/register', JSON.stringify(userData), null, 'application/json');
      const user = {
        name: data.name,
        email: data.email,
        role: normalizeRole(data.role),
      };
      setCurrentUser(user);
      setToken(data.token);
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const authenticateWithGoogle = async (idToken) => {
    try {
      const data = await apiPost('/auth/google', JSON.stringify({ idToken }), null, 'application/json');
      const user = {
        name: data.name,
        email: data.email,
        role: normalizeRole(data.role),
      };
      setCurrentUser(user);
      setToken(data.token);
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout, register, authenticateWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
