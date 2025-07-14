import api from '@/utils/api/survey-api';

export const FETCH_THEMES_REQUEST = 'FETCH_THEMES_REQUEST';
export const FETCH_THEMES_SUCCESS = 'FETCH_THEMES_SUCCESS';
export const FETCH_THEMES_FAIL = 'FETCH_THEMES_FAIL';

export const FETCH_THEME_REQUEST = 'FETCH_THEME_REQUEST';
export const FETCH_THEME_SUCCESS = 'FETCH_THEME_SUCCESS';
export const FETCH_THEME_FAIL = 'FETCH_THEME_FAIL';

// Fetch for themes list
export const fetchThemesAction = () => async (dispatch) => {
  dispatch({ type: FETCH_THEMES_REQUEST });
  try {
    const { data } = await api.get('/themes');
    dispatch({ type: FETCH_THEMES_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: FETCH_THEMES_FAIL, payload: err.message });
  }
};

// Fetch single theme (with its settings & palettes)
export const fetchThemeAction = themeId => async (dispatch) => {
  dispatch({ type: FETCH_THEME_REQUEST });
  try {
    const { data } = await api.get(`/themes/${themeId}`);
    dispatch({ type: FETCH_THEME_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FETCH_THEME_FAIL, payload: err.message });
  }
};
