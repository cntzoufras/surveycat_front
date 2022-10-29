import { handleActions } from 'redux-actions';
import {
  changeThemeToDark,
  changeThemeToLight,
} from '../actions/themeActions';

const defaultState = {
  className: 'light',
};

export default handleActions(
  {
    [changeThemeToDark]() {
      return { className: 'dark' };
    },
    [changeThemeToLight]() {
      return { className: 'light' };
    },
  },
  defaultState,
);
