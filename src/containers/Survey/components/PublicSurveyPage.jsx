import React, { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
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
  Paper,
} from '@mui/material';
import PublicQuestionList from './public/PublicQuestionList';
import FollowUpForm from './public/FollowUpForm';
import ThankYouSubmission from './ThankYouSubmission';
import SurveyThemeWrapper from './SurveyThemeWrapper';
import { useSurveyTheme } from '../../../contexts/SurveyThemeContext';

// Header that consumes theme from context (MUST be under SurveyThemeWrapper)
function SurveyHeader({ title, description }) {
  const themeStyles = useSurveyTheme();
  const resolvedTitleColor = themeStyles?.colors?.title_color
    || themeStyles?.variable_palette?.title_color
    || themeStyles?.colors?.text;

  // Helpers to resolve structured heading with back-compat
  const parseHeadingStyle = (styleStr, defaultSizePx, defaultWeight) => {
    if (typeof styleStr !== 'string') {
      return { sizePx: defaultSizePx, weight: defaultWeight };
    }
    const tokens = styleStr.trim().split(/\s+/);
    const sizeToken = tokens.find(p => /px$/.test(p));
    const weightToken = tokens.find(p => /^(bold|bolder|lighter|normal|\d{3})$/i.test(p));
    const sizePx = sizeToken ? parseFloat(sizeToken) : defaultSizePx;

    let weight = defaultWeight;
    if (weightToken) {
      if (/\d{3}/.test(weightToken)) {
        weight = parseInt(weightToken, 10);
      } else if (weightToken.toLowerCase() === 'bold') {
        weight = 700;
      } else {
        weight = 400;
      }
    }
    return { sizePx, weight };
  };

  const resolveHeading = (lvl, defPx, defWeight) => {
    const obj = themeStyles?.typography?.heading?.[lvl];
    if (obj && Number.isFinite(obj.sizePx) && Number.isFinite(obj.weight)) return obj;
    const legacy = themeStyles?.typography?.headingStyle?.[lvl];
    return parseHeadingStyle(legacy, defPx, defWeight);
  };

  const H1 = resolveHeading('H1', 24, 700);
  const H2 = resolveHeading('H2', 18, 400);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        sx={{
          mb: 1,
          fontFamily: themeStyles?.typography?.fontFamily,
          fontSize: `${H1.sizePx}px`,
          fontWeight: H1.weight,
          color: resolvedTitleColor,
        }}
        style={{ color: resolvedTitleColor }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontFamily: themeStyles?.typography?.fontFamily,
            fontSize: `${H2.sizePx}px`,
            fontWeight: H2.weight,
            color: themeStyles?.colors?.subtitle || themeStyles?.colors?.text,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}

SurveyHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

SurveyHeader.defaultProps = {
  description: '',
};

// Inner component that is rendered under SurveyThemeWrapper so it can use the theme context
function PublicSurveyInner({
  survey,
  pages,
  isSingle,
  step,
  setStep,
  handleResponseChange,
  handleSubmit,
}) {
  const themeStyles = useSurveyTheme();

  // Structured heading sizes with back-compat parsing
  const parseHeadingStyle = (styleStr, defaultSizePx, defaultWeight) => {
    if (typeof styleStr !== 'string') {
      return { sizePx: defaultSizePx, weight: defaultWeight };
    }
    const tokens = styleStr.trim().split(/\s+/);
    const sizeToken = tokens.find(p => /px$/.test(p));
    const weightToken = tokens.find(p => /^(bold|bolder|lighter|normal|\d{3})$/i.test(p));
    const sizePx = sizeToken ? parseFloat(sizeToken) : defaultSizePx;

    let weight = defaultWeight;
    if (weightToken) {
      if (/\d{3}/.test(weightToken)) {
        weight = parseInt(weightToken, 10);
      } else if (weightToken.toLowerCase() === 'bold') {
        weight = 700;
      } else {
        weight = 400;
      }
    }
    return { sizePx, weight };
  };

  const resolveHeading = (lvl, defPx, defWeight) => {
    const obj = themeStyles?.typography?.heading?.[lvl];
    if (obj && Number.isFinite(obj.sizePx) && Number.isFinite(obj.weight)) return obj;
    const legacy = themeStyles?.typography?.headingStyle?.[lvl];
    return parseHeadingStyle(legacy, defPx, defWeight);
  };

  const H3 = resolveHeading('H3', 16, 500);
  const h3Size = `${H3.sizePx}px`;
  const h3Weight = H3.weight;

  const currentPage = pages[step] || {};
  const pageTitleColor = themeStyles?.colors?.page_title
    || themeStyles?.variable_palette?.title_color
    || themeStyles?.colors?.text;

  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
      <Paper
        elevation={themeStyles?.layout?.showShadow ? 6 : 0}
        variant={themeStyles?.layout?.showBorder ? 'outlined' : 'elevation'}
        sx={{
          p: themeStyles?.layout?.padding ?? 3,
          borderRadius: themeStyles?.layout?.borderRadius ?? 2,
          // Stronger outline for visibility
          border: themeStyles?.layout?.showBorder
            ? `2px solid ${
                themeStyles?.layout?.borderColor
                || themeStyles?.colors?.primary
                || themeStyles?.variable_palette?.primary_accent
                || 'rgba(0,0,0,0.25)'
              }`
            : '1px solid rgba(0,0,0,0.08)',
          // Force a visible shadow even when variant is outlined
          boxShadow: themeStyles?.layout?.showShadow
            ? '0 10px 30px rgba(0,0,0,0.20), 0 6px 10px rgba(0,0,0,0.10)'
            : 'none',
          backgroundColor: themeStyles?.variable_palette?.primary_background || '#ffffff',
        }}
      >
        {/* Survey Title and Description */}
        <SurveyHeader title={survey.title} description={survey.description} />

        {/* Single vs Multiple logic */}
        {isSingle ? (
          <>
            {/* Page title uses theme colors.page_title, with minimal fallback */}
            <Box sx={{ color: pageTitleColor }}>
              <Typography
                variant="h3"
                gutterBottom
                color="inherit"
                className="sc-page-title"
                sx={{
                  fontFamily: themeStyles?.typography?.fontFamily || 'Arial, sans-serif',
                  fontSize: h3Size,
                  fontWeight: h3Weight,
                  color: `${pageTitleColor} !important`,
                }}
                style={{ color: pageTitleColor }}
              >
                {currentPage.title}
              </Typography>
            </Box>

            <PublicQuestionList
              questions={currentPage.questions}
              onResponseChange={handleResponseChange}
            />

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => setStep(s => Math.max(s - 1, 0))}
                disabled={step === 0}
                sx={{
                  mr: 2,
                  color: themeStyles?.colors?.primary,
                  textTransform: 'none',
                  fontFamily: themeStyles?.typography?.fontFamily,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: tinycolor(themeStyles?.colors?.primary || '#1976d2')
                      .darken(8)
                      .toString(),
                  },
                }}
              >
                Back
              </Button>

              {step < pages.length - 1 && (
                <Button
                  variant="contained"
                  onClick={() => setStep(s => s + 1)}
                  sx={{
                    backgroundColor: themeStyles?.colors?.primary,
                    color: '#efefef',
                    borderRadius: `${themeStyles?.layout?.borderRadius ?? 2}px`,
                    textTransform: 'none',
                    fontFamily: themeStyles?.typography?.fontFamily,
                    px: 4,
                    '&:hover': {
                      backgroundColor: tinycolor(
                        themeStyles?.colors?.primary || '#1976d2',
                      )
                        .darken(8)
                        .toString(),
                    },
                  }}
                >
                  Next
                </Button>
              )}

              {step >= pages.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: themeStyles?.colors?.primary,
                    color: '#efefef',
                    borderRadius: `${themeStyles?.layout?.borderRadius ?? 2}px`,
                    textTransform: 'none',
                    fontFamily: themeStyles?.typography?.fontFamily,
                    px: 4,
                    '&:hover': {
                      backgroundColor: tinycolor(
                        themeStyles?.colors?.primary || '#1976d2',
                      )
                        .darken(8)
                        .toString(),
                    },
                  }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </>
        ) : (
          <>
            {pages && pages.length > 0 ? (
              pages.map((p, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={p.id || idx} sx={{ mb: 3 }}>
                  {/* Page Title */}
                  <Box sx={{ color: pageTitleColor }}>
                    <Typography
                      variant="h3"
                      gutterBottom
                      color="inherit"
                      className="sc-page-title"
                      sx={{
                        fontFamily: themeStyles?.typography?.fontFamily || 'Arial, sans-serif',
                        fontSize: h3Size,
                        fontWeight: h3Weight,
                        color: `${pageTitleColor} !important`,
                      }}
                      style={{ color: pageTitleColor }}
                    >
                      {p.title}
                    </Typography>
                  </Box>

                  <PublicQuestionList
                    questions={p.questions || []}
                    onResponseChange={handleResponseChange}
                  />
                </Box>
              ))
            ) : (
              <PublicQuestionList
                questions={survey?.survey_questions || survey?.questions || []}
                onResponseChange={handleResponseChange}
              />
            )}

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                size="large"
                sx={{
                  px: 4,
                  backgroundColor: themeStyles?.colors?.primary,
                  color: '#efefef',
                  borderRadius: `${themeStyles?.layout?.borderRadius ?? 2}px`,
                  textTransform: 'none',
                  fontFamily: themeStyles?.typography?.fontFamily,
                  '&:hover': {
                    backgroundColor: tinycolor(
                      themeStyles?.colors?.primary || '#1976d2',
                    )
                      .darken(8)
                      .toString(),
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

PublicSurveyInner.propTypes = {
  survey: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    survey_pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        sort_index: PropTypes.number,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string,
          }),
        ),
        survey_questions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string,
          }),
        ),
      }),
    ),
    layout: PropTypes.string,
    survey_questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
      }),
    ),
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
      }),
    ),
  }).isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          title: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  isSingle: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  handleResponseChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const PublicSurveyPage = ({ preview = false }) => {
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = Boolean(user?.id);

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
      dispatch(previewSurveyAction(surveyId)).catch(err => console.error('Preview failed:', err));
    } else {
      dispatch(fetchPublicSurveyBySlugAction(surveySlug)).catch(err => console.error('Load failed:', err));
    }
  }, [preview, idOrSlug, dispatch, surveyId, surveySlug]);

  // Once the survey data is loaded, create a survey response record (if not already created)
  useEffect(() => {
    if (survey?.id && !preview && !isLoggedIn) {
      dispatch(
        createSurveyResponseAction(survey.id, {
          started_at: startTimeRef.current,
          device: deviceType,
          session_id: sessionId,
        }),
      )
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
        questions: page.questions || page.survey_questions || [],
      }));
  }, [survey]);

  const isSingle = survey?.layout === 'single';

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
      // eslint-disable-next-line no-console
      console.error('No survey response record exists to attach answers to.');
      return;
    }
    try {
      const completedAtISO = new Date().toISOString();

      // Optionally update the survey response with completion time if required by backend
      await dispatch(
        updateSurveyResponseAction(responseRecord.id, {
          completed_at: completedAtISO,
        }),
      ).catch((err) => {
        // Log but allow continuation even if this step fails
        // eslint-disable-next-line no-console
        console.warn('Could not patch completed_at:', err);
        // eslint-disable-next-line no-console
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

      // Dispatch the submission action with a FLAT object.
      const result = await dispatch(
        submitSurveySubmissionAction(survey.id, {
          survey_response_id: responseRecord.id,
          ...submissionData, // answers, completed_at, device, session_id, etc.
        }),
      );

      const status = result?.status || result?.statusCode;
      if (status === 201 || status === 200) {
        setSubmissionTimestamp(new Date().toLocaleString());
        setSubmissionComplete(true);
      } else {
        // eslint-disable-next-line no-console
        console.error('Failed to submit survey. Server responded with status:', status);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Submission error:', error);
    }
  };

  const handleFollowUp = async ({ email, gender, age }) => {
    const respondentId = responseRecord?.respondent_id;
    if (!respondentId) {
      // eslint-disable-next-line no-console
      console.error('No respondent_id on the survey_response record');
      return;
    }
    try {
      await dispatch(updateRespondentAction(respondentId, { email, gender, age }));
      setFollowUpDone(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Could not save follow-up info:', err);
      setFollowUpDone(true); // still move on after error to avoid blocking UX
    }
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

  // Theme styling is handled by SurveyThemeWrapper; consume it inside PublicSurveyInner
  return (
    <SurveyThemeWrapper survey={survey}>
      <PublicSurveyInner
        survey={survey}
        pages={pages}
        isSingle={isSingle}
        step={step}
        setStep={setStep}
        handleResponseChange={handleResponseChange}
        handleSubmit={handleSubmit}
      />
    </SurveyThemeWrapper>
  );
};

PublicSurveyPage.propTypes = {
  preview: PropTypes.bool,
};

PublicSurveyPage.defaultProps = {
  preview: false,
};

export default PublicSurveyPage;
