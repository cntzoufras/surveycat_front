import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PublicQuestionList from './public/QuestionList';
import { fetchPublicSurveyBySlugAction } from '@/redux/actions/surveyActions';  // Ensure this is correct
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

  return (
    <div>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <PublicQuestionList questions={surveyQuestions} onResponseChange={handleResponseChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PublicSurveyPage;
