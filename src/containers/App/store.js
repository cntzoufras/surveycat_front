import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  themeReducer,
  rtlReducer,
  customizerReducer,
  newOrderTableReducer,
  sidebarReducer,
  authReducer,
  roundBordersReducer,
  blocksShadowsReducer,
  pokemonReducer,
} from '@/redux/reducers/index';
import appConfigReducer from '@/redux/reducers/appConfigReducer';
import covidReducer from '../Maps/VectorMapWithRequestData/redux/covidReducer';
import todoReducer from '../Todo/redux/reducer';

const authFromSession = JSON.parse(localStorage.getItem('auth')) || { loggedIn: false, user: null };

const initialAuthState = {
  error: null,
  loggedIn: authFromSession.loggedIn,
  user: authFromSession.user,
};

const reducer = combineReducers({
  theme: themeReducer,
  rtl: rtlReducer,
  border: roundBordersReducer,
  shadow: blocksShadowsReducer,
  appConfig: appConfigReducer,
  customizer: customizerReducer,
  newOrder: newOrderTableReducer,
  sidebar: sidebarReducer,
  auth: (state = initialAuthState, action) => authReducer(state, action),
  covid: covidReducer,
  todo: todoReducer,
  pokemon: pokemonReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
