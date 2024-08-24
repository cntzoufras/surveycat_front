import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress as MuiCircularProgress, Typography } from '@mui/material';
import SurveyPage from './SurveyPage';
import { getSurveyPage, getSurveyQuestions } from '../../../utils/api/survey-api';

const SurveyPageLoader = ({ surveyId, surveyPageId }) => {
  console.log(`surveypageloader loads ${surveyId} , ${surveyPageId}`);
  const [surveyPage, setSurveyPage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const fetchSurveyPageData = async () => {
      try {
        console.log('Fetching survey page data');
        const surveyPageResponse = await getSurveyPage(surveyPageId);
        const surveyPageData = Array.isArray(surveyPageResponse.data) 
          ? surveyPageResponse.data[0] 
          : surveyPageResponse.data;
        
        if (!surveyPageData) {
          throw new Error('Survey page data is missing or invalid');
        }
        
        setSurveyPage({
          title: surveyPageData.title || 'Untitled Survey Page',
          description: surveyPageData.description || 'No description available.',
          ...surveyPageData,
        });

        const questionsResponse = await getSurveyQuestions(surveyId, surveyPageId);
        console.log('Survey questions response:', questionsResponse.data);
        setQuestions(questionsResponse.data.data || []);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching survey page or questions:', error);

        if (error.message === 'Survey ID or Survey Page ID is missing') {
          setLoadError('Invalid URL. Please navigate through the application.');
        } else {
          setLoadError('Error fetching survey page or questions');
        }

        setIsLoading(false);
      }
    };

    if (surveyId && surveyPageId) {
      fetchSurveyPageData();
    } else {
      setLoadError('Survey ID or Survey Page ID is missing');
      setIsLoading(false);
    }
  }, [surveyId, surveyPageId]);

  if (isLoading) {
    return <MuiCircularProgress />;
  }

  if (loadError) {
    return <Typography variant="subtitle2" gutterBottom>{loadError}</Typography>;
  }

  if (!surveyPage) {
    return <Typography variant="subtitle2" gutterBottom>Error loading survey page: No survey page found.</Typography>;
  }

  return <SurveyPage surveyPage={surveyPage} questions={questions} />;
};

SurveyPageLoader.propTypes = {
  surveyId: PropTypes.string.isRequired,
  surveyPageId: PropTypes.string.isRequired,
};

export default SurveyPageLoader;
