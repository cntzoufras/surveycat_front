import {
  FETCH_SURVEY_SUCCESS,
  FETCH_SURVEY_FAILURE,
  FETCH_SURVEYS_REQUEST,
  FETCH_SURVEYS_SUCCESS,
  FETCH_SURVEYS_FAILURE,
  FETCH_SURVEY_QUESTIONS,
  FETCH_SURVEY_PAGES_SUCCESS,
  FETCH_SURVEY_PAGES_FAILURE,
  FETCH_QUESTION_TYPES_REQUEST,
  FETCH_QUESTION_TYPES_SUCCESS,
  FETCH_QUESTION_TYPES_FAILURE,
  CREATE_SURVEY_QUESTION_SUCCESS,
  CREATE_SURVEY_QUESTION_FAILURE,
  CREATE_SURVEY_QUESTION_CHOICES_SUCCESS,
  CREATE_SURVEY_QUESTION_CHOICES_FAILURE,
  CREATE_SURVEY_SUCCESS,
  CREATE_SURVEY_FAILURE,
  CREATE_SURVEY_PAGE_SUCCESS,
  CREATE_SURVEY_PAGE_FAILURE,
  ADD_SURVEY_PAGE_SUCCESS,
  ADD_SURVEY_PAGE_FAILURE,
  CREATE_SURVEY_RESPONSE_REQUEST,
  CREATE_SURVEY_RESPONSE_SUCCESS,
  CREATE_SURVEY_RESPONSE_FAILURE,
  UPDATE_SURVEY_RESPONSE_REQUEST,
  UPDATE_SURVEY_RESPONSE_SUCCESS,
  UPDATE_SURVEY_RESPONSE_FAILURE,
  SAVE_FOLLOW_UP_REQUEST,
  SAVE_FOLLOW_UP_SUCCESS,
  SAVE_FOLLOW_UP_FAILURE,
  FETCH_SURVEY_CATEGORIES_SUCCESS,
  FETCH_SURVEY_CATEGORIES_FAILURE,
  FETCH_SURVEY_THEMES_SUCCESS,
  FETCH_SURVEY_THEMES_FAILURE,
  UPDATE_SURVEY_TITLE_SUCCESS,
  UPDATE_SURVEY_TITLE_FAILURE,
  UPDATE_SURVEY_DESCRIPTION_SUCCESS,
  UPDATE_SURVEY_DESCRIPTION_FAILURE,
  UPDATE_SURVEY_PAGE_TITLE_SUCCESS,
  UPDATE_SURVEY_PAGE_TITLE_FAILURE,
  UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS,
  UPDATE_SURVEY_PAGE_DESCRIPTION_FAILURE,
  UPDATE_SURVEY_LAYOUT_SUCCESS,
  UPDATE_SURVEY_LAYOUT_FAILURE,
  UPDATE_QUESTIONS,
  DELETE_SURVEY_QUESTION_SUCCESS,
  DELETE_SURVEY_QUESTION_FAILURE,
  DELETE_SURVEY_REQUEST,
  DELETE_SURVEY_SUCCESS,
  DELETE_SURVEY_FAILURE,
  DELETE_SURVEY_PAGE_REQUEST,
  DELETE_SURVEY_PAGE_SUCCESS,
  DELETE_SURVEY_PAGE_FAILURE,
  PUBLISH_SURVEY_SUCCESS,
  PUBLISH_SURVEY_FAILURE,
  PREVIEW_SURVEY_SUCCESS,
  PREVIEW_SURVEY_FAILURE,
  SUBMIT_SURVEY_RESPONSE_SUCCESS,
  SUBMIT_SURVEY_RESPONSE_FAILURE,
  FETCH_SINGLE_SURVEY_QUESTION_CHOICES_REQUEST,
  FETCH_SINGLE_SURVEY_QUESTION_CHOICES_SUCCESS,
  FETCH_SINGLE_SURVEY_QUESTION_CHOICES_FAILURE,
  FETCH_SURVEY_QUESTIONS_WITH_CHOICES_REQUEST,
  FETCH_SURVEY_QUESTIONS_WITH_CHOICES_SUCCESS,
  FETCH_SURVEY_QUESTIONS_WITH_CHOICES_FAILURE,
  FETCH_PUBLIC_SURVEY_REQUEST,
  FETCH_PUBLIC_SURVEY_SUCCESS,
  FETCH_PUBLIC_SURVEY_FAILURE,
  FETCH_PROFILE_SURVEY_WIDGET_DATA_REQUEST,
  FETCH_PROFILE_SURVEY_WIDGET_DATA_SUCCESS,
  FETCH_PROFILE_SURVEY_WIDGET_DATA_FAILURE,
  SET_QUESTION_ORDER_LOCALLY,
  SAVE_QUESTION_ORDER_REQUEST,
  SAVE_QUESTION_ORDER_SUCCESS,
  SAVE_QUESTION_ORDER_FAILURE,
} from '../actions/surveyActions';

const initialState = {
  surveyQuestionChoices: [], // An array to hold choices for questions
  surveyResponses: [],
  loading: false, // Indicates if any async operation is in progress
  submitError: null,
  surveys: [],
  survey: null, // Holds the current survey's main details like title, description, etc.
  surveyCategories: [],
  surveyThemes: [],
  surveyPage: null, // Holds the current survey page details like title, description, etc.
  surveyPages: [], // Holds all pages related to a survey
  questions: [], // Holds questions related to the current survey page
  survey_question_choices: [], // Holds the choices related to the current questions
  layout: 'default', // Tracks layout settings for the survey
  error: null, // Holds any error messages encountered during operations
  isPublished: false, // Tracks whether the survey is published,
    // New state for public-facing surveys
  publicSurvey: null, // Holds the public survey's main details (title, description, etc.)
  publicSurveyPages: [], // Holds all pages of the public survey
  publicSurveyQuestions: [], // Holds all questions of the public survey
  publicSurveyQuestionChoices: [], // Holds the choices related to public survey questions
  questionTypes: [],
  questionTypesLoading: false,
  questionTypesError: null,
  creatingSurveyResponse: false,
  currentSurveyResponse: null,
  createSurveyResponseError: null,
  updatingSurveyResponse: false,
  updateSurveyResponseError: null,
  responseRecord: null,
  profileSurveyWidget: {
    loading: false,
    data: {
      surveys_count: 0,
      submissions_count: 0,
    },
    error: null,
  },
  loadingResponse: false,
  responseError: null,
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SURVEYS_SUCCESS:
      return {
        ...state,
        loading: false,
        surveys: Array.isArray(action.payload?.data)
          ? action.payload.data
          : (Array.isArray(action.payload) ? action.payload : state.surveys),
        error: null,
      };
    case FETCH_SURVEYS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_SURVEY_RESPONSE_REQUEST:
      return { ...state, creatingSurveyResponse: true, createSurveyResponseError: null };
    case CREATE_SURVEY_RESPONSE_SUCCESS:
      return { ...state, creatingSurveyResponse: false, currentSurveyResponse: action.payload };
    case CREATE_SURVEY_RESPONSE_FAILURE:
      return { ...state, creatingSurveyResponse: false, createSurveyResponseError: action.payload };    
    case UPDATE_SURVEY_RESPONSE_REQUEST:
      return { ...state, updatingSurveyResponse: true, updateSurveyResponseError: null };
    case UPDATE_SURVEY_RESPONSE_SUCCESS:
      return { 
        ...state, 
        updatingSurveyResponse: false, 
        currentSurveyResponse: action.payload,
      };
    case UPDATE_SURVEY_RESPONSE_FAILURE:
      return { 
        ...state, 
        updatingSurveyResponse: false, 
        updateSurveyResponseError: action.payload, 
      };
    case SAVE_FOLLOW_UP_REQUEST:
      return {
        ...state,
        loadingResponse: true,
        responseError: null,
      };

    case SAVE_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        loadingResponse: false,
        // pull in the updated record (with email+gender)
        responseRecord: action.payload,
      };

    case SAVE_FOLLOW_UP_FAILURE:
      return {
        ...state,
        loadingResponse: false,
        responseError: action.payload,
      };

    case CREATE_SURVEY_SUCCESS:
      return {
        ...state,
        survey: action.payload,
        error: null,
      };
    case CREATE_SURVEY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_SURVEY_PAGE_SUCCESS:
      return {
        ...state,
        surveyPages: [...state.surveyPages, action.payload],
        error: null,
      };
    case CREATE_SURVEY_PAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_SURVEY_PAGE_SUCCESS:
      return {
        ...state,
        surveyPages: [...state.surveyPages, action.payload],
        error: null,
      };
    case ADD_SURVEY_PAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_PROFILE_SURVEY_WIDGET_DATA_REQUEST:
      return {
        ...state,
        profileSurveyWidget: {
          ...state.profileSurveyWidget,
          loading: true,
          error: null, // Clear previous errors
        },
      };
    case FETCH_PROFILE_SURVEY_WIDGET_DATA_SUCCESS:
      return {
        ...state,
        profileSurveyWidget: {
          loading: false,
          data: action.payload, // The payload is { surveys_count, submissions_count }
          error: null,
        },
      };

    case FETCH_PROFILE_SURVEY_WIDGET_DATA_FAILURE:
      return {
        ...state,
        profileSurveyWidget: {
          ...state.profileSurveyWidget,
          loading: false,
          error: action.payload, // The payload is the error message
        },
      };
    case FETCH_QUESTION_TYPES_REQUEST:
      return {
        ...state,
        questionTypesLoading: true,
        questionTypesError: null,
      };

    case FETCH_QUESTION_TYPES_SUCCESS:
      return {
        ...state,
        questionTypesLoading: false,
        questionTypes: action.payload,
      };

    case FETCH_QUESTION_TYPES_FAILURE:
      return {
        ...state,
        questionTypesLoading: false,
        questionTypesError: action.payload,
      };
    case FETCH_SURVEYS_SUCCESS:
      return {
        ...state,
        surveys: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SURVEYS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FETCH_SURVEY_SUCCESS:
      return {
        ...state,
        survey: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SURVEY_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FETCH_SURVEY_CATEGORIES_SUCCESS:
      return {
        ...state,
        surveyCategories: action.payload,
        error: null,
      };
    case FETCH_SURVEY_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_SURVEY_THEMES_SUCCESS:
      return {
        ...state,
        surveyThemes: action.payload,
        error: null,
      };
    case FETCH_SURVEY_THEMES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_SURVEY_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case FETCH_SURVEY_PAGES_SUCCESS:
      return {
        ...state,
        surveyPages: action.payload,
        error: null,
      };
    case FETCH_SURVEY_PAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_SINGLE_SURVEY_QUESTION_CHOICES_REQUEST:
    case FETCH_SURVEY_QUESTIONS_WITH_CHOICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SINGLE_SURVEY_QUESTION_CHOICES_SUCCESS:
      return {
        ...state,
        surveyQuestionChoices: {
          ...state.surveyQuestionChoices,
          [action.payload.questionId]: action.payload.survey_question_choices,
        },
        loading: false,
        error: null,
      };
    case FETCH_SINGLE_SURVEY_QUESTION_CHOICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SURVEY_QUESTIONS_WITH_CHOICES_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        surveyQuestionChoices: action.payload.reduce((acc, question) => {
          acc[question.id] = question.survey_question_choices;
          return acc;
        }, {}),
        loading: false,
        error: null,
      };
    case FETCH_SURVEY_QUESTIONS_WITH_CHOICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PUBLIC_SURVEY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PUBLIC_SURVEY_SUCCESS: {
      const {
          survey, 
          surveyPages, 
          surveyQuestions, 
          surveyQuestionChoices, 
      } = action.payload;
      const newState = {
          ...state,
          loading: false,
          publicSurvey: survey,
          publicSurveyPages: [...surveyPages],
          publicSurveyQuestions: [...surveyQuestions],
          publicSurveyQuestionChoices: [...surveyQuestionChoices],
      };
      return newState;
    }
    case FETCH_PUBLIC_SURVEY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CREATE_SURVEY_QUESTION_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, action.payload],
        error: null,
      };
    case CREATE_SURVEY_QUESTION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_SURVEY_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_SURVEY_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        surveyPages: state.surveyPages.filter(page => page.id !== action.payload),
      };
    case DELETE_SURVEY_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_SURVEY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_SURVEY_SUCCESS:
      return {
        ...state,
        loading: false,
        // Set the currently viewed survey to null, as it no longer exists
        survey: null,
        // Also, filter the deleted survey out of the main surveys list, if it exists there
        surveys: state.surveys.filter(s => s.id !== action.payload),
      };
    case DELETE_SURVEY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_SURVEY_QUESTION_SUCCESS:
      return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.payload),
        error: null,
      };
    case DELETE_SURVEY_QUESTION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_SURVEY_QUESTION_CHOICES_SUCCESS:
      return {
        ...state,
        survey_question_choices: [...state.survey_question_choices, ...action.payload],
        error: null,
      };
    case CREATE_SURVEY_QUESTION_CHOICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SURVEY_TITLE_SUCCESS:
      return {
        ...state,
        survey: { ...state.survey, title: action.payload.title },
        error: null,
      };
    case UPDATE_SURVEY_TITLE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SURVEY_DESCRIPTION_SUCCESS:
      return {
        ...state,
        survey: { ...state.survey, description: action.payload.description },
        error: null,
      };
    case UPDATE_SURVEY_DESCRIPTION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SURVEY_PAGE_TITLE_SUCCESS:
      return {
        ...state,
        surveyPage: { ...state.surveyPage, title: action.payload.title },
        error: null,
      };
    case UPDATE_SURVEY_PAGE_TITLE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS:
      return {
        ...state,
        surveyPage: { ...state.surveyPage, description: action.payload.description },
        error: null,
      };
    case UPDATE_SURVEY_PAGE_DESCRIPTION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SURVEY_LAYOUT_SUCCESS:
      return {
        ...state,
        survey: {
          ...state.survey,
          layout: action.payload.layout,
        },
        error: null,
      };
    case UPDATE_SURVEY_LAYOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_QUESTIONS: {
      const questionExists = state.questions.some(
        question => question.id === action.payload.id,
      );
    
      return {
        ...state,
        questions: questionExists
          ? state.questions.map(question => (question.id === action.payload.id ? action.payload : question))
          : [...state.questions, action.payload],
      };
    }    
    case PUBLISH_SURVEY_SUCCESS:
      return {
        ...state,
        isPublished: true,
        error: null,
      };
    case PUBLISH_SURVEY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case PREVIEW_SURVEY_SUCCESS:
      return {
        ...state,
        publicSurvey: action.payload.survey,
        publicSurveyPages: action.payload.surveyPages,
        publicSurveyQuestions: action.payload.surveyQuestions,
        publicSurveyQuestionChoices: action.payload.surveyQuestionChoices,
        error: null,
      };
    case PREVIEW_SURVEY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SUBMIT_SURVEY_RESPONSE_SUCCESS:
      return {
        ...state,
        surveyResponses: [...state.surveyResponses, action.payload],
        loading: false,
        submitError: null,
      };
    case SUBMIT_SURVEY_RESPONSE_FAILURE:
      return {
        ...state,
        loading: false,
        submitError: action.payload, // Store the error message
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case SET_QUESTION_ORDER_LOCALLY:
      return {
        ...state,
        questions: action.payload.questions,
      };

    case SAVE_QUESTION_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SAVE_QUESTION_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SAVE_QUESTION_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default surveyReducer;
