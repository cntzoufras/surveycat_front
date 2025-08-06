import {
    FETCH_SURVEY_DASHBOARD_DATA_REQUEST,
    FETCH_SURVEY_DASHBOARD_DATA_SUCCESS,
    FETCH_SURVEY_DASHBOARD_DATA_FAILURE,
  } from '../actions/dashboardActions';
  
  const initialState = {
    loading: false,
    data: {
        totalRespondents: 0,
        totalSurveys: 0,
        monthlySubmissions: 0,
        weeklySubmissions: 0,
        respondentsWeekly: 0,
        surveyStatusCounts: { active: 0, inactive: 0 },
        topSurveys: [],
        yearlySubmissions: [],
        surveysCompletedToday: 0,
        completionStats: {
            completed: 0,
            didNotFinish: 0,
            didNotStart: 0,
        },
    },
    error: null,
  };
  
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SURVEY_DASHBOARD_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SURVEY_DASHBOARD_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case FETCH_SURVEY_DASHBOARD_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dashboardReducer;
  
