import {
  FETCH_SUBMISSIONS_REQUEST,
  FETCH_SUBMISSIONS_SUCCESS,
  FETCH_SUBMISSIONS_FAILURE,
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
    default:
      return state;
  }
};

export default surveySubmissionsReducer;
