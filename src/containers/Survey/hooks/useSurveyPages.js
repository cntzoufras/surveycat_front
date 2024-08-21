import { useState, useCallback } from 'react';
import { getSurveyPages, createSurveyPage } from '@/utils/api/survey-api.js';

const useSurveyPages = () => {
  const [surveyPages, setSurveyPages] = useState([]);

  const fetchSurveyPages = useCallback(async (surveyId) => {
    if (!surveyId) {
      console.error('Invalid surveyId passed to fetchSurveyPages');
      return;
    }

    let isMounted = true;

    try {
      const response = await getSurveyPages(surveyId);
      if (isMounted) {
        console.log('Fetched survey pages:', response.data);
        setSurveyPages(response.data); // Assuming the response structure contains pages in data.data
      }
    } catch (error) {
      if (isMounted) {
        console.error('Error fetching survey pages:', error);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);
  
  const addSurveyPage = async (surveyPageData) => {
    try {
      if (!surveyPageData.survey_id) {
        throw new Error('survey_id is required to create a survey page');
      }

      const response = await createSurveyPage(surveyPageData);
      
      // Only fetch pages if survey_id is valid
      if (surveyPageData.survey_id) {
        await fetchSurveyPages(surveyPageData.survey_id); // Fetch pages after adding a new one
      }

      return response;
    } catch (error) {
      console.error('Error adding survey page:', error);
      throw error;
    }
  };
 

  return {
    surveyPages,
    fetchSurveyPages,
    addSurveyPage,
  };
};

export default useSurveyPages;
