import api, { publicApi } from '@/utils/api/survey-api';

export const FETCH_SURVEY_DASHBOARD_DATA_REQUEST = 'FETCH_DASHBOARD_DATA_REQUEST';
export const FETCH_SURVEY_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_SURVEY_DASHBOARD_DATA_FAILURE = 'FETCH_DASHBOARD_DATA_FAILURE';
export const FETCH_APP_DASHBOARD_DATA_REQUEST = 'FETCH_DASHBOARD_DATA_REQUEST';
export const FETCH_APP_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_APP_DASHBOARD_DATA_FAILURE = 'FETCH_DASHBOARD_DATA_FAILURE';

export const fetchSurveyDashboardData = () => async (dispatch) => {
  dispatch({ type: FETCH_SURVEY_DASHBOARD_DATA_REQUEST });

  try {
    // This endpoint will be created in the next step.
    const response = await api.get('/surveys-dashboard'); 
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

export const fetchAppDashboardData = () => async (dispatch) => {
    dispatch({ type: FETCH_APP_DASHBOARD_DATA_REQUEST });
  
    try {
      const response = await api.get('/app-dashboard'); 
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
