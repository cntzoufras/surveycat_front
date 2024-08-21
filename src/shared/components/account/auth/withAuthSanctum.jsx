import store from '../../../../containers/App/store';
import {handleLogin, handleLogout, auth as authAction } from '../../../../redux/actions/authActions';

const initAuthSanctum = async () => {
  try {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth && storedAuth.token) {
      store.dispatch(authAction({ token: storedAuth.token }));
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
      // firstname: user.firstname,
      // lastname: user.lastname,
      avatar: user.avatar,
      token: user.token
    }));
  } catch (e) {
    console.log(e);
  }
};

export { handleLogin, handleLogout };
export default initAuthSanctum;
