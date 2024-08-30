import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PublicQuestionList from './public/QuestionList';
import { fetchPublicSurveyBySlugAction } from '@/redux/actions/surveyActions';
import { submitSurveySubmissionAction } from '@/redux/actions/surveyActions';

const PublicSurveyPage = () => {
  const dispatch = useDispatch();
  const { surveySlug } = useParams();

  const survey = useSelector(state => state.survey.publicSurvey);
  const surveyPages = useSelector(state => state.survey.publicSurveyPages);
  const surveyQuestions = useSelector(state => state.survey.publicSurveyQuestions);

  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (surveySlug) {
      dispatch(fetchPublicSurveyBySlugAction(surveySlug));
    }
  }, [surveySlug, dispatch]);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    dispatch(submitSurveySubmissionAction(survey.id, responses));
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  const themeStyles = {
    fontFamily: survey?.theme?.theme_setting?.settings?.typography?.fontFamily || 'Arial, sans-serif',
    fontSize: survey?.theme?.theme_setting?.settings?.typography?.fontSize || '12px',
    color: survey?.theme?.theme_setting?.settings?.primaryColor || '#252525',
    backgroundColor: survey?.theme?.theme_setting?.settings?.backgroundColor || '#909090',
  };
  
  return (
    <div style={themeStyles}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <PublicQuestionList questions={surveyQuestions} onResponseChange={handleResponseChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PublicSurveyPage;
