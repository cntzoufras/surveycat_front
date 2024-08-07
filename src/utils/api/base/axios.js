import axios from 'axios';

require('dotenv');

export const apiUrl = process.env.REACT_APP_API_URL;

export const defaultParams = () => ({
  headers: { 
  'Content-Type': 'application/json',
  Accept: 'application/json',
  
  },
});

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: defaultParams().headers,
});

export default axiosInstance;
