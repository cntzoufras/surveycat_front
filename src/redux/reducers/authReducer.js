import {
  AUTHENTICATE,
  AUTHENTICATE_ERROR_AUTH,
  AUTHENTICATE_LOGIN, 
  AUTHENTICATE_LOGOUT, 
  AUTHENTICATE_REGISTER, 
  AUTHENTICATE_REGISTER_ERROR,
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_LOADING,
  AUTHENTICATE_USER_ERROR,
} from '../actions/authActions';

const initialState = {
  loggedIn: false,
  user: null,
  error: null,
  loading: false,
  registrationSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user, // Store the entire user object in the state
        error: null,
      };
    case AUTHENTICATE_USER:
      return { 
        ...state,
        loggedIn: true,
        user: action.payload.user, // Store the entire user object in the state
        error: null,
        loading: false,
      };
    case AUTHENTICATE_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTHENTICATE_LOGIN:
      console.log('AUTHENTICATE_LOGIN triggered, user:', action.payload.user);
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user, // Store the entire user object in the state
        error: null,
      };
    case AUTHENTICATE_LOGOUT:
      return {
        ...initialState,
      };
    case AUTHENTICATE_REGISTER:
      return {
        ...state,
        registrationSuccess: true,
        error: null,
      };
    case AUTHENTICATE_REGISTER_ERROR:
      return {
        ...state,
        registrationSuccess: false,
        error: action.error,
      };
    case AUTHENTICATE_USER_ERROR:
      return {
        ...state,
        error: action.error,
        loggedIn: false,
        user: null,
        loading: false,
      };
    case AUTHENTICATE_ERROR_AUTH:
      return {
        ...state,
        error: action.error,
        loggedIn: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
