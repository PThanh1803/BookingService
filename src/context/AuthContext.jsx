import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

// Define initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  favorites: {}
};

// Define action types
const actionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  SET_FAVORITES: 'SET_FAVORITES'
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case actionTypes.TOGGLE_FAVORITE:
      const { id, type } = action.payload;
      const key = `${type}-${id}`;
      const newFavorites = { ...state.favorites };
      
      if (newFavorites[key]) {
        delete newFavorites[key];
      } else {
        newFavorites[key] = true;
      }
      
      return {
        ...state,
        favorites: newFavorites
      };
    case actionTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
};

// Create the context
const AuthContext = createContext();

// Auth context provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const storedFavorites = localStorage.getItem('favorites');

    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Failed to parse stored favorites:', error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!currentUser);
  }, [currentUser]);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      console.log(response);
      const { access_token, user } = response.data;
      if (!access_token || !user) {
        throw new Error('Mật khẩu hoặc email không chính xác');
      }
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  const signup = async (userData) => {
    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'password', 'phone', 'address'];
      const missingFields = requiredFields.filter(field => !userData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Vui lòng điền đầy đủ thông tin: ${missingFields.join(', ')}`);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Email không hợp lệ');
      }

      // Validate phone number (Vietnam format)
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneRegex.test(userData.phone)) {
        throw new Error('Số điện thoại không hợp lệ');
      }

      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Đăng ký không thành công');
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/');
  };

  const isFavorite = (id, type) => {
    const key = `${type}-${id}`;
    return !!favorites[key];
  };

  const toggleFavorite = (id, type) => {
    const key = `${type}-${id}`;
    const newFavorites = { ...favorites };

    if (newFavorites[key]) {
      delete newFavorites[key];
    } else {
      newFavorites[key] = true;
    }

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Context values to expose
  const value = {
    currentUser,
    login,
    signup,
    logout,
    isFavorite,
    toggleFavorite,
    favorites,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 