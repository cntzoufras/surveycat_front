import axios from 'axios';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_ERROR_AUTH = 'AUTHENTICATE_ERROR_AUTH';
export const AUTHENTICATE_LOGIN = 'AUTHENTICATE_LOGIN';
export const AUTHENTICATE_LOGOUT = 'AUTHENTICATE_LOGOUT';
export const AUTHENTICATE_REGISTER = 'AUTHENTICATE_REGISTER';
export const AUTHENTICATE_REGISTER_ERROR = 'AUTHENTICATE_REGISTER_ERROR';

export function auth({ name, avatar }) {
  return {
    type: AUTHENTICATE,
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
    await axios.get(`${updatedUrl}/sanctum/csrf-cookie`);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials, {
        headers: {
            Accept: 'application/json',
        },
    });
    const { fullName, avatar, token } = response.data;
    dispatch(login({ fullName, avatar, token }));
    localStorage.setItem('auth', JSON.stringify({
      loggedIn: true,
      fullName,
      avatar,
      token,
    }));
  } catch (error) {
    console.error('Login failed:', error);
  }
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
 username, email, password, cPassword,
 }) => async (dispatch) => {
  try {
    const updatedUrl = process.env.REACT_APP_API_URL.replace(/\/api/, '');
    await axios.get(`${updatedUrl}/sanctum/csrf-cookie`);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username,
        email,
        password,
        cPassword,
    }, {
        headers: {
            Accept: 'application/json',
        },
    });

    const { token } = response.data;
    dispatch(registerSuccess(token));
    localStorage.setItem('auth', JSON.stringify({
      loggedIn: true,
      token,
    }));
  } catch (error) {
    console.error('Registration failed:', error);
    dispatch(registerError(error));
  }
};
