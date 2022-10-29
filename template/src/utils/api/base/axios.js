import axios from 'axios';
import { getToken } from '../../helpers';

export const apiUrl = 'http://localhost:5000'; // or paste your own API url for proxy

export const defaultParams = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export default axios;
