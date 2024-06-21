import { createAction } from 'redux-actions';
import api from '@/utils/apiClient';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const fetchSurveyDesignDataRequest = createAction('FETCH_SURVEY_LIST_DATA_REQUEST');
export const fetchSurveyDesignDataSuccess = createAction('FETCH_SURVEY_LIST_DATA_SUCCESS');
export const fetchSurveyDesignDataFailure = createAction('FETCH_SURVEY_LIST_DATA_FAILURE');
export const updateSurveyDesignData = createAction('UPDATE_SURVEY_LIST_DATA');

export const fetchSurveyDesignData = () => async dispatch => {
  try {
    dispatch(fetchSurveyDesignDataRequest());

    const { id } = useParams();

    const response = await axios.get(`/api/surveys/${id}`);

    dispatch({ type: 'FETCH_SURVEY_DATA_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_SURVEY_DATA_FAILURE', payload: error.message });
  }
};

const processError = (surveyElementData, error, getState) => {
  const surveyDesignCopy = getState().survey &&
    getState().survey.data &&
    getState().survey.data.elements && [...getState().survey.data.elements];
  const elementIndex = surveyDesignCopy.findIndex(e => e.data.id === surveyElementData.id);
  surveyDesignCopy[elementIndex] = {
    data: surveyElementData,
    isEdit: false,
    isFetching: false,
    error,
  };
  return surveyDesignCopy;
};

const updateSurveyElementData = (newSurveyElementData, getState) => {
  const surveyDesignCopy = [...getState().survey.data.elements];
  const elementIndex = surveyDesignCopy.findIndex(e => e.data.id === newSurveyElementData.id);
  surveyDesignCopy[elementIndex] = {
    data: newSurveyElementData,
    isEdit: false,
    isFetching: false,
    error: null,
  };
  return surveyDesignCopy;
};

export const editSurveyElement = value => async (dispatch, getState) => {
  let updatedSurveyDesign = [];

  try {
    updatedSurveyDesign = updateSurveyElementData(value, getState);
    console.log(value);
    const response = await axios.put(`/api/surveys/${value.id}`, value);
    dispatch(updateSurveyDesignData(updatedSurveyDesign));
  } catch (error) {
    updatedSurveyDesign = processError(value, error, getState);
    dispatch(updateSurveyDesignData(updatedSurveyDesign));
    console.error('Error editing survey element:', error);
    throw error;
  }
};

export const deleteSurveyElement = id => async (dispatch, getState) => {
  const surveyDataCopy = getState().survey &&
    getState().survey.data && { ...getState().survey.data };
  const surveyDesignCopy = [...surveyDataCopy.elements];
  const elementIndex = surveyDesignCopy.findIndex(e => e.data.id === id);
  surveyDesignCopy.splice(elementIndex, 1);
  dispatch(updateSurveyDesignData(surveyDesignCopy));
};

export const addSurveyElement = newElementData => async (dispatch, getState) => {
  const surveyData = getState().survey.data;
  const surveyDesignCopy = surveyData ? [...surveyData.elements] : [];
  surveyDesignCopy.unshift({
    ...newElementData,
    isEdit: false,
    isFetching: false,
    error: null,
  });

  try {
    const response = await axios.post(`http://surveycat.test/api/surveys`, surveyDesignCopy);

    dispatch(updateSurveyDesignData(surveyDesignCopy));
    console.log('dispatch : ', surveyDesignCopy);
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      console.log('API Error:', errorMessage);
    } else {
      console.error('Network Error:', error.message);
    }
  }
};


