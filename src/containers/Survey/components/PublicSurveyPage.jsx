import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPublicSurveyBySlugAction,
  createSurveyResponseAction,
  submitSurveySubmissionAction,
  updateSurveyResponseAction,
  previewSurveyAction,
} from '@/redux/actions/surveyActions';
import { updateRespondentAction } from '@/redux/actions/respondentsActions';

import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import PublicQuestionList from './public/PublicQuestionList';
import FollowUpForm from './public/FollowUpForm';
import ThankYouSubmission from './ThankYouSubmission';
import SurveyThemeWrapper from './SurveyThemeWrapper';
import { useSurveyTheme } from '../../../contexts/SurveyThemeContext';

const PublicSurveyPage = ({ preview = false }) => {
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = Boolean(user?.id);
  const themeStyles = useSurveyTheme();

  const dispatch = useDispatch();
  const { surveySlug, surveyId } = useParams();

   // Choose which identifier to use based on preview flag
  const idOrSlug = preview ? surveyId : surveySlug;

  // Redux state selectors
  const survey = useSelector(state => state.survey.publicSurvey);
  const surveyQuestions = useSelector(state => state.survey.publicSurveyQuestions);

  // Local component state
  const [step, setStep] = useState(0);
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

  // Once the survey data is loaded, create a survey response record (if not already created)
  useEffect(() => {
    if (
      survey?.id 
      && !preview
      && !isLoggedIn
    ) {
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
  }, [survey?.id, preview, isLoggedIn, dispatch, deviceType, sessionId]);

    // Reset step when pages change
  useEffect(() => {
    setStep(0);
  }, [survey?.survey_pages]);

  // Prepare pages array for single layout
  const pages = React.useMemo(() => {
    if (!survey?.survey_pages) return [];
    return survey.survey_pages
      .sort((a, b) => a.sort_index - b.sort_index)
      .map(page => ({
        ...page,
        questions: page.survey_questions,
      }));
  }, [survey]);

  const isSingle = survey?.layout === 'single';
  const currentPage = pages[step] || {};
  
  // Handle answer changes for each question
  // Response change handler
  const handleResponseChange = (qid, value) => {
    setResponses(prev => ({ ...prev, [qid]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (preview || isLoggedIn) {
      return;
    }
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

  const handleFollowUp = async ({ email, gender, age }) => {
      const respondentId = responseRecord.respondent_id;
      if (!respondentId) {
        console.error('No respondent_id on the survey_response record');
        return;
      }
      try {
        await dispatch(updateRespondentAction(
          respondentId,
          { email, gender, age },
        ));
        setFollowUpDone(true);
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

  // Theme styling is now handled by SurveyThemeWrapper

  return (
    <SurveyThemeWrapper survey={survey}>
      <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        {/* Survey Title and Description */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            sx={{ 
              mb: 1,
              fontFamily: themeStyles?.typography?.fontFamily,
              fontSize: themeStyles?.typography?.headingStyle?.H1,
              fontWeight: 'bold',
              color: themeStyles?.colors?.title_color, // Use the specific title color key
            }}
          >
            {survey.title}
          </Typography>
          {survey.description && (
            <Typography 
              variant="body2" 
              align="center"
              sx={{
                fontFamily: themeStyles?.typography?.fontFamily,
                fontSize: themeStyles?.typography?.fontSize,
                color: themeStyles?.colors?.text, // Use the specific text color key
              }}
            >
              {survey.description}
            </Typography>
          )}
        </Box>

        {/* Single vs Multiple logic */}
        {isSingle ? (
          <>  
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontFamily: themeStyles?.typography?.fontFamily || 'Arial, sans-serif',
                fontSize: themeStyles?.typography?.headingStyle?.H2 || '24px',
                fontWeight: 'bold',
              }}
            >
              {currentPage.title}
            </Typography>
            <PublicQuestionList
              questions={currentPage.questions}
              onResponseChange={handleResponseChange}
            />
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button onClick={() => setStep(s => Math.max(s - 1, 0))} disabled={step === 0} sx={{ mr: 2 }}>
                Back
              </Button>
              {step < pages.length - 1 ? (
                <Button variant="contained" onClick={() => setStep(s => s + 1)}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" onClick={handleSubmit} disabled={preview}>
                  Submit
                </Button>
              )}
            </Box>
          </>
        ) : (
          <>
            <PublicQuestionList 
              questions={surveyQuestions} 
              onResponseChange={handleResponseChange} 
            />
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                disabled={preview}
                variant="contained"
                onClick={handleSubmit}
                color="primary"
                size="large"
                sx={{
                  px: 4,
                }}
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </Container>
    </SurveyThemeWrapper>
  );
};

export default PublicSurveyPage;

PublicSurveyPage.propTypes = {
  preview: PropTypes.bool,
};

PublicSurveyPage.defaultProps = {
  preview: false,
};
