import {
  CHANGE_THEME_TO_DARK,
  CHANGE_THEME_TO_LIGHT,
} from '../actions/themeActions';

const stored = localStorage.getItem('theme') || 'dark';

const initialState = {
  className: stored,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME_TO_DARK:
      localStorage.setItem('theme', 'dark');
      return { className: 'dark' };
    case CHANGE_THEME_TO_LIGHT:
      localStorage.setItem('theme', 'light');
      return { className: 'light' };
    default:
      return state;
  }
};

export default themeReducer;
