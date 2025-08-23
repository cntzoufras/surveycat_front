/* eslint-disable camelcase */
import api from '@/utils/api/survey-api';

export const FETCH_SUBMISSIONS_REQUEST = 'FETCH_SUBMISSIONS_REQUEST';
export const FETCH_SUBMISSIONS_SUCCESS = 'FETCH_SUBMISSIONS_SUCCESS';
export const FETCH_SUBMISSIONS_FAILURE = 'FETCH_SUBMISSIONS_FAILURE';

export const FETCH_SURVEY_SUBMISSION_REQUEST = 'FETCH_SURVEY_SUBMISSION_REQUEST';
export const FETCH_SURVEY_SUBMISSION_SUCCESS = 'FETCH_SURVEY_SUBMISSION_SUCCESS';
export const FETCH_SURVEY_SUBMISSION_FAILURE = 'FETCH_SURVEY_SUBMISSION_FAILURE';
export const CLEAR_SURVEY_SUBMISSION_DETAILS = 'CLEAR_SURVEY_SUBMISSION_DETAILS';

export const fetchSurveySubmissionsAction = (page = 1, perPage = 10, search = '') => async (dispatch) => {
  dispatch({ type: FETCH_SUBMISSIONS_REQUEST, meta: { perPage } });
  try {
    const searchParam = search && typeof search === 'string' ? `&search=${encodeURIComponent(search)}` : '';
    const basePath = '/survey-submissions';
    const query = `page=${page}&per_page=${perPage}&limit=${perPage}${searchParam}`;
    const response = await api.get(`${basePath}?${query}`);

    const {
      data,
      current_page,
      last_page,
      next_page_url,
      prev_page_url,
      per_page,
      total,
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
        total,
      },
    });
  } catch (error) {
    dispatch({ type: FETCH_SUBMISSIONS_FAILURE, payload: error.message });
  }
};

export const clearSubmissionDetailsAction = () => ({
  type: CLEAR_SURVEY_SUBMISSION_DETAILS,
});

export const fetchSurveySubmissionAction = id => async (dispatch) => {
  dispatch({ type: FETCH_SURVEY_SUBMISSION_REQUEST });
  try {
    const response = await api.get(`/survey-submissions/${id}`);
    dispatch({
      type: FETCH_SURVEY_SUBMISSION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_SURVEY_SUBMISSION_FAILURE, payload: error.message });
  }
};
