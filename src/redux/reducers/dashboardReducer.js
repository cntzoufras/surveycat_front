import {
  FETCH_SURVEY_DASHBOARD_DATA_REQUEST,
  FETCH_SURVEY_DASHBOARD_DATA_SUCCESS,
  FETCH_SURVEY_DASHBOARD_DATA_FAILURE,
  FETCH_APP_DASHBOARD_DATA_REQUEST,
  FETCH_APP_DASHBOARD_DATA_SUCCESS,
  FETCH_APP_DASHBOARD_DATA_FAILURE,
  FETCH_BOUNCE_RATE_REQUEST,
  FETCH_BOUNCE_RATE_SUCCESS,
  FETCH_BOUNCE_RATE_FAILURE,
  FETCH_VISITOR_SESSIONS_REQUEST,
  FETCH_VISITOR_SESSIONS_SUCCESS,
  FETCH_VISITOR_SESSIONS_FAILURE,
  FETCH_AUDIENCE_BY_COUNTRY_REQUEST,
  FETCH_AUDIENCE_BY_COUNTRY_SUCCESS,
  FETCH_AUDIENCE_BY_COUNTRY_FAILURE,
  FETCH_OCCUPANCY_REQUEST,
  FETCH_OCCUPANCY_SUCCESS,
  FETCH_OCCUPANCY_FAILURE,
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
  surveysAnalytics: {
    bounceRate: { loading: false, data: null, error: null },
    visitorSessions: { loading: false, data: null, error: null },
    audienceByCountry: { loading: false, data: null, error: null },
    occupancy: { loading: false, data: null, error: null },
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
    // Analytics: Bounce Rate
    case FETCH_BOUNCE_RATE_REQUEST:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          bounceRate: { loading: true, data: null, error: null },
        },
      };
    case FETCH_BOUNCE_RATE_SUCCESS:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          bounceRate: { loading: false, data: action.payload, error: null },
        },
      };
    case FETCH_BOUNCE_RATE_FAILURE:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          bounceRate: { loading: false, data: null, error: action.payload },
        },
      };
    // Analytics: Visitor Sessions
    case FETCH_VISITOR_SESSIONS_REQUEST:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          visitorSessions: { loading: true, data: null, error: null },
        },
      };
    case FETCH_VISITOR_SESSIONS_SUCCESS:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          visitorSessions: { loading: false, data: action.payload, error: null },
        },
      };
    case FETCH_VISITOR_SESSIONS_FAILURE:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          visitorSessions: { loading: false, data: null, error: action.payload },
        },
      };
    // Analytics: Audience by Country
    case FETCH_AUDIENCE_BY_COUNTRY_REQUEST:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          audienceByCountry: { loading: true, data: null, error: null },
        },
      };
    case FETCH_AUDIENCE_BY_COUNTRY_SUCCESS:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          audienceByCountry: { loading: false, data: action.payload, error: null },
        },
      };
    case FETCH_AUDIENCE_BY_COUNTRY_FAILURE:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          audienceByCountry: { loading: false, data: null, error: action.payload },
        },
      };
    // Analytics: Occupancy
    case FETCH_OCCUPANCY_REQUEST:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          occupancy: { loading: true, data: null, error: null },
        },
      };
    case FETCH_OCCUPANCY_SUCCESS:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          occupancy: { loading: false, data: action.payload, error: null },
        },
      };
    case FETCH_OCCUPANCY_FAILURE:
      return {
        ...state,
        surveysAnalytics: {
          ...state.surveysAnalytics,
          occupancy: { loading: false, data: null, error: action.payload },
        },
      };
    default:
      return state;
  }
};
  
  export default dashboardReducer;
  
