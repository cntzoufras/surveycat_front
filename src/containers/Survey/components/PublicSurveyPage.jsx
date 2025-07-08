import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPublicSurveyBySlugAction,
  createSurveyResponseAction,
  submitSurveySubmissionAction, // use the proper submission action
  updateSurveyResponseAction, // ensure this is imported if we use it
  saveFollowUpDetailsAction,
  previewSurveyAction,
} from '@/redux/actions/surveyActions';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import PublicQuestionList from './public/PublicQuestionList';
import FollowUpForm from './public/FollowUpForm';
import ThankYouSubmission from './ThankYouSubmission';

const PublicSurveyPage = ({ preview = false }) => {
  const dispatch = useDispatch();
  const { surveySlug, surveyId } = useParams();

   // Choose which identifier to use based on preview flag
  const idOrSlug = preview ? surveyId : surveySlug;

  // Redux state selectors
  const survey = useSelector(state => state.survey.publicSurvey);
  const surveyQuestions = useSelector(state => state.survey.publicSurveyQuestions);

  // Local component state
  const [responseRecord, setResponseRecord] = useState(null);
  const [responses, setResponses] = useState({});
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [followUpDone, setFollowUpDone] = useState(false);

  const [submissionTimestamp, setSubmissionTimestamp] = useState(null);

  // Capture start time and device info
  const startTimeRef = React.useRef(new Date().toISOString());
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  const sessionId = document.cookie.match(/laravel_session=([^;]+)/)?.[1] ?? '';

  useEffect(() => {
    if (!idOrSlug) return;
    if (preview) {
      dispatch(previewSurveyAction(surveyId))
        .catch(err => console.error('Preview failed:', err));
    } else {
      dispatch(fetchPublicSurveyBySlugAction(surveySlug))
        .catch(err => console.error('Load failed:', err));
    }
  }, [preview, idOrSlug, dispatch, surveyId, surveySlug]);

  
  // Fetch survey data when the component mounts or slug changes
  // useEffect(() => {
  //   if (!surveySlug) return;
  //   dispatch(fetchPublicSurveyBySlugAction(surveySlug))
  //     .catch(err => console.error('Failed to load public survey:', err));
  // }, [surveySlug, dispatch]);

  // Once the survey data is loaded, create a survey response record (if not already created)
  useEffect(() => {
    if (survey?.id) {
      dispatch(createSurveyResponseAction(survey.id, {
        started_at: startTimeRef.current,
        device: deviceType,
        session_id: sessionId,
    }))
        .then((record) => {
          setResponseRecord(record);
        })
        .catch(err => console.error('Failed to create survey response:', err));
    }
  }, [survey?.id, dispatch, deviceType, sessionId]);

  // Handle answer changes for each question
  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!responseRecord?.id) {
      console.error('No survey response record exists to attach answers to.');
      return;
    }
    try {
      const completedAtISO = new Date().toISOString();

      // Optionally update the survey response with completion time if required by backend
      await dispatch(updateSurveyResponseAction(responseRecord.id, {
        completed_at: completedAtISO,
      })).catch((err) => {
        // Log but allow continuation even if this step fails
        console.warn('Could not patch completed_at:', err);
        console.error('Failed to update survey response with completion time:', err);
      });

      // Prepare submission payload with answers and any additional meta data
      const submissionData = {
        survey_id: survey.id,
        answers: responses,
        survey_response_id: responseRecord.id,
        completed_at: completedAtISO,
        device: deviceType,
        session_id: sessionId,
      };

      const payload = {
        survey_id: survey.id,
        survey_response_id: responseRecord.id,
        submission_data: JSON.stringify(submissionData),
      };

      // Dispatch the submission action to send answers to the backend
      const result = await dispatch(submitSurveySubmissionAction(survey.id, payload));
      // If the backend returns a status (e.g., via axios response), handle success
      const status = result?.status || result?.statusCode;
      if (status === 201 || status === 200) {
        setSubmissionTimestamp(new Date().toLocaleString());
        setSubmissionComplete(true);
      } else {
        console.error('Failed to submit survey. Server responded with status:', status);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleFollowUp = async ({ email, gender }) => {
      try {
        // TODO: dispatch an action to save these details if you have one:
        // await dispatch(saveFollowUpDetails(responseRecord.id, { email, gender }));
        await dispatch(saveFollowUpDetailsAction(
          responseRecord.id,
          { email, gender },
        ));
      } catch (err) {
        console.error('Could not save follow-up info:', err);
      }
        setFollowUpDone(true);
      };


  // Render loading state
  if (!survey || !surveyQuestions) {
    return <Typography>Loading...</Typography>;
  }

  if (submissionComplete && !followUpDone) {
     return <FollowUpForm onSubmit={handleFollowUp} />;
   }

   if (submissionComplete && followUpDone) {
     return <ThankYouSubmission timestamp={submissionTimestamp} />;
   }

  // Dynamic theme styles (with fallbacks)
  const themeStyles = {
    fontFamily: survey.theme?.theme_setting?.settings?.typography?.fontFamily || 'Arial, sans-serif',
    fontSize: survey.theme?.theme_setting?.settings?.typography?.fontSize || '12px',
    backgroundColor: survey.theme?.theme_setting?.settings?.backgroundColor || '#f5f5f5',
  };

  return (
    <Container maxWidth="md" sx={{ ...themeStyles, pt: 4, pb: 4 }}>
      {/* Survey Title and Description */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" align="center" sx={{ color: '#4A4A4A', mb: 1 }}>
          {survey.title}
        </Typography>
        {survey.description && (
          <Typography variant="body2" align="center" sx={{ color: '#4A4A4A' }}>
            {survey.description}
          </Typography>
        )}
      </Box>

      {/* Questions List */}
      <Box>
        <PublicQuestionList 
          questions={surveyQuestions} 
          onResponseChange={handleResponseChange} 
        />
      </Box>

      {/* Submit Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          disabled={preview}
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          size="large"
          sx={{
            px: 4,
            backgroundColor: theme => theme.palette.primary.main,
            color: '#fff',
            '&:hover': {
              // Use a secondary or darker shade for hover, if defined in theme
              backgroundColor: theme => theme.palette.primary.dark || theme.palette.secondary.main,
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default PublicSurveyPage;

PublicSurveyPage.propTypes = {
  preview: PropTypes.bool,
};

PublicSurveyPage.defaultProps = {
  preview: false,
};
