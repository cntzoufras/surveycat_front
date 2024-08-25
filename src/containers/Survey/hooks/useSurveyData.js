import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useSurveyData = ({ surveyId, surveyPageId }) => {
  console.log('useSurveyData hook called with:', surveyId, surveyPageId);

  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [surveyPageTitle, setSurveyPageTitle] = useState('');
  const [surveyPageDescription, setSurveyPageDescription] = useState('');
  const [stockSurveys, setStockSurveys] = useState([]);
  const [selectedStockSurvey, setSelectedStockSurvey] = useState('');

  const fetchSurveyData = useCallback(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!surveyId || !surveyPageId) {
        console.error('surveyId or surveyPageId is missing');
        return;
      }
      console.log('fetchSurveyData called');
      try {
        const csrfToken = Cookies.get('XSRF-TOKEN');
        if (!csrfToken) {
          await axios.get('http://surveycat.test/sanctum/csrf-cookie', { withCredentials: true });
        }

        const [surveyResponse, surveyPageResponse, stockSurveysResponse] = await Promise.all([
          axios.get(`http://surveycat.test/api/surveys/${surveyId}`, { withCredentials: true }),
          axios.get(`http://surveycat.test/api/survey-pages/${surveyPageId}`, { withCredentials: true }),
          axios.get('http://surveycat.test/api/surveys/stock', { withCredentials: true }),
        ]);

        if (isMounted) {
          console.log('Survey response:', surveyResponse.data);
          setSurveyTitle(surveyResponse.data.title || ''); // Fallback to empty string
          setSurveyDescription(surveyResponse.data.description || ''); // Fallback to empty string
          setSurveyPageTitle(surveyPageResponse.data.title || ''); // Fallback to empty string
          setSurveyPageDescription(surveyPageResponse.data.description || ''); // Fallback to empty string
          setStockSurveys(stockSurveysResponse.data.data || []);

        }
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [surveyId, surveyPageId]);

  useEffect(() => {
    const cleanup = fetchSurveyData();

    return cleanup;
  }, [fetchSurveyData]);

  return {
    surveyTitle,
    surveyDescription,
    surveyPageTitle,
    surveyPageDescription,
    setSurveyTitle,
    setSurveyDescription,
    setSurveyPageTitle,
    setSurveyPageDescription,
    stockSurveys,
    selectedStockSurvey,
    setSelectedStockSurvey,
    fetchSurveyData,
  };
};

export default useSurveyData;
