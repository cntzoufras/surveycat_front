import {
  FETCH_SURVEY_SUCCESS,
  FETCH_SURVEY_FAIL,
  FETCH_SURVEYS_SUCCESS,
  FETCH_SURVEYS_FAIL,
  FETCH_SURVEY_QUESTIONS,
  FETCH_SURVEY_PAGES_SUCCESS,
  FETCH_SURVEY_PAGES_FAIL,
  CREATE_SURVEY_QUESTION_SUCCESS,
  CREATE_SURVEY_QUESTION_FAIL,
  CREATE_SURVEY_QUESTION_CHOICES_SUCCESS,
  CREATE_SURVEY_QUESTION_CHOICES_FAIL,
  CREATE_SURVEY_SUCCESS,
  CREATE_SURVEY_FAIL,
  CREATE_SURVEY_PAGE_SUCCESS,
  CREATE_SURVEY_PAGE_FAIL,
  ADD_SURVEY_PAGE_SUCCESS,
  ADD_SURVEY_PAGE_FAIL,
  FETCH_SURVEY_CATEGORIES_SUCCESS,
  FETCH_SURVEY_CATEGORIES_FAIL,
  FETCH_SURVEY_THEMES_SUCCESS,
  FETCH_SURVEY_THEMES_FAIL,
  FETCH_STOCK_SURVEYS_SUCCESS,
  FETCH_STOCK_SURVEYS_FAIL,
  UPDATE_SURVEY_TITLE_SUCCESS,
  UPDATE_SURVEY_TITLE_FAIL,
  UPDATE_SURVEY_DESCRIPTION_SUCCESS,
  UPDATE_SURVEY_DESCRIPTION_FAIL,
  UPDATE_SURVEY_PAGE_TITLE_SUCCESS,
  UPDATE_SURVEY_PAGE_TITLE_FAIL,
  UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS,
  UPDATE_SURVEY_PAGE_DESCRIPTION_FAIL,
  UPDATE_SURVEY_LAYOUT_SUCCESS,
  UPDATE_SURVEY_LAYOUT_FAIL,
  DELETE_SURVEY_QUESTION_SUCCESS,
  DELETE_SURVEY_QUESTION_FAIL,
  PUBLISH_SURVEY_SUCCESS,
  PUBLISH_SURVEY_FAIL,
} from '../actions/surveyActions';

const initialState = {
  surveys:[],
  survey: null, // Holds the current survey's main details like title, description, etc.
  surveyCategories: [],
  surveyThemes: [],
  surveyPage: null, // Holds the current survey page details like title, description, etc.
  surveyPages: [], // Holds all pages related to a survey
  stockSurveys: [], // Holds stock surveys
  questions: [], // Holds questions related to the current survey page
  choices: [], // Holds the choices related to the current questions
  layout: 'default', // Tracks layout settings for the survey
  loading: false, // Indicates if any async operation is in progress
  error: null, // Holds any error messages encountered during operations
  isPublished: false, // Tracks whether the survey is published
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SURVEY_SUCCESS:
      return {
        ...state,
        survey: action.payload,
        error: null,
      };
    case CREATE_SURVEY_FAIL:
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
    case CREATE_SURVEY_PAGE_FAIL:
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
    case ADD_SURVEY_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_SURVEYS_SUCCESS:
      return {
        ...state,
        surveys: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SURVEYS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FETCH_SURVEY_SUCCESS:
      return {
        ...state,
        survey: action.payload,
        error: null,
      };
    case FETCH_SURVEY_FAIL:
      return {
        ...state,
        survey: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SURVEY_CATEGORIES_SUCCESS:
      return {
        ...state,
        surveyCategories: action.payload,
        error: null,
      };
    case FETCH_SURVEY_CATEGORIES_FAIL:
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
    case FETCH_SURVEY_THEMES_FAIL:
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
    case FETCH_SURVEY_PAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_STOCK_SURVEYS_SUCCESS:
      return {
        ...state,
        stockSurveys: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_STOCK_SURVEYS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CREATE_SURVEY_QUESTION_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, action.payload],
        error: null,
      };
    case CREATE_SURVEY_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_SURVEY_QUESTION_SUCCESS:
      return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.payload),
        error: null,
      };
    case DELETE_SURVEY_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_SURVEY_QUESTION_CHOICES_SUCCESS:
      return {
        ...state,
        choices: [...state.choices, ...action.payload],
        error: null,
      };
    case CREATE_SURVEY_QUESTION_CHOICES_FAIL:
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
    case UPDATE_SURVEY_TITLE_FAIL:
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
    case UPDATE_SURVEY_DESCRIPTION_FAIL:
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
    case UPDATE_SURVEY_PAGE_TITLE_FAIL:
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
    case UPDATE_SURVEY_PAGE_DESCRIPTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SURVEY_LAYOUT_SUCCESS:
      return {
        ...state,
        layout: action.payload.layout,
        error: null,
      };
    case UPDATE_SURVEY_LAYOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_SURVEY_QUESTION_SUCCESS:
      return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.payload),
        error: null,
      };
    case DELETE_SURVEY_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case PUBLISH_SURVEY_SUCCESS:
      return {
        ...state,
        isPublished: true,
        error: null,
      };
    case PUBLISH_SURVEY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default surveyReducer;
