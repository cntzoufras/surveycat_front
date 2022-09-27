import axios from 'axios';
import store from 'store';
import moment from 'moment';

import Cookie from 'utils/cookie';

import AUTH_TYPES from 'store/auth/types';

import { stringifyObj } from 'utils/urls';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const authHeader = () => {
  const token = Cookie.get('accessToken');
  return { Authorization: `Bearer ${token}` };
};

export const REFRESH_TOKEN_REQUEST_URL = '/refresh';

export const getApiBaseUrl = (path, fullURL) => {
  return fullURL ? process.env.REACT_APP_FULL_API_URL : process.env.REACT_APP_API_URL;
};

const getURL = (path, fullURL) =>
  getApiBaseUrl(path, fullURL) + (path.startsWith('/') ? path : '/' + path);

const getHeaders = auth => {
  let headers = { ...defaultHeaders };

  if (auth) {
    headers = { ...headers, ...authHeader() };
  }

  return headers;
};

const apiService = process.env.NODE_ENV === 'test' ? axios : axios.create({});

export const get = (path, params = {}, auth = true) =>
  apiService.get(getURL(path), {
    params,
    headers: getHeaders(auth),
    paramsSerializer: params => stringifyObj(params)
  });

export const post = (path, params = {}, auth = true) => {
  return apiService.post(getURL(path), params, { headers: getHeaders(auth) });
};

export const put = (path, params = {}, auth = true) =>
  apiService.put(getURL(path), params, {
    headers: getHeaders(auth)
  });

export const deleteRequest = (path, params = {}, auth = true) => {
  const { data, ...rest } = params;
  return apiService.delete(getURL(path), { params: rest, headers: getHeaders(auth), data });
};

export const upload = (path, params = {}, auth = true, config) =>
  apiService.post(getURL(path, true), params, {
    headers: { ...getHeaders(auth), 'content-type': 'multipart/form-data' },
    ...config
  });

export const download = (path, params = {}, auth = true, parsed, customHeaders = {}) => {
  let config = {
    responseType: 'blob',
    params,
    headers: { ...getHeaders(auth), ...customHeaders }
  };
  if (parsed) {
    config = {
      ...config,
      paramsSerializer: params => stringifyObj(params)
    };
  }
};

let refreshingTokens = null;
let refreshTokenRequested = false;

const handleAuthErrorResponse = (error, store) => {
  if (error && error.message && error.message === 'canceled_request') return Promise.reject(error);

  switch (error && error && error.status) {
    case 400:
      store.dispatch({
        type: AUTH_TYPES.LOGOUT.SUCCESS
      });

      return error;
    default:
      return error;
  }
};

const handleTokenRefresh = async (config, store) => {
  const res = await refreshingTokens;

  if (res && res.token) {
    const Authorization = `Bearer ${res.token}`;
    refreshTokenRequested = false;

    return {
      ...config,
      headers: { ...config.headers, Authorization }
    };
  } else {
    refreshTokenRequested = false;
    handleAuthErrorResponse(res, store);
  }

  return config;
};

(function checkIfAuthStatusHasChanged() {
  window.addEventListener(
    'focus',
    event => {
      if (window.localStorage.getItem('refreshTokenPending') === 'true') return;

      if (Cookie.get('accessToken') && !store.getState().auth.isAuthenticated) {
        // if user has logged in another tab, log him in this tab too
        console.log('Tab Focus - Updating tab token');

        store.dispatch({
          type: AUTH_TYPES.APPARATUS_LOGIN.SUCCESS,
          payload: {
            token: Cookie.get('accessToken'),
            refresh_token: window.localStorage.getItem('refreshToken')
          }
        });
      } else if (!Cookie.get('accessToken') && store.getState().auth.isAuthenticated) {
        // if user is logged in this tab, but the token is missing, log him out
        console.log('Tab Focus - Will logout user from this tab');
        store.dispatch({
          type: AUTH_TYPES.LOGOUT.SUCCESS
        });
      }
    },
    false
  );

  window.addEventListener('beforeunload', event => {
    // Tab is closing
    if (refreshTokenRequested) {
      /* This tab has requested a new refresh token and the request is still pending.
        We have to reset the refreshTokenPending so that the other orca tabs (if any) won't stay on pending mode.
        The user will be logged out when he navigates on any other tab.
      */
      window.localStorage.setItem('refreshTokenPending', false);
    }
  });
})();

const refreshFunc = async () => {
  if (window.localStorage.getItem('refreshTokenPending') === 'true') {
    console.log('Another tab is already requesting a new token');

    const detectLocalStorageUpdate = (e, resolve, reject) => {
      if (e.key === 'refreshTokenPending') {
        if (e.oldValue === 'true' && e.newValue === 'false') {
          // Add some timeout to make sure the new access token is stored in cookies
          console.log('The new token is set');
          setTimeout(() => resolve({ token: Cookie.get('accessToken') }), 300);
        }
      }
    };

    const requesting = new Promise((resolve, reject) => {
      window.addEventListener('storage', e => detectLocalStorageUpdate(e, resolve, reject), false);
    }).then(data => {
      window.removeEventListener('storage', detectLocalStorageUpdate, false);
      return data;
    });

    return requesting;
  } else {
    console.log('Will request new token');
    window.localStorage.setItem('refreshTokenPending', true);

    return store.dispatch(refreshTokens()).then(data => {
      console.log('The new access token', data);
      window.localStorage.setItem('refreshTokenPending', false);

      return data;
    });
  }
};

// API request interceptor
export function setupRequestInterceptors(store) {
  apiService.interceptors.request.use(
    function (config) {
      // Check if the request has expired token. Request new tokens if it does.

      if (refreshTokenRequested && config.url.includes(REFRESH_TOKEN_REQUEST_URL)) {
        return config;
      } else if (refreshTokenRequested) {
        return handleTokenRefresh(config, store);
      } else if (
        moment().unix() + 10 >=
        parseInt(window.localStorage.getItem('tokenExpiresAt'), 10)
      ) {
        // Request has expired token
        console.log('Request has expired token');
        console.log('refreshTokenPending ' + window.localStorage.getItem('refreshTokenPending'));

        refreshTokenRequested = true;
        refreshingTokens = refreshFunc();

        return handleTokenRefresh(config, store);
      } else {
        return config;
      }
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}

// API response interceptor
export function setupResponseInterceptors(store) {
  apiService.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      switch (error && error.response && error.response.status) {
        case 401:
          console.log('401 Response, will logout user');
          store.dispatch({
            type: AUTH_TYPES.LOGOUT.SUCCESS
          });

          break;
        case 403:
          break;
        default:
          return Promise.reject(error.response);
      }

      return Promise.reject(error.response);
    }
  );
}
