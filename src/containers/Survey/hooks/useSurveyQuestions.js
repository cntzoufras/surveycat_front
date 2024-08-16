import { useState, useCallback } from 'react';
import axios from 'axios';

const useSurveyQuestions = ({ surveyId, surveyPageId }) => {
  const [surveyQuestions, setSurveyQuestions] = useState([]);

  const fetchSurveyQuestions = useCallback(async () => {
    try {
      const response = await axios.get(`http://surveycat.test/api/surveys/${surveyId}/pages/${surveyPageId}/survey-questions`);
      setSurveyQuestions(response.data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }, [surveyId, surveyPageId]);

  const addQuestion = async (questionData) => {
    try {
      await axios.post('http://surveycat.test/api/survey-questions', { ...questionData, survey_page_id: surveyPageId });
      fetchSurveyQuestions();
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://surveycat.test/api/survey-questions/${questionId}`);
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
