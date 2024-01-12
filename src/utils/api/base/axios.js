import axios from 'axios';
import { getToken } from '../../helpers';

require('dotenv');

export const apiUrl = process.env.REACT_APP_API_URL;
export const coinmarketcapApiUrl = process.env.REACT_APP_COINMARTCAP_API_URL || 'https://sandbox-api.coinmarketcap.com';

export const defaultParams = () => ({
  headers: { 
  Accept: 'application/json',
  'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
  },
});

export default axios;
