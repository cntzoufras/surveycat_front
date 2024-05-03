import { handleActions } from 'redux-actions';
import {
  fetchSurveyListDataFailure,
  fetchSurveyListDataRequest,
  fetchSurveyListDataSuccess,
  updateSurveyListData,
} from './actions';

const defaultState = {
  data: null,
  isFetching: false,
  error: null,
};

export default handleActions(
  {
    [fetchSurveyListDataRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSurveyListDataSuccess](state, { payload }) {
      return {
        ...state,
        data: payload,
        isFetching: false,
        error: null,
      };
    },
    [fetchSurveyListDataFailure](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [updateSurveyListData](state, { payload }) {
      const dataCopy = { ...state.data };
      dataCopy.elements = payload;
      return {
        ...state,
        data: dataCopy,
        isFetching: false,
        error: null,
      };
    },
  },
  defaultState,
);
