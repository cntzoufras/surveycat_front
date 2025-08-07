import api, { publicApi } from '@/utils/api/survey-api';

export const CREATE_SURVEY_QUESTION_SUCCESS = 'CREATE_SURVEY_QUESTION_SUCCESS';
export const CREATE_SURVEY_QUESTION_FAILURE = 'CREATE_SURVEY_QUESTION_FAILURE';
export const CREATE_SURVEY_QUESTION_CHOICES_SUCCESS = 'CREATE_SURVEY_QUESTION_CHOICES_SUCCESS';
export const CREATE_SURVEY_QUESTION_CHOICES_FAILURE = 'CREATE_SURVEY_QUESTION_CHOICES_FAILURE';
export const CREATE_SURVEY_SUCCESS = 'CREATE_SURVEY_SUCCESS';
export const CREATE_SURVEY_FAILURE = 'CREATE_SURVEY_FAILURE';
export const CREATE_SURVEY_PAGE_SUCCESS = 'CREATE_SURVEY_PAGE_SUCCESS';
export const CREATE_SURVEY_PAGE_FAILURE = 'CREATE_SURVEY_PAGE_FAILURE';
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
export const ADD_SURVEY_PAGE_FAILURE = 'ADD_SURVEY_PAGE_FAILURE';

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
export const FETCH_SURVEY_CATEGORIES_FAILURE = 'FETCH_SURVEY_CATEGORIES_FAILURE';
export const FETCH_SURVEY_THEMES_SUCCESS = 'FETCH_SURVEY_THEMES_SUCCESS';
export const FETCH_SURVEY_THEMES_FAILURE = 'FETCH_SURVEY_THEMES_FAILURE';

export const FETCH_SURVEY_QUESTIONS = 'FETCH_SURVEY_QUESTIONS';

export const FETCH_SURVEY_PAGES_SUCCESS = 'FETCH_SURVEY_PAGES_SUCCESS';
export const FETCH_SURVEY_PAGES_FAILURE = 'FETCH_SURVEY_PAGES_FAILURE';

export const FETCH_SURVEY_SUCCESS = 'FETCH_SURVEY_SUCCESS';
export const FETCH_SURVEY_FAILURE = 'FETCH_SURVEY_FAILURE';
export const FETCH_SURVEYS_REQUEST = 'FETCH_SURVEYS_REQUEST';
export const FETCH_SURVEYS_SUCCESS = 'FETCH_SURVEYS_SUCCESS';
export const FETCH_SURVEYS_FAILURE = 'FETCH_SURVEYS_FAILURE';

export const UPDATE_SURVEY_TITLE_SUCCESS = 'UPDATE_SURVEY_TITLE_SUCCESS';
export const UPDATE_SURVEY_TITLE_FAILURE = 'UPDATE_SURVEY_TITLE_FAILURE';
export const UPDATE_SURVEY_DESCRIPTION_SUCCESS = 'UPDATE_SURVEY_DESCRIPTION_SUCCESS';
export const UPDATE_SURVEY_DESCRIPTION_FAILURE = 'UPDATE_SURVEY_DESCRIPTION_FAILURE';

export const UPDATE_SURVEY_PAGE_TITLE_SUCCESS = 'UPDATE_SURVEY_PAGE_TITLE_SUCCESS';
export const UPDATE_SURVEY_PAGE_TITLE_FAILURE = 'UPDATE_SURVEY_PAGE_TITLE_FAILURE';
export const UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS = 'UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS';
export const UPDATE_SURVEY_PAGE_DESCRIPTION_FAILURE = 'UPDATE_SURVEY_PAGE_DESCRIPTION_FAILURE';

export const UPDATE_SURVEY_LAYOUT_SUCCESS = 'UPDATE_SURVEY_LAYOUT_SUCCESS';
export const UPDATE_SURVEY_LAYOUT_FAILURE = 'UPDATE_SURVEY_LAYOUT_FAILURE';
export const UPDATE_SURVEY_THEME_SUCCESS = 'UPDATE_SURVEY_THEME_SUCCESS';
export const UPDATE_SURVEY_THEME_FAILURE = 'UPDATE_SURVEY_THEME_FAILURE';

export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';

export const DELETE_SURVEY_QUESTION_SUCCESS = 'DELETE_SURVEY_QUESTION_SUCCESS';
export const DELETE_SURVEY_QUESTION_FAILURE = 'DELETE_SURVEY_QUESTION_FAILURE';
export const DELETE_SURVEY_PAGE_REQUEST = 'DELETE_SURVEY_PAGE_REQUEST';
export const DELETE_SURVEY_PAGE_SUCCESS = 'DELETE_SURVEY_PAGE_SUCCESS';
export const DELETE_SURVEY_PAGE_FAILURE = 'DELETE_SURVEY_PAGE_FAILURE';

export const DELETE_SURVEY_REQUEST = 'DELETE_SURVEY_REQUEST';
export const DELETE_SURVEY_SUCCESS = 'DELETE_SURVEY_SUCCESS';
export const DELETE_SURVEY_FAILURE = 'DELETE_SURVEY_FAILURE';

export const PUBLISH_SURVEY_SUCCESS = 'PUBLISH_SURVEY_SUCCESS';
export const PUBLISH_SURVEY_FAILURE = 'PUBLISH_SURVEY_FAILURE';
export const PREVIEW_SURVEY_SUCCESS = 'PREVIEW_SURVEY_SUCCESS';
export const PREVIEW_SURVEY_FAILURE = 'PREVIEW_SURVEY_FAILURE';
export const SUBMIT_SURVEY_RESPONSE_SUCCESS = 'SUBMIT_SURVEY_RESPONSE_SUCCESS';
export const SUBMIT_SURVEY_RESPONSE_FAILURE = 'SUBMIT_SURVEY_RESPONSE_FAILURE';

export const FETCH_PUBLIC_SURVEY_REQUEST = 'FETCH_PUBLIC_SURVEY_REQUEST';
export const FETCH_PUBLIC_SURVEY_SUCCESS = 'FETCH_PUBLIC_SURVEY_SUCCESS';
export const FETCH_PUBLIC_SURVEY_FAILURE = 'FETCH_PUBLIC_SURVEY_FAILURE';

export const FETCH_PROFILE_SURVEY_WIDGET_DATA_REQUEST = 'FETCH_PROFILE_SURVEY_WIDGET_DATA_REQUEST';
export const FETCH_PROFILE_SURVEY_WIDGET_DATA_SUCCESS = 'FETCH_PROFILE_SURVEY_WIDGET_DATA_SUCCESS';
export const FETCH_PROFILE_SURVEY_WIDGET_DATA_FAILURE = 'FETCH_PROFILE_SURVEY_WIDGET_DATA_FAILURE';

export const SAVE_QUESTION_ORDER_REQUEST = 'SAVE_QUESTION_ORDER_REQUEST';
export const SAVE_QUESTION_ORDER_SUCCESS = 'SAVE_QUESTION_ORDER_SUCCESS';
export const SAVE_QUESTION_ORDER_FAILURE = 'SAVE_QUESTION_ORDER_FAILURE';

export const SET_QUESTION_ORDER_LOCALLY = 'SET_QUESTION_ORDER_LOCALLY';

// Custom theme management constants
export const CREATE_CUSTOM_THEME_REQUEST = 'CREATE_CUSTOM_THEME_REQUEST';
export const CREATE_CUSTOM_THEME_SUCCESS = 'CREATE_CUSTOM_THEME_SUCCESS';
export const CREATE_CUSTOM_THEME_FAILURE = 'CREATE_CUSTOM_THEME_FAILURE';

export const UPDATE_CUSTOM_THEME_REQUEST = 'UPDATE_CUSTOM_THEME_REQUEST';
export const UPDATE_CUSTOM_THEME_SUCCESS = 'UPDATE_CUSTOM_THEME_SUCCESS';
export const UPDATE_CUSTOM_THEME_FAILURE = 'UPDATE_CUSTOM_THEME_FAILURE';

export const DELETE_CUSTOM_THEME_REQUEST = 'DELETE_CUSTOM_THEME_REQUEST';
export const DELETE_CUSTOM_THEME_SUCCESS = 'DELETE_CUSTOM_THEME_SUCCESS';
export const DELETE_CUSTOM_THEME_FAILURE = 'DELETE_CUSTOM_THEME_FAILURE';

export const RESET_TO_BASE_THEME_REQUEST = 'RESET_TO_BASE_THEME_REQUEST';
export const RESET_TO_BASE_THEME_SUCCESS = 'RESET_TO_BASE_THEME_SUCCESS';
export const RESET_TO_BASE_THEME_FAILURE = 'RESET_TO_BASE_THEME_FAILURE';

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
    dispatch({ type: FETCH_SURVEY_FAILURE, payload: error.message });
  }
};

export const fetchSurveysAction = () => async (dispatch) => {
  dispatch({ type: FETCH_SURVEYS_REQUEST });
  try {
    const response = await api.get('/surveys/user');
    console.log('user surveys are: ', response.data);
    dispatch({ type: FETCH_SURVEYS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SURVEYS_FAILURE, payload: error.message });
  }
};

export const fetchProfileSurveyWidgetDataAction = () => async (dispatch) => {
  // 1. Dispatch REQUEST to set loading to true
  dispatch({ type: FETCH_PROFILE_SURVEY_WIDGET_DATA_REQUEST });

  try {
    const response = await api.get('/surveys/count');
    // 2. On success, dispatch SUCCESS with the data
    dispatch({
      type: FETCH_PROFILE_SURVEY_WIDGET_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // 3. On failure, dispatch FAILURE with the error
    dispatch({
      type: FETCH_PROFILE_SURVEY_WIDGET_DATA_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchSurveyCategoriesAction = () => async (dispatch) => {
  try {
    const response = await api.get('/survey-categories');
    console.log('katigories einai: ', response.data.data);
    dispatch({ type: FETCH_SURVEY_CATEGORIES_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_SURVEY_CATEGORIES_FAILURE, payload: error.message });
  }
};

export const fetchSurveyThemesAction = () => async (dispatch) => {
  try {
    const response = await api.get('/themes');
    dispatch({ type: FETCH_SURVEY_THEMES_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_SURVEY_THEMES_FAILURE, payload: error.message });
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
      type: FETCH_SURVEY_PAGES_FAILURE,
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
    dispatch({ type: ADD_SURVEY_PAGE_FAILURE, payload: error.message });
    throw error;
  }
};

export const createSurveyAction = surveyData => async (dispatch) => {
  try {
    const response = await api.post('/surveys', surveyData);
    dispatch({ type: CREATE_SURVEY_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_FAILURE, payload: error.message });
    throw error;
  }
};

export const createSurveyPageAction = surveyPageData => async (dispatch) => {
  try {
    const response = await api.post('/survey-pages', surveyPageData);
    dispatch({ type: CREATE_SURVEY_PAGE_SUCCESS, payload: response.data });
    return response.data; // Return survey page data for chaining actions
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_PAGE_FAILURE, payload: error.message });
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
    dispatch({ type: CREATE_SURVEY_QUESTION_FAILURE, payload: error.message });
    throw error;
  }
};

// Action to delete a survey question
export const deleteSurveyQuestionAction = surveyQuestionId => async (dispatch) => {
  try {
    await api.delete(`/survey-questions/${surveyQuestionId}`);
    dispatch({ type: DELETE_SURVEY_QUESTION_SUCCESS, payload: surveyQuestionId });
  } catch (error) {
    dispatch({ type: DELETE_SURVEY_QUESTION_FAILURE, payload: error.message });
    throw error;
  }
};

// Action to create survey question choices
export const createSurveyQuestionChoicesAction = choicesData => async (dispatch) => {
  try {
    const response = await api.post('/survey-question-choices', choicesData);
    dispatch({ type: CREATE_SURVEY_QUESTION_CHOICES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_SURVEY_QUESTION_CHOICES_FAILURE, payload: error.message });
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
    dispatch({ type: UPDATE_SURVEY_TITLE_FAILURE, payload: error.message });
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
    dispatch({ type: UPDATE_SURVEY_DESCRIPTION_FAILURE, payload: error.message });
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
    dispatch({ type: UPDATE_SURVEY_PAGE_TITLE_FAILURE, payload: error.message });
    throw error;
  }
};

export const updateSurveyPageDescriptionAction = (surveyPageId, description) => async (dispatch) => {
  try {
    const response = await api.put(`/survey-pages/${surveyPageId}`, { description });
    dispatch({ type: UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_PAGE_DESCRIPTION_FAILURE, payload: error.message });
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
    dispatch({ type: UPDATE_SURVEY_LAYOUT_FAILURE, payload: error.message });
    throw error;
  }
};

// Action to update survey theme
// Action to update survey's custom theme settings
export const updateSurveyCustomThemeAction = (surveyId, customThemeSettings, userId) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, { 
      custom_theme_settings: customThemeSettings,
      user_id: userId, 
    });
    dispatch({ type: UPDATE_SURVEY_THEME_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_THEME_FAILURE, payload: error.message });
    throw error;
  }
};

export const updateSurveyThemeAction = (surveyId, themeId, userId) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, { theme_id: themeId, user_id: userId });
    dispatch({ type: UPDATE_SURVEY_THEME_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_SURVEY_THEME_FAILURE, payload: error.message });
    throw error;
  }
};

// Custom theme management actions
export const createCustomThemeAction = themeData => async (dispatch) => {
  try {
    const response = await api.post('/themes', themeData);
    dispatch({ type: CREATE_CUSTOM_THEME_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: CREATE_CUSTOM_THEME_FAILURE, payload: error.message });
    throw error;
  }
};

export const updateCustomThemeAction = (themeId, themeData) => async (dispatch) => {
  try {
    const response = await api.put(`/themes/${themeId}`, themeData);
    dispatch({ type: UPDATE_CUSTOM_THEME_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOM_THEME_FAILURE, payload: error.message });
    throw error;
  }
};

export const deleteCustomThemeAction = themeId => async (dispatch) => {
  try {
    await api.delete(`/themes/${themeId}`);
    dispatch({ type: DELETE_CUSTOM_THEME_SUCCESS, payload: themeId });
    return themeId;
  } catch (error) {
    dispatch({ type: DELETE_CUSTOM_THEME_FAILURE, payload: error.message });
    throw error;
  }
};

export const resetToBaseThemeAction = (surveyId, baseThemeId) => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}`, {
      theme_id: baseThemeId,
      custom_theme_id: null,
    });
    dispatch({ type: RESET_TO_BASE_THEME_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: RESET_TO_BASE_THEME_FAILURE, payload: error.message });
    throw error;
  }
};

export const deleteSurveyAction = surveyId => async (dispatch) => {
  dispatch({ type: DELETE_SURVEY_REQUEST });

  try {
    await api.delete(`/surveys/${surveyId}`);

    dispatch({
      type: DELETE_SURVEY_SUCCESS,
      payload: surveyId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SURVEY_FAILURE,
      payload: error.response?.data?.message || 'Failed to delete survey',
    });
    
    throw error;
  }
};

export const deleteSurveyPageAction = (surveyId, surveyPageId) => async (dispatch) => {
  dispatch({ type: DELETE_SURVEY_PAGE_REQUEST });

  try {
    // 1. Delete the survey page via the API
    await api.delete(`/survey-pages/${surveyPageId}`);

    // 2. IMPORTANT: Re-fetch the entire survey to get the updated list of pages
    await dispatch(fetchSurveyAction(surveyId));

    // 3. Dispatch success for the page deletion itself
    dispatch({
        type: DELETE_SURVEY_PAGE_SUCCESS,
        payload: surveyPageId,
      });
  } catch (error) {
    dispatch({
      type: DELETE_SURVEY_PAGE_FAILURE,
      payload: error.response ? error.response.data : 'Network Error',
    });
    // Let the component know the action failed
    throw error;
  }
};

export const publishSurveyAction = surveyId => async (dispatch) => {
  try {
    const response = await api.put(`/surveys/${surveyId}/publish`);
    dispatch({ type: PUBLISH_SURVEY_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: PUBLISH_SURVEY_FAILURE, payload: error.message });
    throw error;
  }
};

export const previewSurveyAction = surveyId => async (dispatch) => {
  const response = await api.put(`/surveys/${surveyId}/preview`);
  const survey = response.data;
  const surveyPages = survey.survey_pages || [];
  const surveyQuestions = surveyPages.flatMap(p => p.survey_questions || []);
  const surveyQuestionChoices = surveyQuestions.flatMap(q => q.survey_question_choices || []);

  dispatch({
    type: FETCH_PUBLIC_SURVEY_SUCCESS,
    payload: { 
      survey, 
      surveyPages, 
      surveyQuestions, 
      surveyQuestionChoices,
    },
  });

  return response.data;
};



export const submitSurveySubmissionAction = (surveyId, submissionData) => async (dispatch) => {
  // eslint-disable-next-line camelcase
  const { survey_response_id, ...rest } = submissionData;
  
  
  try {
    const response = await api.post('/survey-submissions', { 
      survey_id: surveyId, 
      // survey_response_id: submissionData.survey_response_id, 
      // eslint-disable-next-line camelcase
      survey_response_id,
      submission_data: rest,
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

export const reorderQuestionsAction = (surveyPageId, orderedQuestions) => async (dispatch) => {
  dispatch({
    type: SET_QUESTION_ORDER_LOCALLY,
    payload: {
      surveyPageId,
      questions: orderedQuestions,
    },
  });

  dispatch({ type: SAVE_QUESTION_ORDER_REQUEST });
  try {
    const payloadToServer = orderedQuestions.map((q, index) => ({
      id: q.id,
      sort_index: index,
    }));

    await api.post(`/survey-pages/${surveyPageId}/questions/reorder`, {
      questions: payloadToServer,
    });

    dispatch({ type: SAVE_QUESTION_ORDER_SUCCESS });
  } catch (err) {
    dispatch({
      type: SAVE_QUESTION_ORDER_FAILURE,
      payload: err.message,
    });
  }
};

