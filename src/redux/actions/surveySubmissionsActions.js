/* eslint-disable camelcase */
import api from '@/utils/api/survey-api';

export const FETCH_SUBMISSIONS_REQUEST = 'FETCH_SUBMISSIONS_REQUEST';
export const FETCH_SUBMISSIONS_SUCCESS = 'FETCH_SUBMISSIONS_SUCCESS';
export const FETCH_SUBMISSIONS_FAILURE = 'FETCH_SUBMISSIONS_FAILURE';

export const fetchSurveySubmissionsAction = (page = 1, perPage = 10) => async (dispatch) => {
  dispatch({ type: FETCH_SUBMISSIONS_REQUEST });
  try {
    const response = await api.get(`/survey-submissions?page=${page}&per_page=${perPage}`);

    const {
      data,
      current_page,
      last_page,
      next_page_url,
      prev_page_url,
      per_page,
    } = response.data;

    dispatch({
      type: FETCH_SUBMISSIONS_SUCCESS,
      payload: {
        data,
        current_page,
        last_page,
        next_page_url,
        prev_page_url,
        per_page,
      },
    });
  } catch (error) {
    dispatch({ type: FETCH_SUBMISSIONS_FAILURE, payload: error.message });
  }
};

