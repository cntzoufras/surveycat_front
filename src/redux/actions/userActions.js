import api from '@/utils/api/survey-api';

// Action Types
export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';

export const UPDATE_USER_AVATAR_REQUEST = 'UPDATE_USER_AVATAR_REQUEST';
export const UPDATE_USER_AVATAR_SUCCESS = 'UPDATE_USER_AVATAR_SUCCESS';
export const UPDATE_USER_AVATAR_FAILURE = 'UPDATE_USER_AVATAR_FAILURE';

export const fetchUserProfileAction = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_PROFILE_REQUEST });
  try {
    const response = await api.get('/user');
    dispatch({
      type: FETCH_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      // Corrected: Dispatch FAILURE on error
      type: FETCH_USER_PROFILE_FAILURE,
      payload: error.message || 'Failed to load user profile',
    });
  }
};

// Corrected: Takes only the 'updates' object
export const updateUserProfileAction = updates => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
  try {
    // Corrected: PUT request to /user endpoint
    const resp = await api.put('/user', updates);
    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: resp.data,
    });
    return resp.data;
  } catch (err) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAILURE,
      payload: err.message,
    });
    throw err;
  }
};

export const updateProfileAvatarAction = file => async (dispatch) => {
  dispatch({ type: UPDATE_USER_AVATAR_REQUEST });
  
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    // Pass a config object as the third argument to api.post
    const response = await api.post(
      '/user/avatar',
      formData,
      {
        headers: {
          // This header is crucial for file uploads
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    dispatch({
      type: UPDATE_USER_AVATAR_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    dispatch({
      type: UPDATE_USER_AVATAR_FAILURE,
      payload: errorMessage,
    });
    throw err;
  }
};
