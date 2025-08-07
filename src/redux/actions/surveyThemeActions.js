import api from '@/utils/api/survey-api';

export const FETCH_THEMES_REQUEST = 'FETCH_THEMES_REQUEST';
export const FETCH_THEMES_SUCCESS = 'FETCH_THEMES_SUCCESS';
export const FETCH_THEMES_FAILURE = 'FETCH_THEMES_FAILURE';

export const FETCH_THEME_REQUEST = 'FETCH_THEME_REQUEST';
export const FETCH_THEME_SUCCESS = 'FETCH_THEME_SUCCESS';
export const FETCH_THEME_FAILURE = 'FETCH_THEME_FAILURE';

// Fetch for themes list
export const fetchThemesAction = () => async (dispatch) => {
  dispatch({ type: FETCH_THEMES_REQUEST });
  try {
    const { data } = await api.get('/themes');
    dispatch({ type: FETCH_THEMES_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: FETCH_THEMES_FAILURE, payload: err.message });
  }
};

// Fetch single theme (with its settings & palettes)
export const fetchThemeAction = themeId => async (dispatch) => {
  dispatch({ type: FETCH_THEME_REQUEST });
  try {
    const response = await api.get(`/themes/${themeId}`);
    const themeData = response.data?.data || response.data;
    console.log('fetchThemeAction: Received theme data:', themeData);
    
    // Ensure theme has proper structure with theme_setting
    const processedTheme = {
      ...themeData,
      theme_setting: themeData.theme_setting || themeData.theme_setting || null,
    };
    
    dispatch({ type: FETCH_THEME_SUCCESS, payload: processedTheme });
  } catch (err) {
    console.error('fetchThemeAction: Error fetching theme:', err);
    dispatch({ type: FETCH_THEME_FAILURE, payload: err.message });
  }
};
