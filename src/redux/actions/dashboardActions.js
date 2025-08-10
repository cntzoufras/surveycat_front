import api, { publicApi } from '@/utils/api/survey-api';

export const FETCH_SURVEY_DASHBOARD_DATA_REQUEST = 'FETCH_SURVEY_DASHBOARD_DATA_REQUEST';
export const FETCH_SURVEY_DASHBOARD_DATA_SUCCESS = 'FETCH_SURVEY_DASHBOARD_DATA_SUCCESS';
export const FETCH_SURVEY_DASHBOARD_DATA_FAILURE = 'FETCH_SURVEY_DASHBOARD_DATA_FAILURE';

export const FETCH_APP_DASHBOARD_DATA_REQUEST = 'FETCH_APP_DASHBOARD_DATA_REQUEST';
export const FETCH_APP_DASHBOARD_DATA_SUCCESS = 'FETCH_APP_DASHBOARD_DATA_SUCCESS';
export const FETCH_APP_DASHBOARD_DATA_FAILURE = 'FETCH_APP_DASHBOARD_DATA_FAILURE';

export const FETCH_BOUNCE_RATE_REQUEST = 'FETCH_BOUNCE_RATE_REQUEST';
export const FETCH_BOUNCE_RATE_SUCCESS = 'FETCH_BOUNCE_RATE_SUCCESS';
export const FETCH_BOUNCE_RATE_FAILURE = 'FETCH_BOUNCE_RATE_FAILURE';

export const FETCH_VISITOR_SESSIONS_REQUEST = 'FETCH_VISITOR_SESSIONS_REQUEST';
export const FETCH_VISITOR_SESSIONS_SUCCESS = 'FETCH_VISITOR_SESSIONS_SUCCESS';
export const FETCH_VISITOR_SESSIONS_FAILURE = 'FETCH_VISITOR_SESSIONS_FAILURE';

export const FETCH_AUDIENCE_BY_COUNTRY_REQUEST = 'FETCH_AUDIENCE_BY_COUNTRY_REQUEST';
export const FETCH_AUDIENCE_BY_COUNTRY_SUCCESS = 'FETCH_AUDIENCE_BY_COUNTRY_SUCCESS';
export const FETCH_AUDIENCE_BY_COUNTRY_FAILURE = 'FETCH_AUDIENCE_BY_COUNTRY_FAILURE';

export const FETCH_OCCUPANCY_REQUEST = 'FETCH_OCCUPANCY_REQUEST';
export const FETCH_OCCUPANCY_SUCCESS = 'FETCH_OCCUPANCY_SUCCESS';
export const FETCH_OCCUPANCY_FAILURE = 'FETCH_OCCUPANCY_FAILURE';

export const fetchSurveyDashboardData = () => async (dispatch) => {
  dispatch({ type: FETCH_SURVEY_DASHBOARD_DATA_REQUEST });

  try {
    const response = await api.get('/dashboards/surveys');
    dispatch({
      type: FETCH_SURVEY_DASHBOARD_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SURVEY_DASHBOARD_DATA_FAILURE,
      payload: error.message,
    });
  }
};

// New analytics action creators
export const fetchBounceRate = (params = {}) => async (dispatch) => {
  dispatch({ type: FETCH_BOUNCE_RATE_REQUEST });
  try {
    const response = await api.get('/dashboards/surveys/bounce-rate', { params });
    dispatch({ type: FETCH_BOUNCE_RATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BOUNCE_RATE_FAILURE, payload: error.message || String(error) });
  }
};

export const fetchVisitorSessions = (params = {}) => async (dispatch) => {
  dispatch({ type: FETCH_VISITOR_SESSIONS_REQUEST });
  try {
    const response = await api.get('/dashboards/surveys/visitor-sessions', { params });
    dispatch({ type: FETCH_VISITOR_SESSIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_VISITOR_SESSIONS_FAILURE, payload: error.message || String(error) });
  }
};

export const fetchAudienceByCountry = (params = {}) => async (dispatch) => {
  dispatch({ type: FETCH_AUDIENCE_BY_COUNTRY_REQUEST });
  try {
    const response = await api.get('/dashboards/surveys/audience-by-country', { params });
    dispatch({ type: FETCH_AUDIENCE_BY_COUNTRY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_AUDIENCE_BY_COUNTRY_FAILURE, payload: error.message || String(error) });
  }
};

export const fetchOccupancy = (params = {}) => async (dispatch) => {
  dispatch({ type: FETCH_OCCUPANCY_REQUEST });
  try {
    const response = await api.get('/dashboards/surveys/occupancy', { params });
    dispatch({ type: FETCH_OCCUPANCY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_OCCUPANCY_FAILURE, payload: error.message || String(error) });
  }
};

export const fetchAppDashboardData = () => async (dispatch) => {
  dispatch({ type: FETCH_APP_DASHBOARD_DATA_REQUEST });

  try {
    const response = await api.get('/dashboards/app');
    dispatch({
      type: FETCH_APP_DASHBOARD_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_APP_DASHBOARD_DATA_FAILURE,
      payload: error.message,
    });
  }
};
