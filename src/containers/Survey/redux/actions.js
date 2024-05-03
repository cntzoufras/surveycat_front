import { createAction } from 'redux-actions';
import api from '@/utils/apiClient';

export const fetchSurveyListDataRequest = createAction('FETCH_SURVEY_LIST_DATA_REQUEST');
export const fetchSurveyListDataSuccess = createAction('FETCH_SURVEY_LIST_DATA_SUCCESS');
export const fetchSurveyListDataFailure = createAction('FETCH_SURVEY_LIST_DATA_FAILURE');
export const updateSurveyListData = createAction('UPDATE_SURVEY_LIST_DATA');

export const fetchSurveyListData = () => async (dispatch) => {
  try {
    dispatch(fetchSurveyListDataRequest());
    const response = await api.survey.getSurveyData(); // Fake request example
    const surveyListData = response.data;
    dispatch(fetchSurveyListDataSuccess(surveyListData));
  } catch (error) {
    dispatch(fetchSurveyListDataFailure({ error }));
    throw error;
  }
};

const processError = (surveyElementData, error, getState) => {
  const surveyListCopy = getState().survey && getState().survey.data && getState().survey.data.elements
    && [...getState().survey.data.elements];
  const elementIndex = surveyListCopy.findIndex(e => e.data.id === surveyElementData.id);
  surveyListCopy[elementIndex] = {
    data: surveyElementData,
    isEdit: false,
    isFetching: false,
    error,
  };
  return surveyListCopy;
};

const updateSurveyElementData = (newSurveyElementData, getState) => {
  const surveyListCopy = [...getState().survey.data.elements];
  const elementIndex = surveyListCopy.findIndex(e => e.data.id === newSurveyElementData.id);
  surveyListCopy[elementIndex] = {
    data: newSurveyElementData,
    isEdit: false,
    isFetching: false,
    error: null,
  };
  return surveyListCopy;
};

export const editSurveyElement = value => async (dispatch, getState) => {
  let updatedSurveyList = [];
  try {
    updatedSurveyList = updateSurveyElementData(value, getState);
    dispatch(updateSurveyListData(updatedSurveyList));
  } catch (error) {
    updatedSurveyList = processError(value, error, getState);
    dispatch(updateSurveyListData(updatedSurveyList));
    throw error;
  }
};

export const deleteSurveyElement = id => async (dispatch, getState) => {
  const surveyDataCopy = getState().survey && getState().survey.data && { ...getState().survey.data };
  const surveyListCopy = [...surveyDataCopy.elements];
  const elementIndex = surveyListCopy.findIndex(e => e.data.id === id);
  surveyListCopy.splice(elementIndex, 1);
  dispatch(updateSurveyListData(surveyListCopy));
};

export const addSurveyElement = newElementData => async (dispatch, getState) => {
  const surveyDataCopy = getState().survey && getState().survey.data && { ...getState().survey.data };
  const surveyListCopy = [...surveyDataCopy.elements];
  surveyListCopy.unshift({
    data: {
      ...newElementData,
    },
    isEdit: false, // maybe you will need to make it true, depends on your logic
    isFetching: false,
    error: null,
  });
  dispatch(updateSurveyListData(surveyListCopy));
};
