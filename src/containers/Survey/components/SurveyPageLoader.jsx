import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import Loading from '@/shared/components/Loading';

import SurveyPage from './SurveyPage';
import { getSurveyPage, getSurveyQuestions } from '../../../utils/api/survey-api';

const SurveyPageLoader = ({ surveyId, surveyPageId }) => {
  console.log(`SurveyPageLoader loads Survey ID: ${surveyId}, Survey Page ID: ${surveyPageId}`);
  
  const [surveyPage, setSurveyPage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Correctly define isMounted before use

    const fetchSurveyPageData = async () => {
      try {
        console.log('Fetching survey page data');
        
        const surveyPageResponse = await getSurveyPage(surveyPageId);
        if (!surveyPageResponse || !surveyPageResponse.data) {
          throw new Error('Survey page data is missing or invalid');
        }
        
        const surveyPageData = Array.isArray(surveyPageResponse.data) 
          ? surveyPageResponse.data[0] 
          : surveyPageResponse.data;
        
        if (isMounted) {
          setSurveyPage({
            title: surveyPageData.title || 'Untitled Survey Page',
            description: surveyPageData.description || 'No description available.',
            ...surveyPageData,
          });
        }

        const questionsResponse = await getSurveyQuestions(surveyId, surveyPageId);
        console.log('Survey questions response:', questionsResponse.data);

        if (isMounted) {
          setQuestions(questionsResponse.data.data || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching survey page or questions:', error);

        if (isMounted) {
          if (error.message === 'Survey ID or Survey Page ID is missing') {
            setLoadError('Invalid URL. Please navigate through the application.');
          } else {
            setLoadError('Error fetching survey page or questions');
          }

          setIsLoading(false);
        }
      }
    };

    if (surveyId && surveyPageId) {
      fetchSurveyPageData();
    } else {
      setLoadError('Survey ID or Survey Page ID is missing');
      setIsLoading(false);
    }

    return () => {
      isMounted = false; // Cleanup: Set isMounted to false when the component unmounts
    };
  }, [surveyId, surveyPageId]);

  if (isLoading) {
    return <Loading loading fullScreen={false} label="Loading" minHeight="40vh" />;
  }

  if (loadError) {
    return <Typography variant="subtitle2" gutterBottom>{loadError}</Typography>;
  }

  if (!surveyPage) {
    return (
      <Typography variant="subtitle2" gutterBottom>
        Error loading survey page: No survey page found.
      </Typography>
);
  }

  return <SurveyPage surveyPage={surveyPage} questions={questions} />;
};
SurveyPageLoader.propTypes = {
  surveyId: PropTypes.string.isRequired,
  surveyPageId: PropTypes.string.isRequired,
};

export default SurveyPageLoader;
