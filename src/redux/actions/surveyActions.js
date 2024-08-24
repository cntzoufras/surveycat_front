import api from '@/utils/api/survey-api';

export const createSurveyQuestion = questionData => async (dispatch) => {
  try {
    const response = await api.post('/survey-questions', questionData);
    dispatch({ type: 'CREATE_SURVEY_QUESTION_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'CREATE_SURVEY_QUESTION_FAIL', payload: error });
    throw error;
  }
};

export const createSurveyQuestionChoices = choicesData => async (dispatch) => {
  try {
    const response = await api.post('/survey-question-choices', choicesData);
    dispatch({ type: 'CREATE_SURVEY_QUESTION_CHOICES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_SURVEY_QUESTION_CHOICES_FAIL', payload: error });
    throw error;
  }
};
