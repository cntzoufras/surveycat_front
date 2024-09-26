import api from '@/utils/api/survey-api';

export const FETCH_RESPONDENTS_REQUEST = 'FETCH_RESPONDENTS_REQUEST';
export const FETCH_RESPONDENTS_SUCCESS = 'FETCH_RESPONDENTS_SUCCESS';
export const FETCH_RESPONDENTS_FAILURE = 'FETCH_RESPONDENTS_FAILURE';

export const fetchRespondentsAction = (page = 1, perPage = 10) => async (dispatch) => {
  dispatch({ type: FETCH_RESPONDENTS_REQUEST });
  try {
    const response = await api.get(`/respondents?page=${page}&per_page=${perPage}`);
    dispatch({ type: FETCH_RESPONDENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_RESPONDENTS_FAILURE, payload: error.message });
  }
};
