import {
 combineReducers, createStore, applyMiddleware, compose, 
} from 'redux';
import thunk from 'redux-thunk';
import {
  themeReducer,
  customizerReducer,
  newOrderTableReducer,
  sidebarReducer,
  authReducer,
  roundBordersReducer,
  blocksShadowsReducer,
} from '@/redux/reducers/index';
import appConfigReducer from '@/redux/reducers/appConfigReducer';
import surveyReducer from '@/redux/reducers/surveyReducer';
import respondentsReducer from '../../redux/reducers/respondentsReducer';
import surveySubmissionsReducer from '../../redux/reducers/surveySubmissionsReducer';

const authFromSession = JSON.parse(localStorage.getItem('auth')) || { loggedIn: false, user: null };

const initialAuthState = {
  error: null,
  loggedIn: authFromSession.loggedIn,
  user: authFromSession.user,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  theme: themeReducer,
  border: roundBordersReducer,
  shadow: blocksShadowsReducer,
  appConfig: appConfigReducer,
  customizer: customizerReducer,
  newOrder: newOrderTableReducer,
  sidebar: sidebarReducer,
  auth: (state = initialAuthState, action) => authReducer(state, action),
  survey: surveyReducer,
  respondents: respondentsReducer,
  survey_submissions: surveySubmissionsReducer,
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


export default store;
