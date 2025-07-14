import {
  FETCH_THEMES_REQUEST,
  FETCH_THEMES_SUCCESS,
  FETCH_THEMES_FAIL,
  FETCH_THEME_REQUEST,
  FETCH_THEME_SUCCESS,
  FETCH_THEME_FAIL,
} from '../actions/surveyThemeActions';

const initialState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_THEMES_REQUEST:
    case FETCH_THEME_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_THEMES_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case FETCH_THEMES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FETCH_THEME_SUCCESS:
      return { ...state, loading: false, current: action.payload };
    case FETCH_THEME_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
