import  api from '@/utils/api/survey-api';

export const CREATE_SURVEY_QUESTION_SUCCESS = 'CREATE_SURVEY_QUESTION_SUCCESS';
export const CREATE_SURVEY_QUESTION_FAIL = 'CREATE_SURVEY_QUESTION_FAIL';
export const CREATE_SURVEY_QUESTION_CHOICES_SUCCESS = 'CREATE_SURVEY_QUESTION_CHOICES_SUCCESS';
export const CREATE_SURVEY_QUESTION_CHOICES_FAIL = 'CREATE_SURVEY_QUESTION_CHOICES_FAIL';

export const ADD_SURVEY_PAGE_SUCCESS = 'ADD_SURVEY_PAGE_SUCCESS';
export const ADD_SURVEY_PAGE_FAIL = 'ADD_SURVEY_PAGE_FAIL';

export const FETCH_SURVEY_QUESTIONS = 'FETCH_SURVEY_QUESTIONS';
export const FETCH_SURVEY_PAGES = 'FETCH_SURVEY_PAGES'

export const UPDATE_SURVEY_TITLE_SUCCESS = 'UPDATE_SURVEY_TITLE_SUCCESS';
export const UPDATE_SURVEY_TITLE_FAIL = 'UPDATE_SURVEY_TITLE_FAIL';
export const UPDATE_SURVEY_DESCRIPTION_SUCCESS = 'UPDATE_SURVEY_DESCRIPTION_SUCCESS';
export const UPDATE_SURVEY_DESCRIPTION_FAIL = 'UPDATE_SURVEY_DESCRIPTION_FAIL';

export const UPDATE_SURVEY_PAGE_TITLE_SUCCESS = 'UPDATE_SURVEY_PAGE_TITLE_SUCCESS';
export const UPDATE_SURVEY_PAGE_TITLE_FAIL = 'UPDATE_SURVEY_PAGE_TITLE_FAIL';
export const UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS = 'UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS';
export const UPDATE_SURVEY_PAGE_DESCRIPTION_FAIL = 'UPDATE_SURVEY_PAGE_DESCRIPTION_FAIL';

export const UPDATE_SURVEY_LAYOUT_SUCCESS = 'UPDATE_SURVEY_LAYOUT_SUCCESS'
export const UPDATE_SURVEY_LAYOUT_FAIL = 'UPDATE_SURVEY_LAYOUT_FAIL'



export const addSurveyPageAction = (surveyId, newPageData) => async (dispatch) => {
  try {
    const response = await createSurveyPage(newPageData);
    dispatch({ type: ADD_SURVEY_PAGE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: ADD_SURVEY_PAGE_FAIL, payload: error.message });
    throw error;
  }
};

export const createSurveyQuestion = questionData => async (dispatch) => {
  try {
    const response = await api.post('/survey-questions', questionData);
    dispatch({ type: CREATE_SURVEY_QUESTION_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_QUESTION_FAIL, payload: error });
    throw error;
  }
};

export const createSurveyQuestionChoices = (choicesData) => async (dispatch) => {
  try {
    const response = await api.post('/survey-question-choices', choicesData);
    dispatch({ type: CREATE_SURVEY_QUESTION_CHOICES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_QUESTION_CHOICES_FAIL, payload: error });
    throw error;
  }
};

export const fetchSurveyQuestionsAction = (surveyId, surveyPageId) => async (dispatch) => {
    try {
        const response = await api.get(`/surveys/${surveyId}/pages/${surveyPageId}/questions`);
        
        dispatch({
            type: FETCH_SURVEY_QUESTIONS,
            payload: response.data, // Assuming response.data contains the list of questions
        });
    } catch (error) {
        console.error('Error fetching survey questions:', error);
        // You can also dispatch an error action if needed
    }
};

export const updateSurveyTitleAction = (surveyId, title) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, { title });
    dispatch({ type: UPDATE_SURVEY_TITLE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_TITLE_FAIL, payload: error });
    throw error;
  }
};

export const updateSurveyDescriptionAction = (surveyId, description) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, { description });
    dispatch({ type: UPDATE_SURVEY_DESCRIPTION_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY__DESCRIPTION_FAIL, payload: error });
    throw error;
  }
};

export const updateSurveyPageTitleAction = (surveyPageId, title) => async (dispatch) => {
  try {
    const response = await api.put(`/survey-pages/${surveyPageId}`, { title });
    dispatch({ type: UPDATE_SURVEY_TITLE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_TITLE_FAIL, payload: error });
    throw error;
  }
};

export const updateSurveyPageDescriptionAction = (surveyPageId, description) => async (dispatch) => {
  try {
    const response = await api.put(`/survey-pages/${surveyPageId}`, { description });
    dispatch({ type: UPDATE_SURVEY_DESCRIPTION_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_DESCRIPTION_FAIL, payload: error });
    throw error;
  }
};

export const updateSurveyLayoutAction = (surveyId, layout) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, { layout });
    dispatch({ type: UPDATE_SURVEY_LAYOUT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_LAYOUT_FAIL, payload: error });
    throw error;
  }
};
