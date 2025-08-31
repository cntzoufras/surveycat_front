import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    || (process.env.NODE_ENV === 'production' ? '/api' : 'http://surveycat.test/api'),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

const publicApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    || (process.env.NODE_ENV === 'production' ? '/api' : 'http://surveycat.test/api'),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false, // No credentials needed for public access
});


api.interceptors.request.use(
  async (config) => {
    // Only fetch Sanctum CSRF cookie for state-changing requests
    const method = (config.method || 'get').toLowerCase();
    const needsCsrf = ['post', 'put', 'patch', 'delete'].includes(method);

    let csrfToken = Cookies.get('XSRF-TOKEN');

    if (needsCsrf && !csrfToken) {
      // Determine correct origin for /sanctum/csrf-cookie (root, not under /api)
      const base = api?.defaults?.baseURL || '';
      let origin;
      if (!base || base.startsWith('/')) {
        // Relative baseURL like "/api" -> use current site origin
        origin = window.location.origin;
      } else if (base.endsWith('/api')) {
        origin = base.slice(0, -4);
      } else {
        try {
          origin = new URL(base).origin;
        } catch (e) {
          origin = window.location.origin;
        }
      }

      await axios.get(`${origin}/sanctum/csrf-cookie`, { withCredentials: true });
      csrfToken = Cookies.get('XSRF-TOKEN');
    }

    const decodedToken = csrfToken ? decodeURIComponent(csrfToken) : csrfToken;

    return {
      ...config,
      headers: {
        ...config.headers,
        // Sanctum expects X-XSRF-TOKEN; include only when present
        ...(decodedToken ? { 'X-XSRF-TOKEN': decodedToken } : {}),
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

export const getSurveyDashboardStats = () => (
  api.get('/dashboards/surveys')
);

export const getAppDashboardStats = () => (
  api.get('/dashboards/app')
);
