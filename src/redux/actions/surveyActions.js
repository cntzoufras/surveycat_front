import api, { publicApi } from '@/utils/api/survey-api';

export const CREATE_SURVEY_QUESTION_SUCCESS = 'CREATE_SURVEY_QUESTION_SUCCESS';
export const CREATE_SURVEY_QUESTION_FAIL = 'CREATE_SURVEY_QUESTION_FAIL';
export const CREATE_SURVEY_QUESTION_CHOICES_SUCCESS = 'CREATE_SURVEY_QUESTION_CHOICES_SUCCESS';
export const CREATE_SURVEY_QUESTION_CHOICES_FAIL = 'CREATE_SURVEY_QUESTION_CHOICES_FAIL';
export const CREATE_SURVEY_SUCCESS = 'CREATE_SURVEY_SUCCESS';
export const CREATE_SURVEY_FAIL = 'CREATE_SURVEY_FAIL';
export const CREATE_SURVEY_PAGE_SUCCESS = 'CREATE_SURVEY_PAGE_SUCCESS';
export const CREATE_SURVEY_PAGE_FAIL = 'CREATE_SURVEY_PAGE_FAIL';
export const CREATE_SURVEY_RESPONSE_REQUEST = 'CREATE_SURVEY_RESPONSE_REQUEST';
export const CREATE_SURVEY_RESPONSE_SUCCESS = 'CREATE_SURVEY_RESPONSE_SUCCESS';
export const CREATE_SURVEY_RESPONSE_FAILURE = 'CREATE_SURVEY_RESPONSE_FAILURE';
export const UPDATE_SURVEY_RESPONSE_REQUEST = 'UPDATE_SURVEY_RESPONSE_REQUEST';
export const UPDATE_SURVEY_RESPONSE_SUCCESS = 'UPDATE_SURVEY_RESPONSE_SUCCESS';
export const UPDATE_SURVEY_RESPONSE_FAILURE = 'UPDATE_SURVEY_RESPONSE_FAILURE';
export const SAVE_FOLLOW_UP_REQUEST = 'SAVE_FOLLOW_UP_REQUEST';
export const SAVE_FOLLOW_UP_SUCCESS = 'SAVE_FOLLOW_UP_SUCCESS';
export const SAVE_FOLLOW_UP_FAILURE = 'SAVE_FOLLOW_UP_FAILURE';

export const ADD_SURVEY_PAGE_SUCCESS = 'ADD_SURVEY_PAGE_SUCCESS';
export const ADD_SURVEY_PAGE_FAIL = 'ADD_SURVEY_PAGE_FAIL';

export const FETCH_QUESTION_TYPES_REQUEST = 'FETCH_QUESTION_TYPES_REQUEST';
export const FETCH_QUESTION_TYPES_SUCCESS = 'FETCH_QUESTION_TYPES_SUCCESS';
export const FETCH_QUESTION_TYPES_FAILURE = 'FETCH_QUESTION_TYPES_FAILURE';

export const FETCH_SURVEY_QUESTIONS_WITH_CHOICES_REQUEST = 'FETCH_SURVEY_QUESTIONS_WITH_CHOICES_REQUEST';
export const FETCH_SURVEY_QUESTIONS_WITH_CHOICES_SUCCESS = 'FETCH_SURVEY_QUESTIONS_WITH_CHOICES_SUCCESS';
export const FETCH_SURVEY_QUESTIONS_WITH_CHOICES_FAILURE = 'FETCH_SURVEY_QUESTIONS_WITH_CHOICES_FAILURE';

export const FETCH_SINGLE_SURVEY_QUESTION_CHOICES_REQUEST = 'FETCH_SINGLE_SURVEY_QUESTION_CHOICES_REQUEST';
export const FETCH_SINGLE_SURVEY_QUESTION_CHOICES_SUCCESS = 'FETCH_SINGLE_SURVEY_QUESTION_CHOICES_SUCCESS';
export const FETCH_SINGLE_SURVEY_QUESTION_CHOICES_FAILURE = 'FETCH_SINGLE_SURVEY_QUESTION_CHOICES_FAILURE';

export const FETCH_SURVEY_CATEGORIES_SUCCESS = 'FETCH_SURVEY_CATEGORIES_SUCCESS';
export const FETCH_SURVEY_CATEGORIES_FAIL = 'FETCH_SURVEY_CATEGORIES_FAIL';
export const FETCH_SURVEY_THEMES_SUCCESS = 'FETCH_SURVEY_THEMES_SUCCESS';
export const FETCH_SURVEY_THEMES_FAIL = 'FETCH_SURVEY_THEMES_FAIL';

export const FETCH_SURVEY_QUESTIONS = 'FETCH_SURVEY_QUESTIONS';

export const FETCH_SURVEY_PAGES_SUCCESS = 'FETCH_SURVEY_PAGES_SUCCESS';
export const FETCH_SURVEY_PAGES_FAIL = 'FETCH_SURVEY_PAGES_FAIL';

export const FETCH_SURVEY_SUCCESS = 'FETCH_SURVEY_SUCCESS';
export const FETCH_SURVEY_FAIL = 'FETCH_SURVEY_FAIL';
export const FETCH_SURVEYS_SUCCESS = 'FETCH_SURVEYS_SUCCESS';
export const FETCH_SURVEYS_FAIL = 'FETCH_SURVEYS_FAIL';

export const FETCH_STOCK_SURVEYS_SUCCESS = 'FETCH_STOCK_SURVEYS_SUCCESS';
export const FETCH_STOCK_SURVEYS_FAIL = 'FETCH_STOCK_SURVEYS_FAIL';

export const UPDATE_SURVEY_TITLE_SUCCESS = 'UPDATE_SURVEY_TITLE_SUCCESS';
export const UPDATE_SURVEY_TITLE_FAIL = 'UPDATE_SURVEY_TITLE_FAIL';
export const UPDATE_SURVEY_DESCRIPTION_SUCCESS = 'UPDATE_SURVEY_DESCRIPTION_SUCCESS';
export const UPDATE_SURVEY_DESCRIPTION_FAIL = 'UPDATE_SURVEY_DESCRIPTION_FAIL';

export const UPDATE_SURVEY_PAGE_TITLE_SUCCESS = 'UPDATE_SURVEY_PAGE_TITLE_SUCCESS';
export const UPDATE_SURVEY_PAGE_TITLE_FAIL = 'UPDATE_SURVEY_PAGE_TITLE_FAIL';
export const UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS = 'UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS';
export const UPDATE_SURVEY_PAGE_DESCRIPTION_FAIL = 'UPDATE_SURVEY_PAGE_DESCRIPTION_FAIL';

export const UPDATE_SURVEY_LAYOUT_SUCCESS = 'UPDATE_SURVEY_LAYOUT_SUCCESS';
export const UPDATE_SURVEY_LAYOUT_FAIL = 'UPDATE_SURVEY_LAYOUT_FAIL';

export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';

export const DELETE_SURVEY_QUESTION_SUCCESS = 'DELETE_SURVEY_QUESTION_SUCCESS';
export const DELETE_SURVEY_QUESTION_FAIL = 'DELETE_SURVEY_QUESTION_FAIL';
export const DELETE_SURVEY_PAGE_REQUEST = 'DELETE_SURVEY_PAGE_REQUEST';
export const DELETE_SURVEY_PAGE_SUCCESS = 'DELETE_SURVEY_PAGE_SUCCESS';
export const DELETE_SURVEY_PAGE_FAILURE = 'DELETE_SURVEY_PAGE_FAILURE';

export const PUBLISH_SURVEY_SUCCESS = 'PUBLISH_SURVEY_SUCCESS';
export const PUBLISH_SURVEY_FAIL = 'PUBLISH_SURVEY_FAIL';
export const SUBMIT_SURVEY_RESPONSE_SUCCESS = 'SUBMIT_SURVEY_RESPONSE_SUCCESS';
export const SUBMIT_SURVEY_RESPONSE_FAILURE = 'SUBMIT_SURVEY_RESPONSE_FAILURE';

export const FETCH_PUBLIC_SURVEY_REQUEST = 'FETCH_PUBLIC_SURVEY_REQUEST';
export const FETCH_PUBLIC_SURVEY_SUCCESS = 'FETCH_PUBLIC_SURVEY_SUCCESS';
export const FETCH_PUBLIC_SURVEY_FAILURE = 'FETCH_PUBLIC_SURVEY_FAILURE';

// Action to load all question types
export const fetchQuestionTypesAction = () => async (dispatch) => {
  dispatch({ type: FETCH_QUESTION_TYPES_REQUEST });
  try {
    // adjust endpoint to your real question‐types URL
    const response = await api.get('/question-types');
    // assume the array is in response.data.data
    dispatch({
      type: FETCH_QUESTION_TYPES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_QUESTION_TYPES_FAILURE,
      payload: error.message || 'Failed to load question types',
    });
  }
};

export const fetchAllSurveyQuestionsWithChoices = surveyId => async (dispatch) => {
  dispatch({ type: FETCH_SURVEY_QUESTIONS_WITH_CHOICES_REQUEST });
  try {
    const response = await api.get(`/surveys/${surveyId}/questions-with-choices`);
    dispatch({ type: FETCH_SURVEY_QUESTIONS_WITH_CHOICES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SURVEY_QUESTIONS_WITH_CHOICES_FAILURE, payload: error.message });
  }
};

export const fetchSingleSurveyQuestionChoices = surveyQuestionId => async (dispatch) => {
  dispatch({ type: FETCH_SINGLE_SURVEY_QUESTION_CHOICES_REQUEST });
  try {
    const response = await api.get(`/survey-question-choices/question/${surveyQuestionId}`);
    dispatch({ type: FETCH_SINGLE_SURVEY_QUESTION_CHOICES_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_SINGLE_SURVEY_QUESTION_CHOICES_FAILURE, payload: error.message });
  }
};

export const fetchSurveyAction = surveyId => async (dispatch) => {
  try {
    const response = await api.get(`/surveys/${surveyId}/details`);
    dispatch({ type: FETCH_SURVEY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SURVEY_FAIL, payload: error.message });
  }
};

export const fetchSurveysAction = () => async (dispatch) => {
  try {
    const response = await api.get('/surveys/user');
    console.log('user surveys are: ', response.data);
    dispatch({ type: FETCH_SURVEYS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SURVEYS_FAIL, payload: error.message });
  }
};

export const fetchSurveyCategoriesAction = () => async (dispatch) => {
  try {
    const response = await api.get('/survey-categories');
    console.log('katigories einai: ', response.data.data);
    dispatch({ type: FETCH_SURVEY_CATEGORIES_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_SURVEY_CATEGORIES_FAIL, payload: error.message });
  }
};

export const fetchSurveyThemesAction = () => async (dispatch) => {
  try {
    const response = await api.get('/themes');
    dispatch({ type: FETCH_SURVEY_THEMES_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_SURVEY_THEMES_FAIL, payload: error.message });
  }
};


export const fetchSurveyPagesAction = surveyId => async (dispatch) => {
  try {
    const response = await api.get(`/surveys/${surveyId}/pages`);
    dispatch({
      type: FETCH_SURVEY_PAGES_SUCCESS,
      payload: response.data, // Assuming response.data contains the list of survey pages
    });
  } catch (error) {
    dispatch({
      type: FETCH_SURVEY_PAGES_FAIL,
      payload: error.message,
    });
  }
};

export const fetchSurveyQuestionsAction = (surveyId, surveyPageId) => async (dispatch) => {
  try {
    const response = await api.get(`/surveys/${surveyId}/pages/${surveyPageId}/questions`);
    dispatch({
      type: FETCH_SURVEY_QUESTIONS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching survey questions:', error);
  }
};

export const fetchStockSurveysAction = () => async (dispatch) => {
  try {
    const response = await api.get('/surveys/stock');
    dispatch({ type: FETCH_STOCK_SURVEYS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_STOCK_SURVEYS_FAIL, payload: error.message });
    throw error;
  }
};

export const fetchPublicSurveyBySlugAction = surveySlug => async (dispatch) => {
  try {
    const response = await publicApi.get(`/surveys/ps/${surveySlug}`);
    const survey = response.data;
    
    const surveyPages = survey.survey_pages || [];
    const surveyQuestions = surveyPages.flatMap(page => page.survey_questions || []);
    const surveyQuestionChoices = surveyQuestions.flatMap(question => question.survey_question_choices || []);
    
    dispatch({
      type: FETCH_PUBLIC_SURVEY_SUCCESS,
      payload: {
        survey,
        surveyPages,
        surveyQuestions,
        surveyQuestionChoices,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_PUBLIC_SURVEY_FAILURE,
      payload: error.message,
    });
  }
};

export const createSurveyResponseAction = (surveyId, meta) => async (dispatch) => {
  dispatch({ type: CREATE_SURVEY_RESPONSE_REQUEST });
  try {
    const response = await api.post('/survey-responses', {
      survey_id: surveyId,
      started_at: meta.started_at,
      device: meta.device,
      session_id: meta.session_id,
    });
    dispatch({
      type: CREATE_SURVEY_RESPONSE_SUCCESS,
      payload: response.data.data,
    });
    return response.data; // returns the created record
  } catch (err) {
    dispatch({
      type: CREATE_SURVEY_RESPONSE_FAILURE,
      payload: err.message,
    });
    throw err;
  }
};

export const updateSurveyResponseAction = (responseId, updates) => async (dispatch) => {
  dispatch({ type: UPDATE_SURVEY_RESPONSE_REQUEST });
  try {
    const resp = await api.patch(`/survey-responses/${responseId}`, updates);
    dispatch({
      type: UPDATE_SURVEY_RESPONSE_SUCCESS,
      payload: resp.data,
    });
    return resp.data;
  } catch (err) {
    dispatch({
      type: UPDATE_SURVEY_RESPONSE_FAILURE,
      payload: err.message,
    });
    throw err;
  }
};

export const saveFollowUpDetailsAction = (responseId, details) => async (dispatch) => {
  dispatch({ type: SAVE_FOLLOW_UP_REQUEST });
  try {
    // we simply reuse your PUT endpoint to store email + gender
    const resp = await api.put(`/survey-responses/${responseId}`, details);
    dispatch({
      type: SAVE_FOLLOW_UP_SUCCESS,
      payload: resp.data,
    });
    return resp.data;
  } catch (err) {
    dispatch({
      type: SAVE_FOLLOW_UP_FAILURE,
      payload: err.message,
    });
    throw err;
  }
};


// Action to add a new survey page
export const addSurveyPageAction = (surveyId, newPageData) => async (dispatch) => {
  try {
    const response = await api.post('/survey-pages', newPageData);
    dispatch({ type: ADD_SURVEY_PAGE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: ADD_SURVEY_PAGE_FAIL, payload: error.message });
    throw error;
  }
};

export const createSurveyAction = surveyData => async (dispatch) => {
  try {
    const response = await api.post('/surveys', surveyData);
    dispatch({ type: CREATE_SURVEY_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_FAIL, payload: error.message });
    throw error;
  }
};

export const createSurveyPageAction = surveyPageData => async (dispatch) => {
  try {
    const response = await api.post('/survey-pages', surveyPageData);
    dispatch({ type: CREATE_SURVEY_PAGE_SUCCESS, payload: response.data });
    return response.data; // Return survey page data for chaining actions
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_PAGE_FAIL, payload: error.message });
    throw error;
  }
};

// Action to create a new survey question
export const createSurveyQuestionAction = questionData => async (dispatch) => {
  try {
    const response = await api.post('/survey-questions', questionData);
    dispatch({ type: CREATE_SURVEY_QUESTION_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_QUESTION_FAIL, payload: error.message });
    throw error;
  }
};

// Action to delete a survey question
export const deleteSurveyQuestionAction = surveyQuestionId => async (dispatch) => {
  try {
    await api.delete(`/survey-questions/${surveyQuestionId}`);
    dispatch({ type: DELETE_SURVEY_QUESTION_SUCCESS, payload: surveyQuestionId });
  } catch (error) {
    dispatch({ type: DELETE_SURVEY_QUESTION_FAIL, payload: error.message });
    throw error;
  }
};

// Action to create survey question choices
export const createSurveyQuestionChoicesAction = choicesData => async (dispatch) => {
  try {
    const response = await api.post('/survey-question-choices', choicesData);
    dispatch({ type: CREATE_SURVEY_QUESTION_CHOICES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_QUESTION_CHOICES_FAIL, payload: error.message });
    throw error;
  }
};

// Action to update survey title
export const updateSurveyTitleAction = (surveyId, title) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, { title });
    dispatch({ type: UPDATE_SURVEY_TITLE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_TITLE_FAIL, payload: error.message });
    throw error;
  }
};

// Action to update survey description
export const updateSurveyDescriptionAction = (surveyId, description) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, { description });
    dispatch({ type: UPDATE_SURVEY_DESCRIPTION_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_DESCRIPTION_FAIL, payload: error.message });
    throw error;
  }
};

// Action to update survey page title
export const updateSurveyPageTitleAction = (surveyPageId, title) => async (dispatch) => {
  try {
    const response = await api.put(`/survey-pages/${surveyPageId}`, { title });
    dispatch({ type: UPDATE_SURVEY_PAGE_TITLE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_PAGE_TITLE_FAIL, payload: error.message });
    throw error;
  }
};

export const updateSurveyPageDescriptionAction = (surveyPageId, description) => async (dispatch) => {
  try {
    const response = await api.put(`/survey-pages/${surveyPageId}`, { description });
    dispatch({ type: UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_PAGE_DESCRIPTION_FAIL, payload: error.message });
    throw error;
  }
};

// Action to update survey layout
export const updateSurveyLayoutAction = (surveyId, layout, userId) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, { layout, user_id: userId });
    dispatch({ type: UPDATE_SURVEY_LAYOUT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_LAYOUT_FAIL, payload: error.message });
    throw error;
  }
};

export const deleteSurveyPageAction = (surveyId, surveyPageId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_SURVEY_PAGE_REQUEST });

  try {
    // Delete the survey page
    await api.delete(`/survey-pages/${surveyPageId}`);

    // Fetch the updated survey to get the pages after deletion
    await dispatch(fetchSurveyAction(surveyId));

    // Access the surveyPages directly from Redux state after the fetch
    const { surveyPages } = getState().survey;

    // Redirect to the page with the least sort_index if it exists
    if (surveyPages && surveyPages.length > 0) {
      console.log(`Survey pages fetched: ${JSON.stringify(surveyPages)}`);

      const leastSortIndexPage = surveyPages.reduce(
        (minPage, currentPage) => (currentPage.sort_index < minPage.sort_index ? currentPage : minPage),
        surveyPages[0],
      );

      window.location.href = `/surveys/${surveyId}/pages/${leastSortIndexPage.id}`;
    }

    // Dispatch success action for deletion
    dispatch({
      type: DELETE_SURVEY_PAGE_SUCCESS,
      payload: surveyPageId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SURVEY_PAGE_FAILURE,
      payload: error.response ? error.response.data : 'Network Error',
    });
  }
};


export const publishSurveyAction = surveyId => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}/publish`);
    dispatch({ type: PUBLISH_SURVEY_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: PUBLISH_SURVEY_FAIL, payload: error.message });
    throw error;
  }
};

export const submitSurveySubmissionAction = (surveyId, submissionData) => async (dispatch) => {
  // eslint-disable-next-line camelcase
  const { survey_response_id, ...rest } = submissionData;
  const data = JSON.stringify(rest);
  
  try {
    const response = await api.post('/survey-submissions', { 
      survey_id: surveyId, 
      // survey_response_id: submissionData.survey_response_id, 
      // eslint-disable-next-line camelcase
      survey_response_id,
      submission_data: data,
    });
    dispatch({ type: SUBMIT_SURVEY_RESPONSE_SUCCESS, payload: response.data });
    // Handle success - maybe navigate to a thank you page
    return {
      status: response.status,
      payload: response.data,
    };
  } catch (error) {
    dispatch({ type: SUBMIT_SURVEY_RESPONSE_FAILURE, payload: error.message });
    return {
      status: error.response ? error.response.status : 500,
      payload: error.message,
    };
  }
};
