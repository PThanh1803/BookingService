import axios from 'axios';

const BASE_URL = 'https://resalon.onrender.com/v1/booking';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (data) => api.post('/login', data),
  register: (data) => api.post('/register', data),
};

// User APIs
export const userAPI = {
  getUsers: () => api.get('/users'),
  updateUser: (data) => api.put('/update', data),
};

// Service APIs
export const serviceAPI = {
  getServices: () => api.get('/services'),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
};

// Category APIs
export const categoryAPI = {
  getCategories: () => api.get('/categories'),
  getCategory: (id) => api.get(`/categories/${id}`),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
};

// Business APIs
export const businessAPI = {
  getBusiness: () => api.get('/business'),
  getBusinessById: (id) => api.get(`/business/${id}`),
  createBusiness: (data) => api.post('/business', data),
  updateBusiness: (id, data) => api.put(`/business/${id}`, data),
};

// Individual APIs
export const individualAPI = {
  getIndividuals: () => api.get('/individuals'),
  getIndividualById: (id) => api.get(`/individuals/${id}`),
  createIndividual: (data) => api.post('/individuals', data),
  updateIndividual: (id, data) => api.put(`/individuals/${id}`, data),
};

export default api; 