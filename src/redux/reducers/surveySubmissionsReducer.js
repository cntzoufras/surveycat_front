import {
  FETCH_SUBMISSIONS_REQUEST,
  FETCH_SUBMISSIONS_SUCCESS,
  FETCH_SUBMISSIONS_FAILURE,
  FETCH_SURVEY_SUBMISSION_REQUEST,
  FETCH_SURVEY_SUBMISSION_SUCCESS,
  FETCH_SURVEY_SUBMISSION_FAILURE,
  CLEAR_SURVEY_SUBMISSION_DETAILS,
} from '../actions/surveySubmissionsActions';

const initialState = {
  survey_submissions: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  nextPage: null,
  prevPage: null,
  perPage: 10,
  selectedSubmission: null,
  loadingDetails: false,
  errorDetails: null,
};

const surveySubmissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBMISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        survey_submissions: action.payload.data,
        currentPage: action.payload.current_page,
        totalPages: action.payload.last_page,
        nextPage: action.payload.next_page_url,
        prevPage: action.payload.prev_page_url,
        perPage: action.payload.per_page || state.perPage,
      };
        case FETCH_SUBMISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SURVEY_SUBMISSION_REQUEST:
      return {
        ...state,
        loadingDetails: true,
        errorDetails: null,
      };
    case FETCH_SURVEY_SUBMISSION_SUCCESS:
      return {
        ...state,
        loadingDetails: false,
        selectedSubmission: action.payload,
      };
        case FETCH_SURVEY_SUBMISSION_FAILURE:
      return {
        ...state,
        loadingDetails: false,
                errorDetails: action.payload,
      };
    case CLEAR_SURVEY_SUBMISSION_DETAILS:
      return {
        ...state,
        selectedSubmission: null,
        loadingDetails: false,
        errorDetails: null,
      };
    default:
      return state;
  }
};

export default surveySubmissionsReducer;
