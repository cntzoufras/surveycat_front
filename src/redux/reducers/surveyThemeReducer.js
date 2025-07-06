// ========================
// src/redux/actions/themeActions.js
// ========================
import api from '@/utils/api/survey-api';

// ── Theme List ───────────────────────────────────────────────────────────────
export const FETCH_THEMES_REQUEST = 'FETCH_THEMES_REQUEST';
export const FETCH_THEMES_SUCCESS = 'FETCH_THEMES_SUCCESS';
export const FETCH_THEMES_FAIL    = 'FETCH_THEMES_FAIL';

// ── Single Theme ──────────────────────────────────────────────────────────────
export const FETCH_THEME_REQUEST  = 'FETCH_THEME_REQUEST';
export const FETCH_THEME_SUCCESS  = 'FETCH_THEME_SUCCESS';
export const FETCH_THEME_FAIL     = 'FETCH_THEME_FAIL';

// ── Theme Settings ───────────────────────────────────────────────────────────
export const FETCH_THEME_SETTINGS_REQUEST = 'FETCH_THEME_SETTINGS_REQUEST';
export const FETCH_THEME_SETTINGS_SUCCESS = 'FETCH_THEME_SETTINGS_SUCCESS';
export const FETCH_THEME_SETTINGS_FAIL    = 'FETCH_THEME_SETTINGS_FAIL';
export const UPDATE_THEME_SETTINGS_REQUEST = 'UPDATE_THEME_SETTINGS_REQUEST';
export const UPDATE_THEME_SETTINGS_SUCCESS = 'UPDATE_THEME_SETTINGS_SUCCESS';
export const UPDATE_THEME_SETTINGS_FAIL    = 'UPDATE_THEME_SETTINGS_FAIL';

// ── Variable Palettes ────────────────────────────────────────────────────────
export const FETCH_VARIABLE_PALETTES_REQUEST = 'FETCH_VARIABLE_PALETTES_REQUEST';
export const FETCH_VARIABLE_PALETTES_SUCCESS = 'FETCH_VARIABLE_PALETTES_SUCCESS';
export const FETCH_VARIABLE_PALETTES_FAIL    = 'FETCH_VARIABLE_PALETTES_FAIL';
export const UPDATE_VARIABLE_PALETTE_REQUEST = 'UPDATE_VARIABLE_PALETTE_REQUEST';
export const UPDATE_VARIABLE_PALETTE_SUCCESS = 'UPDATE_VARIABLE_PALETTE_SUCCESS';
export const UPDATE_VARIABLE_PALETTE_FAIL    = 'UPDATE_VARIABLE_PALETTE_FAIL';

// ── Thunks ───────────────────────────────────────────────────────────────────

// fetch all themes
export const fetchThemesAction = () => async dispatch => {
  dispatch({ type: FETCH_THEMES_REQUEST });
  try {
    const { data } = await api.get('/themes');
    dispatch({ type: FETCH_THEMES_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: FETCH_THEMES_FAIL, payload: err.message });
  }
};

// fetch one theme (inc. settings & palettes)
export const fetchThemeAction = themeId => async dispatch => {
  dispatch({ type: FETCH_THEME_REQUEST });
  try {
    const { data } = await api.get(`/themes/${themeId}`);
    dispatch({ type: FETCH_THEME_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FETCH_THEME_FAIL, payload: err.message });
  }
};

// fetch or update theme settings
export const fetchThemeSettingsAction = settingsId => async dispatch => {
  dispatch({ type: FETCH_THEME_SETTINGS_REQUEST });
  try {
    const { data } = await api.get(`/theme-settings/${settingsId}`);
    dispatch({ type: FETCH_THEME_SETTINGS_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: FETCH_THEME_SETTINGS_FAIL, payload: err.message });
  }
};

export const updateThemeSettingsAction = settingsObj => async dispatch => {
  dispatch({ type: UPDATE_THEME_SETTINGS_REQUEST });
  try {
    const { data } = await api.put('/theme-settings', settingsObj);
    dispatch({ type: UPDATE_THEME_SETTINGS_SUCCESS, payload: data.data });
    return data.data;
  } catch (err) {
    dispatch({ type: UPDATE_THEME_SETTINGS_FAIL, payload: err.message });
    throw err;
  }
};

// fetch or update variable palettes
export const fetchVariablePalettesAction = () => async dispatch => {
  dispatch({ type: FETCH_VARIABLE_PALETTES_REQUEST });
  try {
    const { data } = await api.get('/variable-palettes');
    dispatch({ type: FETCH_VARIABLE_PALETTES_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: FETCH_VARIABLE_PALETTES_FAIL, payload: err.message });
  }
};

export const updateVariablePaletteAction = paletteObj => async dispatch => {
  dispatch({ type: UPDATE_VARIABLE_PALETTE_REQUEST });
  try {
    const { data } = await api.put('/variable-palettes', paletteObj);
    dispatch({ type: UPDATE_VARIABLE_PALETTE_SUCCESS, payload: data.data });
    return data.data;
  } catch (err) {
    dispatch({ type: UPDATE_VARIABLE_PALETTE_FAIL, payload: err.message });
    throw err;
  }
};


// ========================
// src/redux/reducers/themeReducer.js
// ========================
import {
  FETCH_THEMES_REQUEST,
  FETCH_THEMES_SUCCESS,
  FETCH_THEMES_FAIL,
  FETCH_THEME_REQUEST,
  FETCH_THEME_SUCCESS,
  FETCH_THEME_FAIL,
  FETCH_THEME_SETTINGS_SUCCESS,
  FETCH_THEME_SETTINGS_FAIL,
  UPDATE_THEME_SETTINGS_SUCCESS,
  UPDATE_THEME_SETTINGS_FAIL,
  FETCH_VARIABLE_PALETTES_SUCCESS,
  FETCH_VARIABLE_PALETTES_FAIL,
  UPDATE_VARIABLE_PALETTE_SUCCESS,
  UPDATE_VARIABLE_PALETTE_FAIL,
} from '../actions/themeActions';

const initialState = {
  list: [],               // all themes
  current: null,          // theme + settings + palettes
  palettes: [],           // flat palette list
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

    case FETCH_THEME_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        current: state.current
          ? { ...state.current, theme_setting: action.payload }
          : state.current,
      };
    case FETCH_THEME_SETTINGS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_THEME_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        current: state.current
          ? { ...state.current, theme_setting: action.payload }
          : state.current,
      };
    case UPDATE_THEME_SETTINGS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case FETCH_VARIABLE_PALETTES_SUCCESS:
      return { ...state, loading: false, palettes: action.payload };
    case FETCH_VARIABLE_PALETTES_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_VARIABLE_PALETTE_SUCCESS:
      const updated = action.payload;
      return {
        ...state,
        loading: false,
        palettes: state.palettes.map(p => p.id === updated.id ? updated : p),
        current: state.current
          ? {
              ...state.current,
              variable_palettes: state.current.variable_palettes.map(
                p => p.id === updated.id ? updated : p
              )
            }
          : state.current,
      };
    case UPDATE_VARIABLE_PALETTE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
