import { get } from './base/index';
import { coinmarketcapApiUrl } from './base/axios';


console.log('checking envs...');

if ('REACT_APP_COINMARKETCAP_API_KEY' in process.env) {
  console.log('REACT_APP_SMTH_VAR is set');
} else {
  console.log('REACT_APP_SMTH_VAR not set');
}

// Available api doc: "https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide"
export default {
  getListingsLatest: (limit = 10, sort = 'market_cap') => {
    const params = {
      limit,
      sort,
    };
    return get(`${coinmarketcapApiUrl}/coinmarket/v1/cryptocurrency/listings/latest`, { params });
  },
  getQuotesBySymbol: (symbol) => {
    const params = { symbol, 'X-CMC_PRO_API_KEY': '99ddab32-94ed-4949-8526-f6cc6992bad5' };

    return get(`${coinmarketcapApiUrl}/v2/cryptocurrency/quotes/latest`, { params });
  },
  getGlobalQuotes: () => get(`${coinmarketcapApiUrl}/v1/global-metrics/quotes/latest`),
};
