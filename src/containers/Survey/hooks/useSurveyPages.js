import { useState, useCallback } from 'react';
import { getSurveyPages, createSurveyPage } from '@/utils/api/survey-api';

const useSurveyPages = () => {
  const [surveyPages, setSurveyPages] = useState([]);

  const fetchSurveyPages = useCallback((surveyId) => {
    let isMounted = true;

    const fetchData = async () => {
      if (!surveyId) {
        console.error('Invalid surveyId passed to fetchSurveyPages');
        return;
      }

      try {
        const response = await getSurveyPages(surveyId);
        if (isMounted) {
          console.log('Fetched survey pages:', response.data);
          setSurveyPages(response.data); // Assuming the response structure contains pages in data.data
        }
      } catch (error) {
        console.error('Error fetching survey pages:', error);
      }
    };

    fetchData();

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
      
      // Fetch pages after adding a new one, only if survey_id is valid
      fetchSurveyPages(surveyPageData.survey_id);

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
