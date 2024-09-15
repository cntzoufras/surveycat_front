import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicSurveyBySlugAction, submitSurveySubmissionAction } from '@/redux/actions/surveyActions';
import {
 Container, Typography, Box, Button, 
} from '@mui/material';
import PublicQuestionList from './public/PublicQuestionList';
import ThankYouSubmission from './ThankYouSubmission';

const PublicSurveyPage = () => {
  const dispatch = useDispatch();
  const { surveySlug } = useParams();

  const survey = useSelector(state => state.survey.publicSurvey);
  const surveyQuestions = useSelector(state => state.survey.publicSurveyQuestions);

  const [responses, setResponses] = useState({});
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [submissionTimestamp, setSubmissionTimestamp] = useState(null);

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
        setSubmissionTimestamp(new Date().toLocaleString());
        setSubmissionComplete(true);
      } else {
        console.error('Failed to submit survey', response);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (!survey) {
    return <Typography>Loading...</Typography>;
  }

  const themeStyles = {
    fontFamily: survey?.theme?.theme_setting?.settings?.typography?.fontFamily || 'Arial, sans-serif',
    fontSize: survey?.theme?.theme_setting?.settings?.typography?.fontSize || '12px',
    color: survey?.theme?.theme_setting?.settings?.primaryColor || '#252525',
    backgroundColor: survey?.theme?.theme_setting?.settings?.backgroundColor || '#f5f5f5',
  };

  if (submissionComplete) {
    return <ThankYouSubmission timestamp={submissionTimestamp} />;
  }

  return (
    <Container maxWidth="md" style={themeStyles}>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {survey.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {survey.description}
        </Typography>
      </Box>
      <Box>
        <PublicQuestionList questions={surveyQuestions} onResponseChange={handleResponseChange} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default PublicSurveyPage;
