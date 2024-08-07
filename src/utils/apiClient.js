import axiosInstance from './api/base/axios';
import appConfigApi from './api/appConfigApi';
import covidApi from './api/covidApi';
import todoApi from './api/todoApi';
import surveyApi from './api/surveyApi';
import pokemonApi from './api/pokemonApi';
import Cookies from 'js-cookie';

// Function to get CSRF token and set it in default headers
const setCsrfToken = async () => {
  try {
    await axiosInstance.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

// Function to get the token from local storage
const getToken = () => {
  return localStorage.getItem('auth_token');
};

// Function to set the token in local storage
const setToken = (token) => {
  localStorage.setItem('auth_token', token);
};

// Function to remove the token from local storage
const removeToken = () => {
  localStorage.removeItem('auth_token');
};

// Axios request interceptor to set common headers
axiosInstance.interceptors.request.use(async (config) => {
  // Ensure CSRF token is set before each request if not already set
  if (!axiosInstance.defaults.headers.common['X-CSRF-TOKEN']) {
    await setCsrfToken();
  }

  // Set the Authorization header with the token if it exists
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Set CSRF token from cookies if available
  const csrfToken = Cookies.get('XSRF-TOKEN');
  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Function to set the Authorization header with a token
export const setAuthToken = (token) => {
  setToken(token); // Save the token using the helper function
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Function to remove the Authorization header
export const removeAuthToken = () => {
  removeToken(); // Remove the token using the helper function
  delete axiosInstance.defaults.headers.common['Authorization'];
};

const api = {
  client: axiosInstance,
  setAuthToken,
  removeAuthToken,
  appConfig: appConfigApi,
  covid: covidApi,
  todo: todoApi,
  survey: surveyApi,
  pokemon: pokemonApi,
};

export default api;
