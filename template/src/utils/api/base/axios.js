import axios from 'axios';
import { getToken } from '../../helpers';

// export const apiUrl = 'https://c-proxy.int.aspirity.com';
export const apiUrl = 'http://localhost/api/';

export const defaultParams = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export default axios;
