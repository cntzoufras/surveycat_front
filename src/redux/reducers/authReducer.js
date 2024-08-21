import {
  AUTHENTICATE,
  AUTHENTICATE_ERROR_AUTH,
  AUTHENTICATE_LOGIN, 
  AUTHENTICATE_LOGOUT, 
  AUTHENTICATE_REGISTER, 
  AUTHENTICATE_REGISTER_ERROR,
} from '../actions/authActions';

const initialState = {
  loggedIn: false,
  user: null, // To store the user object including user_id, fullName, etc.
  error: null,

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
    case AUTHENTICATE_LOGOUT:
      return {
        ...initialState, // Reset to the initial state
      };
    case AUTHENTICATE_ERROR_AUTH:
      return {
        ...state,
        error: action.error,
        loggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
