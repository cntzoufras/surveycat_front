import {
  FETCH_SURVEY_DASHBOARD_DATA_REQUEST,
  FETCH_SURVEY_DASHBOARD_DATA_SUCCESS,
  FETCH_SURVEY_DASHBOARD_DATA_FAILURE,
  FETCH_APP_DASHBOARD_DATA_REQUEST,
  FETCH_APP_DASHBOARD_DATA_SUCCESS,
  FETCH_APP_DASHBOARD_DATA_FAILURE,
} from '../actions/dashboardActions';

const initialState = {
  surveyDashboard: {
    loading: false,
    data: null,
    error: null,
  },
  appDashboard: {
    loading: false,
    data: null,
    error: null,
  },
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEY_DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        surveyDashboard: { ...state.surveyDashboard, loading: true, error: null },
      };
    case FETCH_SURVEY_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        surveyDashboard: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case FETCH_SURVEY_DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        surveyDashboard: {
          ...state.surveyDashboard,
          loading: false,
          error: action.payload,
        },
      };
    case FETCH_APP_DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        appDashboard: { ...state.appDashboard, loading: true, error: null },
      };
    case FETCH_APP_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        appDashboard: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case FETCH_APP_DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        appDashboard: {
          ...state.appDashboard,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
  
  export default dashboardReducer;
  
