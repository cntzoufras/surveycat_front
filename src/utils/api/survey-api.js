import axios from 'axios';
import Cookies from 'js-cookie';
import { logout } from '@/redux/actions/authActions'; // Adjust the import path as necessary

const api = axios.create({
  baseURL: 'http://surveycat.test/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    let csrfToken = Cookies.get('XSRF-TOKEN');

    // If the CSRF token is missing, fetch it
    if (!csrfToken) {
      await axios.get(`${config.baseURL}/sanctum/csrf-cookie`, { withCredentials: true });
      csrfToken = Cookies.get('XSRF-TOKEN');
    }

    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Function to set up the response interceptor with navigate and dispatch
export const setupInterceptor = (navigate, dispatch) => {
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.response.status === 401) {
        // Clear authentication and session cookies
        Cookies.remove('auth');
        Cookies.remove('surveycat_session');
        Cookies.remove('XSRF-TOKEN');

        // Dispatch logout action to Redux store
        dispatch(logout());

        // Redirect to the login page
        navigate('/login');
      }

      // Handle CSRF token mismatch error by refreshing the CSRF token
      if (error.response && error.response.status === 419) {
        await axios.get(`${error.config.baseURL}/sanctum/csrf-cookie`, { withCredentials: true });
        return api(error.config); // Retry the original request
      }

      return Promise.reject(error);
    }
  );
};


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
export const createSurvey = surveyData => (
  api.post('/surveys', surveyData)
);
export const createSurveyPage = surveyPageData => (
  api.post('/survey-pages', surveyPageData)
);
export const getSurveyQuestions = (surveyId, surveyPageId) => (
  api.get(`/surveys/${surveyId}/pages/${surveyPageId}/questions`)
);
export const getSurveyPages = surveyId => (
  api.get(`/surveys/${surveyId}/pages`)
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
