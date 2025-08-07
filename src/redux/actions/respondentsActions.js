import api from '@/utils/api/survey-api';

export const FETCH_RESPONDENTS_REQUEST = 'FETCH_RESPONDENTS_REQUEST';
export const FETCH_RESPONDENTS_SUCCESS = 'FETCH_RESPONDENTS_SUCCESS';
export const FETCH_RESPONDENTS_FAILURE = 'FETCH_RESPONDENTS_FAILURE';
export const UPDATE_RESPONDENT_REQUEST = 'UPDATE_RESPONDENT_REQUEST';
export const UPDATE_RESPONDENT_SUCCESS = 'UPDATE_RESPONDENT_SUCCESS';
export const UPDATE_RESPONDENT_FAILURE = 'UPDATE_RESPONDENT_FAILURE';

export const fetchRespondentsAction = (page = 1, perPage = 10) => async (dispatch) => {
  dispatch({ type: FETCH_RESPONDENTS_REQUEST, meta: { perPage } });
  try {
    // Send both per_page and limit for compatibility with backends expecting 'limit'
    const response = await api.get(`/respondents?page=${page}&per_page=${perPage}&limit=${perPage}`);
    dispatch({ type: FETCH_RESPONDENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_RESPONDENTS_FAILURE, payload: error.message });
  }
};

/**
 * Update one respondent by ID
 * @param {number|string} respondentId
 * @param {{email?:string,gender?:string,age?:number}} data
 */
export const updateRespondentAction = (respondentId, data) => async (dispatch) => {
  dispatch({ type: UPDATE_RESPONDENT_REQUEST, meta: { respondentId } });
  try {
    const res = await api.put(`/respondents/${respondentId}`, data);
    dispatch({
      type: UPDATE_RESPONDENT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: UPDATE_RESPONDENT_FAILURE,
      payload: err.message || 'Failed to update respondent',
    });
    throw err;
  }
};

