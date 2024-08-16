import { useState, useCallback } from 'react';
import axios from 'axios';

const useSurveyData = ({ surveyId, surveyPageId, location }) => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [surveyPageTitle, setSurveyPageTitle] = useState('');
  const [surveyPageDescription, setSurveyPageDescription] = useState('');
  const [stockSurveys, setStockSurveys] = useState([]);
  const [selectedStockSurvey, setSelectedStockSurvey] = useState('');

  const fetchSurveyData = useCallback(async () => {
    try {
      const [surveyResponse, surveyPageResponse, stockSurveysResponse] = await Promise.all([
        axios.get(`http://surveycat.test/api/surveys/${surveyId}`),
        axios.get(`http://surveycat.test/api/survey-pages/${surveyPageId}`),
        axios.get('http://surveycat.test/api/stock-surveys')
      ]);
      
      setSurveyTitle(surveyResponse.data.title);
      setSurveyDescription(surveyResponse.data.description);
      setSurveyPageTitle(surveyPageResponse.data.title);
      setSurveyPageDescription(surveyPageResponse.data.description);
      setStockSurveys(stockSurveysResponse.data.data);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  }, [surveyId, surveyPageId]);

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
