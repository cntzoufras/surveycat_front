import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://surveycat.test/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    },
    withCredentials: true,
});

axios.defaults.withCredentials = true;

// Add a request interceptor to include the Bearer token in all requests
api.interceptors.request.use(
  (config) => {
    // Renamed to camelCase
    const csrfToken = Cookies.get('XSRF-TOKEN');
    
    if (csrfToken) {
      // Creating a new config object to avoid reassigning the parameter
      const updatedConfig = {
        ...config,
        headers: {
          ...config.headers,
          'X-XSRF-TOKEN': csrfToken,
        },
      };
      return updatedConfig;
    }
    return config;
  },
  error => Promise.reject(error),
);


export const getSurveys = userId => (
  api.get('/surveys')
);
export const getSurveyCategories = () => (
  api.get('/survey-categories')
);
export const getSurveyThemes = () => (
  api.get('/themes')
);
export const getSurveyPage = surveyPageId => (
  api.get(`/survey-pages/${surveyPageId}`)
);
export const createSurvey = surveyData => (
  api.post('/surveys', surveyData)
);
export const createSurveyPage = surveyPageData => (
  api.post('/survey-pages', surveyPageData)
);
export const getSurveyQuestions = (surveyId, surveyPageId) => (
  api.get(`/surveys/${surveyId}/survey-pages/${surveyPageId}/survey-questions`)
);
export const getSurveyPages = surveyId => (
  api.get(`/surveys/${surveyId}/survey-pages`)
);
export const createSurveyQuestion = questionData => (
  api.post('/survey-questions', questionData)
);
export const updateSurveyTitle = (surveyId, title, userId) => (
  api.put(`/surveys/${surveyId}`, { title, user_id: userId })
);
export const updateSurveyDescription = (surveyId, description, userId) => (
  api.put(`/surveys/${surveyId}`, { description, user_id: userId })
);
export const updateSurveyPageTitle = (surveyPageId, title, userId) => (
  api.put(`/survey-pages/${surveyPageId}`, { title, user_id: userId })
);
export const updateSurveyPageDescription = (surveyPageId, description, userId) => (
  api.put(`/survey-pages/${surveyPageId}`, { description, user_id: userId })
);
export const deleteSurveyQuestion = surveyQuestionId => (
  api.delete(`/survey-questions/${surveyQuestionId}`)
);
