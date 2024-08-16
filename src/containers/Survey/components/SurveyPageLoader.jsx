import React, { useState, useEffect } from 'react';
import { CircularProgress as MuiCircularProgress } from '@mui/material';
import SurveyPage from './SurveyPage';
import { getSurveyPage, getSurveyQuestions} from '../../../utils/api/survey-api';

const SurveyPageLoader = ({ surveyId, surveyPageId }) => {
  const [surveyPage, setSurveyPage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchQuestions = async () => {
    try {
      console.log(`surveyId: ', ${surveyId}, surveyPageId: ${surveyPageId}`);

      const response = await getSurveyQuestions(surveyId, surveyPageId);
      setQuestions(response.data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    const fetchSurveyPageData = async () => {
      const fetchQuestions = async () => {
        try {
          console.log(`surveyId: ', ${surveyId}, surveyPageId: ${surveyPageId}`);

          const response = await getSurveyQuestions(surveyId, surveyPageId);
          console.log(`fetchQuestions: ${Object.keys(response.data)}`)
          setQuestions(response.data.data);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
      await fetchQuestions();

      try {
        const surveyPageResponse = await getSurveyPage(surveyPageId);
        setSurveyPage(surveyPageResponse.data.data);
        console.log(`survey page: `)
        console.log(`surveyId: ', ${surveyId}, surveyPageId: ${surveyPageId}`);

        await fetchQuestions();
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Survey Page:', error);
        setIsLoading(false);
      }
    };

    if (surveyId && surveyPageId) {
      console.log(`FETCH SURVEY DATA: surveyId: ', ${surveyId}, surveyPageId: ${surveyPageId}`);
      fetchSurveyPageData();
    } else {
      setIsLoading(false);
    }
  }, [surveyId, surveyPageId]);

  return isLoading ? (
    <MuiCircularProgress />
  ) : (
    <SurveyPage surveyPage={surveyPage} fetchQuestions={fetchQuestions} questions={questions} />
  );
};

export default SurveyPageLoader;
