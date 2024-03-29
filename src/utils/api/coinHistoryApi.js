import { get } from './base/index';
import { coinmarketcapApiUrl } from './base/axios';

export default {
  getCurrencyHistoryByCoinCap: (assetId, interval, startTime, endTime) => get(
    // eslint-disable-next-line max-len
    `${coinmarketcapApiUrl}/coincap/v2/assets/${assetId}/history?interval=${interval}&start=${startTime}&end=${endTime}`,
    ),
};
