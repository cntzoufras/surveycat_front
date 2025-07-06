import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_AVATAR_REQUEST,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_FAILURE,
} from '../actions/userActions'; // Make sure the path is correct

// A clean initial state for user profile management
const initialState = {
  profile: null, // To hold the user profile data
  loading: false, // For fetch operations
  updating: false, // For update operations
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // --- FETCH CASES ---
    case FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        updating: true,
        error: null,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        updating: false,
        profile: action.payload, // Update the profile with the new data
      };
    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.payload,
      };
    case UPDATE_USER_AVATAR_REQUEST:
      return {
        ...state,
        updating: true,
        error: null,
      };
    case UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        updating: false,
        profile: action.payload,
      };
    case UPDATE_USER_AVATAR_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
