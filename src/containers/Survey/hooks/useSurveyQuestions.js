import { useState, useCallback } from 'react';
import { createSurveyQuestion, getSurveyQuestions } from '@/utils/api/survey-api.js';

const useSurveyQuestions = ({ surveyId, surveyPageId }) => {
  const [surveyQuestions, setSurveyQuestions] = useState([]);

  const fetchSurveyQuestions = useCallback(async () => {
    let isMounted = true;

    try {
      const response = await getSurveyQuestions(surveyId, surveyPageId);
      if (isMounted) {
        setSurveyQuestions(response.data.data);
      }
    } catch (error) {
      if (isMounted) {
        console.error('Error fetching questions:', error);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [surveyId, surveyPageId]);


  const addQuestion = async (questionData) => {
    try {
      console.log('sending question');
      const response = await createSurveyQuestion({ ...questionData, survey_page_id: surveyPageId });
      fetchSurveyQuestions(); // Refetch questions after successfully adding a new one
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://surveycat.test/api/survey-questions/${questionId}`,
      {
        withCredentials:true
      });
      fetchSurveyQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };
  
  return {
    surveyQuestions,
    fetchSurveyQuestions,
    addQuestion,
    deleteQuestion,
  };
};

export default useSurveyQuestions;
