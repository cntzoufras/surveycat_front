import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://snf-893977.vm.okeanos.grnet.gr/api'  // Use HTTPS in production
    : 'http://surveycat.test/api',  // Use HTTP in local Docker network
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

const publicApi = axios.create({
  baseURL: 'http://surveycat.test/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false, // No credentials needed for public access
});

api.interceptors.request.use(
  async (config) => {
    let csrfToken = Cookies.get('XSRF-TOKEN');

    // If the CSRF token is missing, fetch it
    if (!csrfToken) {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
      csrfToken = Cookies.get('XSRF-TOKEN');
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        'X-XSRF-TOKEN': csrfToken || config.headers['X-XSRF-TOKEN'],
      },
    };
  },
  error => Promise.reject(error),
);

export { publicApi };
export default api;

export const getUserSurveys = () => (
  api.get('/surveys/user')
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
export const getSurveyQuestions = (surveyId, surveyPageId) => (
  api.get(`/surveys/${surveyId}/pages/${surveyPageId}/questions`)
);
export const getSurveyPages = surveyId => (
  api.get(`/surveys/${surveyId}/pages`)
);
export const getSurveysWithPagesAndThemes = () => (
  api.get('/surveys/all')
);
export const createSurvey = surveyData => (
  api.post('/surveys', surveyData)
);
export const createSurveyPage = surveyPageData => (
  api.post('/survey-pages', surveyPageData)
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
