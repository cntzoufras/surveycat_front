import {
  FETCH_RESPONDENTS_REQUEST,
  FETCH_RESPONDENTS_SUCCESS,
  FETCH_RESPONDENTS_FAILURE,
  UPDATE_RESPONDENT_REQUEST,
  UPDATE_RESPONDENT_SUCCESS,
  UPDATE_RESPONDENT_FAILURE,
  RESET_RESPONDENTS,
} from '../actions/respondentsActions';

const initialState = {
  respondents: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  nextPage: null,
  prevPage: null,
  perPage: 10,
  search: '',
};

const respondentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESPONDENTS_REQUEST:
      return {
        ...state,
        loading: true,
        perPage: (action.meta && typeof action.meta.perPage === 'number')
          ? action.meta.perPage
          : state.perPage,
        search: (action.meta && typeof action.meta.search === 'string')
          ? action.meta.search
          : state.search,
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
        totalCount: action.payload.total ?? state.totalCount,
        nextPage: action.payload.next_page_url,
        prevPage: action.payload.prev_page_url,
        // Keep UI-selected perPage; do not override from payload to avoid backend defaults (e.g., 100000)
        perPage: state.perPage,
        search: state.search,
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
    case RESET_RESPONDENTS:
      return {
        ...initialState,
      };
      
    default:
      return state;
  }
};

export default respondentsReducer;
