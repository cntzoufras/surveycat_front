import {
  SEARCH_REQUEST,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_FAILURE,
  CLEAR_SEARCH_RESULTS,
} from '../actions/searchActions';

const initialState = {
  loading: false,
  results: [],
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case SEARCH_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_SEARCH_RESULTS:
        return {
            ...state,
            results: [],
            error: null,
        };
    default:
      return state;
  }
};

export default searchReducer;
