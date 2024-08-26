// src/redux/reducers/surveyReducer.js

import {
  FETCH_SURVEY_QUESTIONS,
  FETCH_SURVEY_PAGES,
  CREATE_SURVEY_QUESTION_SUCCESS,
  CREATE_SURVEY_QUESTION_FAIL,
  CREATE_SURVEY_QUESTION_CHOICES_SUCCESS,
  CREATE_SURVEY_QUESTION_CHOICES_FAIL,
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
  ADD_SURVEY_PAGE_SUCCESS,
  ADD_SURVEY_PAGE_FAIL,
} from '../actions/surveyActions';

const initialState = {
  questions: [],
  choices: [],
  loading: false,
  error: null,
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SURVEY_QUESTION_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, action.payload],
        loading: false,
      };
    case CREATE_SURVEY_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CREATE_SURVEY_QUESTION_CHOICES_SUCCESS:
      return {
        ...state,
        choices: [...state.choices, ...action.payload],
        loading: false,
      };
    case CREATE_SURVEY_QUESTION_CHOICES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_SURVEY_PAGE_SUCCESS:
      return {
        ...state,
        surveyPages: [...state.surveyPages, action.payload],
      };
    case ADD_SURVEY_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_SURVEY_QUESTIONS:
      return {
          ...state,
          questions: action.payload,
      };
    case UPDATE_SURVEY_TITLE_SUCCESS:
      return {
        ...state,
        survey: { ...state.survey, title: action.payload.title },
      };
    case UPDATE_SURVEY_TITLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SURVEY_PAGE_TITLE_SUCCESS:
      return {
        ...state,
        surveyPage: { ...state.surveyPage, title: action.payload.title },
      };
    case UPDATE_SURVEY_PAGE_DESCRIPTION_SUCCESS:
      return {
        ...state,
        surveyPage: { ...state.surveyPage, description: action.payload.description },
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
