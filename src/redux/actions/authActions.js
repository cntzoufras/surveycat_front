import axios from 'axios';
import Cookies from 'js-cookie';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_ERROR_AUTH = 'AUTHENTICATE_ERROR_AUTH';
export const AUTHENTICATE_LOGIN = 'AUTHENTICATE_LOGIN';
export const AUTHENTICATE_LOGOUT = 'AUTHENTICATE_LOGOUT';
export const AUTHENTICATE_REGISTER = 'AUTHENTICATE_REGISTER';
export const AUTHENTICATE_REGISTER_ERROR = 'AUTHENTICATE_REGISTER_ERROR';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const AUTHENTICATE_USER_LOADING = 'AUTHENTICATE_USER_LOADING';
export const AUTHENTICATE_USER_ERROR = 'AUTHENTICATE_USER_ERROR';

export function authError(error) {
  return {
    type: AUTHENTICATE_ERROR_AUTH,
    error,
  };
}

export function registerError(error) {
  return {
    type: AUTHENTICATE_REGISTER_ERROR,
    error,
  };
}

export const authenticateUser = () => async (dispatch) => {
  dispatch({ type: AUTHENTICATE_USER_LOADING });

  try {
    const auth = JSON.parse(localStorage.getItem('auth'));

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      withXSRFToken: true,
    });

    const { user } = response.data;

    dispatch({
      type: AUTHENTICATE_USER,
      payload: { user },
    });
  } catch (error) {
    console.error('Authentication failed:', error);
    dispatch(authError('Authentication failed. Please log in again.'));
    localStorage.removeItem('auth'); // Clear auth data if authentication fails
  }
};

export function login({ user }) {
  return {
    type: AUTHENTICATE_LOGIN,
    payload: { user },
  };
}

export function logout() {
  return { type: AUTHENTICATE_LOGOUT };
}

export const setupInterceptor = (navigate, dispatch) => {
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.response.status === 401) {
        // Clear authentication and session cookies
        Cookies.remove('auth');
        Cookies.remove('surveycat_session');
        Cookies.remove('XSRF-TOKEN');

        // Dispatch logout action to Redux store
        dispatch(logout());

        // Redirect to the login page
        navigate('/login');
      }

      // Handle CSRF token mismatch error by refreshing the CSRF token
      if (error.response && error.response.status === 419) {
        await axios.get(`${error.config.baseURL}/sanctum/csrf-cookie`, { withCredentials: true });
        return api(error.config); // Retry the original request
      }

      return Promise.reject(error);
    }
  );
};

export const handleLogin = credentials => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
    
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, credentials, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Ensure cookies are sent,
      withXSRFToken: true,
    });
    
    const { user } = response.data;
    console.log('Dispatching AUTHENTICATE_LOGIN with user:', user);

    dispatch({
      type: AUTHENTICATE_LOGIN,
      payload: { user },
    });

    localStorage.setItem('auth', JSON.stringify({ loggedIn: true, user }));
    console.log('Login successful: ', user);
  } catch (error) {
    // Check if the error response is due to unverified email
    if (error.response && error.response.status === 403 && error.response.data.message.includes('Email not verified')) {
      dispatch(authError('Email not verified. Please check your inbox for the verification link.'));
    } else {
      // Generic login failure message
      dispatch(authError('Login failed. Please check your credentials.'));
    }
    console.error('Login error:', error.response ? error.response.data : error.message);
  }
};

export const handleLogout = () => async (dispatch) => {
  try {
    // Make a POST request to your API's logout endpoint
    await axios.post(`${process.env.REACT_APP_BASE_URL}/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true, // Ensure cookies are sent
      withXSRFToken: true,   // Include CSRF token if necessary
    });

    // Clear local storage
    localStorage.removeItem('auth');

    const baseDomain = `.${new URL(process.env.REACT_APP_BASE_URL).hostname}`;
    console.log(baseDomain);
    const isSecure = new URL(process.env.REACT_APP_BASE_URL).protocol === 'https:';

    // Remove cookies with the correct domain, secure flag, and SameSite attribute
    const cookieOptions = { path: '/', domain: baseDomain, sameSite: 'Lax' };

    // Remove with and without secure flag
    Cookies.remove('auth', cookieOptions);
    Cookies.remove('surveycat_session', cookieOptions);
    Cookies.remove('XSRF-TOKEN', cookieOptions);

    if (isSecure) {
      Cookies.remove('auth', { ...cookieOptions, secure: true });
      Cookies.remove('surveycat_session', { ...cookieOptions, secure: true });
      Cookies.remove('XSRF-TOKEN', { ...cookieOptions, secure: true });
    }

    // Dispatch logout action to Redux store
    dispatch(logout());

    // Redirect to the login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
    // Optionally, you can handle errors or retry the request here
  }
};

export const handleRegister = ({
 username, email, password, passwordConfirmation,
 }) => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/sanctum/csrf-cookie`);
    
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
      username,
      email,
      password,
      passwordConfirmation,
    }, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
        },
        withXSRFToken: true,
    });

    
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    dispatch(registerError(error));
    throw error.response.data;
  }
};

export const handleAuthError = error => (dispatch) => {
  dispatch(authError(error));
};
