import {
  FETCH_RESPONDENTS_REQUEST,
  FETCH_RESPONDENTS_SUCCESS,
  FETCH_RESPONDENTS_FAILURE,
  UPDATE_RESPONDENT_REQUEST,
  UPDATE_RESPONDENT_SUCCESS,
  UPDATE_RESPONDENT_FAILURE,
} from '../actions/respondentsActions';

const initialState = {
  respondents: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  nextPage: null,
  prevPage: null,
  perPage: 10,
};

const respondentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESPONDENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_RESPONDENT_REQUEST:
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
    case UPDATE_RESPONDENT_SUCCESS: {
      const updated = action.payload;
      return {
        ...state,
        loading: false,
        respondents: state.respondents.map((r) => {
          if (r.id === updated.id) {
            return updated;
          }
          return r;
        }),
      };
    }
    case UPDATE_RESPONDENT_FAILURE:
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
