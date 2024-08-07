import axios from 'axios';
import store from '../../../../containers/App/store';
import { auth, logout } from '../../../../redux/actions/authActions';

const BASE_URL =  'http://surveycat.test';
let csrfToken = null;

const initAuthSanctum = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      store.dispatch(auth({ token }));
    }
  } catch (e) {
    console.log(e);
  }

};

const updateState = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      withCredentials: true,
    });
    const user = response.data;

    store.dispatch(auth({
      name: user.name,
      avatar: user.avatar,
      token: user.token
    }));
  } catch (e) {
    console.log(e);
  }
};

export const login = async (credentials) => {
  try {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
    csrfToken = getCsrfTokenFromCookies(); // Extract and store the CSRF token

    const response = await axios.post(`${BASE_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      await updateState();
      window.history.replaceState({}, document.title, '/online_dashboard');
    }
  } catch (e) {
    console.log('Login failed:', e);
  }
};

export const logoutUser = async () => {
  try {
    if (!csrfToken) {
      // Fetch the CSRF token if it's not already fetched
      const csrfResponse = await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
      csrfToken = getCsrfTokenFromCookies();
    }
    await axios.post(`${BASE_URL}/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'X-CSRF-TOKEN': csrfToken
      },
      withCredentials: true,
    });
    localStorage.removeItem('authToken');

    store.dispatch(logout());
    window.history.replaceState({}, document.title, '/login');
  } catch (e) {
    console.log('Logout failed:', e);
  }
};

const getCsrfTokenFromCookies = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};


export default initAuthSanctum;
