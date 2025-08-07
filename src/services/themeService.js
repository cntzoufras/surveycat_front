// Theme service - simplified to use existing Redux actions
// Individual functions are now replaced by Redux actions in surveyActions.js
// This file can be removed as all functionality is handled via Redux
// The actual API calls are made through the Redux action creators

import api from '@/utils/api/survey-api';

const ThemeService = {
  /**
   * Update survey to use a specific theme
   * @param {String} surveyId - The survey ID
   * @param {String} themeId - The theme ID to use
   * @returns {Promise<void>}
   */
  async updateSurveyTheme(surveyId, themeId) {
    try {
      await api.put(`/surveys/${surveyId}`, {
        theme_id: themeId,
      });
    } catch (error) {
      console.error('Error updating survey theme:', error);
      throw error;
    }
  },
};

export default ThemeService;
