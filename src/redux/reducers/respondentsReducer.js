import {
  FETCH_RESPONDENTS_REQUEST,
  FETCH_RESPONDENTS_SUCCESS,
  FETCH_RESPONDENTS_FAILURE,
} from '../actions/respondentsActions';

const initialState = {
  respondents: [],
  loading: false,
  error: null,
  currentPage: 1, // To track the current page
  totalPages: 1, // To track total pages
  nextPage: null, // To track the next page URL
  prevPage: null, // To track the previous page URL
  perPage: 10, // Default rows per page
};

const respondentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESPONDENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RESPONDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        respondents: action.payload.data,
        currentPage: action.payload.current_page,
        totalPages: action.payload.last_page,
        nextPage: action.payload.next_page_url,
        prevPage: action.payload.prev_page_url,
        perPage: action.payload.per_page || state.perPage, // Set per_page from payload
      };
    case FETCH_RESPONDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default respondentsReducer;
