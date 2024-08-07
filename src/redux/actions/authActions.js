import axios from 'axios';
import api, { setAuthToken } from '@/utils/apiClient';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_ERROR_AUTH = 'AUTHENTICATE_ERROR_AUTH';
export const AUTHENTICATE_LOGIN = 'AUTHENTICATE_LOGIN';
export const AUTHENTICATE_LOGOUT = 'AUTHENTICATE_LOGOUT';
export const AUTHENTICATE_REGISTER = 'AUTHENTICATE_REGISTER';
export const AUTHENTICATE_REGISTER_ERROR = 'AUTHENTICATE_REGISTER_ERROR';

export function auth({ name, avatar, token }) {
  return {
    type: AUTHENTICATE,
    token,
    user: { name, avatar },
  };
}

export function login({ fullName, avatar, token }) {
  return {
    type: AUTHENTICATE_LOGIN,
    payload: { fullName, avatar, token },
  };
}

export function authError(error) {
  return {
    type: AUTHENTICATE_ERROR_AUTH,
    error,
  };
}

export function logout() {
  return { type: AUTHENTICATE_LOGOUT };
}

export const handleLogout = () => (dispatch) => {
  localStorage.clear();
  sessionStorage.clear();
  dispatch(logout());
};

export const handleLogin = credentials => async (dispatch) => {
  try {
    const updatedUrl = process.env.REACT_APP_API_URL.replace(/\/api/, '');
        
    // Fetch CSRF token
    const csrfResponse = await axios.get(`${updatedUrl}/sanctum/csrf-cookie`, { withCredentials: true });
    const sanctumCsrfToken = csrfResponse.data.csrfToken
    console.log(sanctumCsrfToken);
    
    // Log the CSRF response to debug
    console.log('CSRF Response:', csrfResponse);

    // Extract CSRF token from cookies
    const csrfToken = getCsrfTokenFromCookies();
    if (!csrfToken) {
      throw new Error('CSRF token not found');
    }
    console.log('Fetched CSRF Token:', csrfToken);

    // Make the login request with the CSRF token
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, credentials, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'X-CSRF-TOKEN': csrfResponse.data.csrfToken,
        'X-CSRF-TOKEN': csrfToken,
      },
      withCredentials: true // Ensure cookies are sent
    });
    
    const { fullName, avatar, token } = response.data;
    console.log('Login token: ', token);
    
    dispatch(login({ fullName, avatar, token }));
    localStorage.setItem('auth', JSON.stringify({
      loggedIn: true,
      fullName,
      avatar,
      token,
    }));
    
    // Return the response to handle in the component
    return { payload: { token } };
    
  } catch (error) {
    console.error('Login failed:', error);
    dispatch(handleAuthError('Login failed. Check your credentials &  please try again.'));
    throw error;
  }
};

// Helper function to extract CSRF token from cookies
const getCsrfTokenFromCookies = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const handleAuthError = error => (dispatch) => {
  dispatch(authError(error));
};

export function registerSuccess(token) {
  return {
    type: AUTHENTICATE_REGISTER,
    payload: { token },
  };
}

export function registerError(error) {
  return {
    type: AUTHENTICATE_REGISTER_ERROR,
    error,
  };
}

export const handleRegister = ({
 username, email, password, password_confirmation,
 }) => async (dispatch) => {
  try {
    const updatedUrl = process.env.REACT_APP_API_URL.replace(/\/api/, '');
    await axios.get(`${updatedUrl}/sanctum/csrf-cookie`);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        username,
        email,
        password,
        password_confirmation,
    }, {
        headers: {
            Accept: 'application/json',
        },
    });

    const { token } = response.data;
    console.log(token)
    dispatch(registerSuccess(token));
    localStorage.setItem('auth', JSON.stringify({
      loggedIn: true,
      token,
    }));
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    dispatch(registerError(error));
    throw error.response.data;
  }
};
