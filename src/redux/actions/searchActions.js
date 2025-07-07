import api from '@/utils/api/survey-api';

// Action Types
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_FAILURE = 'SEARCH_REQUEST_FAILURE';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

// Action Creator (Thunk)
export const searchSurveys = query => async (dispatch) => {
  if (!query) {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
    return;
  }

  dispatch({ type: SEARCH_REQUEST });

  try {
    const response = await api.get('/global-search', { params: { query } });
    dispatch({
      type: SEARCH_REQUEST_SUCCESS,
      payload: response.data.surveys,
    });
  } catch (error) {
    console.error('Search API Error:', error);
    dispatch({
      type: SEARCH_REQUEST_FAILURE,
      payload: error.response ? error.response.data : 'An error occurred',
    });
  }
};

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS,
});
