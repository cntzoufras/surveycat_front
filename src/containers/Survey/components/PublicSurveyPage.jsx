import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PublicQuestionList from './public/QuestionList'; // Reuse your existing component
import { fetchSurveyByIdAction, fetchSurveyBySlugAction } from '@/redux/actions/surveyActions'; // You'll need to create this action
import { submitSurveySubmissionAction } from '@/redux/actions/surveyActions'; // You'll need to create this action

const PublicSurveyPage = () => {
  const { surveySlug } = useParams();
  const dispatch = useDispatch();
  const survey = useSelector(state => state.survey.survey);
  const surveyQuestions = useSelector(state => state.survey.questions);

  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (surveySlug) {
      dispatch(fetchSurveyByIdAction(surveySlug));
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
    // Add logic to handle submission success/failure
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
