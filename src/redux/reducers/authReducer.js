import {
  AUTHENTICATE,
  AUTHENTICATE_ERROR_AUTH,
  AUTHENTICATE_LOGIN, 
  AUTHENTICATE_LOGOUT, 
  AUTHENTICATE_REGISTER, 
  AUTHENTICATE_REGISTER_ERROR, handleLogin
} from '../actions/authActions';

const initialState = {
  fullName: '',
  avatar: '',
};

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case AUTHENTICATE:
//       return { fullName: action.user.name, avatar: action.user.avatar };
//     case AUTHENTICATE_ERROR_AUTH:
//       return { error: action.error };
//     default:
//       return state;
//   }
// };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        loggedIn: true,
        firstname: action.payload.firstname,
        avatar: action.payload.avatar,
        token: action.payload.token,
        error: null,
      };
    case AUTHENTICATE_ERROR_AUTH:
      return {
        ...state,
        error: action.error,
      };
    case AUTHENTICATE_LOGOUT:
      // return {
      //   ...state,
      //   loggedIn: false,
      //   fullName: '',
      //   avatar: '',
      //   token: null,
      // };
      return { ...initialState };
    default:
      return state;
  }
};


export default authReducer;
