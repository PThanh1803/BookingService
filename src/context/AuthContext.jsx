import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, favoriteAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

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
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setIsAuthenticated(true);

      // Load favorites from user data
      if (userData.favorite) {
        const formattedFavorites = {};

        if (userData.favorite.business) {
          userData.favorite.business.forEach(businessId => {
            formattedFavorites[`business-${businessId}`] = true;
          });
        }

        if (userData.favorite.individual) {
          userData.favorite.individual.forEach(individualId => {
            formattedFavorites[`individual-${individualId}`] = true;
          });
        }

        setFavorites(formattedFavorites);
        localStorage.setItem('favorites', JSON.stringify(formattedFavorites));
      } else if (storedFavorites) {
        // Fallback to stored favorites if user.favorite is empty
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Failed to parse stored favorites:', error);
        }
      }
    } else if (storedFavorites) {
      // Fallback to stored favorites if user not authenticated
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

      // Load favorites from user data returned by login
      if (user.favorite) {
        const formattedFavorites = {};

        if (user.favorite.business) {
          user.favorite.business.forEach(businessId => {
            formattedFavorites[`business-${businessId}`] = true;
          });
        }

        if (user.favorite.individual) {
          user.favorite.individual.forEach(individualId => {
            formattedFavorites[`individual-${individualId}`] = true;
          });
        }

        setFavorites(formattedFavorites);
        localStorage.setItem('favorites', JSON.stringify(formattedFavorites));
      }

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
    localStorage.removeItem('favorites');
    setCurrentUser(null);
    setFavorites({});
    setIsAuthenticated(false);
    navigate('/'); // Redirect to login page after logout
  };

  const isFavorite = (id, type) => {
    const key = `${type}-${id}`;
    return !!favorites[key];
  };

  const toggleFavorite = async (id, type) => {
    const key = `${type}-${id}`;
    const isFavorited = !!favorites[key];

    try {
      if (isFavorited) {
        // Remove from favorites
        const response = await favoriteAPI.deleteFavorite({
          type: type,
          favoriteId: id
        });
        console.log(response);
        const newFavorites = { ...favorites };
        delete newFavorites[key];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        // Update user data in localStorage
        if (currentUser) {
          const updatedUser = { ...currentUser };
          if (updatedUser.favorite && updatedUser.favorite[type]) {
            updatedUser.favorite[type] = updatedUser.favorite[type].filter(favId => favId !== id);
          }
          setCurrentUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } else {
        // Add to favorites
        await favoriteAPI.addFavorite({
          type: type,
          favoriteId: id
        });
        const newFavorites = { ...favorites, [key]: true };
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        // Update user data in localStorage
        if (currentUser) {
          const updatedUser = { ...currentUser };
          if (!updatedUser.favorite) {
            updatedUser.favorite = { business: [], individual: [] };
          }
          if (!updatedUser.favorite[type]) {
            updatedUser.favorite[type] = [];
          }
          if (!updatedUser.favorite[type].includes(id)) {
            updatedUser.favorite[type].push(id);
          }
          setCurrentUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      throw error; 
    }
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