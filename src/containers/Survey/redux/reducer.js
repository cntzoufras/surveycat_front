import { handleActions } from 'redux-actions';
import {
  fetchSurveyDesignDataFailure,
  fetchSurveyDesignDataRequest,
  fetchSurveyDesignDataSuccess,
  updateSurveyDesignData,
} from './actions';

const defaultState = {
  data: null,
  isFetching: false,
  error: null,
};

export default handleActions(
  {
    [fetchSurveyDesignDataRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSurveyDesignDataSuccess](state, { payload }) {
      return {
        ...state,
        data: payload,
        isFetching: false,
        error: null,
      };
    },
    [fetchSurveyDesignDataFailure](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [updateSurveyDesignData](state, { payload }) {
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
