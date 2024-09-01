import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicSurveyBySlugAction, submitSurveySubmissionAction } from '@/redux/actions/surveyActions';

import PublicQuestionList from './public/PublicQuestionList';
import ThankYouSubmission from './ThankYouSubmission'; // Import the Thank You component

const PublicSurveyPage = () => {
  const dispatch = useDispatch();
  const { surveySlug } = useParams();

  const survey = useSelector(state => state.survey.publicSurvey);
  const surveyQuestions = useSelector(state => state.survey.publicSurveyQuestions);

  const [responses, setResponses] = useState({});
  const [submissionComplete, setSubmissionComplete] = useState(false); // Track submission status
  const [submissionTimestamp, setSubmissionTimestamp] = useState(null); // Track submission timestamp

  useEffect(() => {
    if (surveySlug) {
      dispatch(fetchPublicSurveyBySlugAction(surveySlug));
    }
  }, [surveySlug, dispatch]);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await dispatch(submitSurveySubmissionAction(survey.id, responses));
      if (response && response.status === 201) {
        setSubmissionTimestamp(new Date().toLocaleString()); // Set timestamp of submission
        setSubmissionComplete(true); // Mark submission as complete
      } else {
        // Handle non-201 responses if necessary
        console.error('Failed to submit survey', response);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
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

  if (submissionComplete) {
    return (
      <ThankYouSubmission timestamp={submissionTimestamp} /> // Show Thank You message with timestamp
    );
  }

  return (
    <div style={themeStyles}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <PublicQuestionList questions={surveyQuestions} onResponseChange={handleResponseChange} />
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PublicSurveyPage;
